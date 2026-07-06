"use client";

import { useState, useRef, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Printer, 
  ChevronRight,
  Info,
  Palette,
  ArrowRight
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const service = services.find((s) => s.slug === slug);

  // File Upload states
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Customer Contact Info states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("Personal");
  const [formError, setFormError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-paper-cool">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-ink">Service Category Not Found</h2>
        <p className="text-ink-light text-sm mt-1 max-w-sm">We couldn&apos;t find the specific printing service you are looking for.</p>
        <Link 
          href="/services" 
          className="mt-6 px-6 py-3 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue/90 shadow-md transition-all hover:scale-105"
        >
          Return to Services
        </Link>
      </div>
    );
  }

  // Handle PDF Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const validateAndSelectFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are accepted for print-ready uploads.");
      return;
    }

    setFile(selectedFile);
    setFormError("");
    setSubmitSuccess(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    } else if (raw.length > 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
    }
    setPhone(formatted);
  };

  const handleSubmitDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      setFormError("Please fill out all contact info fields.");
      return;
    }
    if (!file) {
      setFormError("Please upload your PDF design file.");
      return;
    }

    setFormError("");
    setSubmitting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 15;
      });
    }, 100);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("serviceTitle", service.title);
      formData.append("slug", service.slug);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("occasion", occasion);

      const res = await fetch("/api/send-print", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      if (res.ok) {
        setProgress(100);
        setTimeout(() => {
          setSubmitting(false);
          setSubmitSuccess(true);
        }, 300);
      } else {
        const data = await res.json();
        setFormError(data.error || "There was an issue sending your file. Please try again.");
        setSubmitting(false);
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setFormError("Submission failed. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 bg-gradient-to-b from-[#f1f5f9] via-[#e2e8f0] to-[#f1f5f9] min-h-screen grid-bg relative overflow-hidden">
      {/* Top Header Ambient radial glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />

      {/* Soft Brand Ambient radial glows (Starts below hero) */}
      <div className="absolute top-[480px] right-0 w-[700px] h-[700px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none translate-x-1/4" />
      <div className="absolute bottom-[200px] left-0 w-[600px] h-[600px] bg-brand-cyan/15 rounded-full blur-[120px] pointer-events-none -translate-x-1/4" />
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/3" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Link Breadcrumb */}
        <Reveal className="mb-8">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-light hover:text-brand-blue transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
        </Reveal>

        {/* Page Header */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
          <Reveal className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 rounded-full text-brand-blue">
              <service.Icon className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{service.tag}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-ink leading-tight">
              {service.title}
            </h1>
            <p className="text-base md:text-lg text-ink-light leading-relaxed max-w-2xl">
              {service.longDescription}
            </p>
          </Reveal>
        </div>

        {/* Core Layout Split */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Machinery & Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Machine Card */}
            <Reveal className="bg-white border border-border-subtle rounded-3xl overflow-hidden shadow-sm shadow-ink/5">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={service.machineImage}
                  alt={service.machineName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                  <div className="flex items-center gap-2 text-brand-cyan text-xs font-semibold uppercase tracking-wider mb-1">
                    <Printer className="w-3.5 h-3.5" />
                    Production Machinery
                  </div>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight">{service.machineName}</h3>
                </div>
              </div>
              <div className="p-6 md:p-8 bg-white border-t border-border-subtle">
                <h4 className="font-bold text-ink mb-2">Print Quality & Specs</h4>
                <p className="text-sm text-ink-light leading-relaxed">
                  We use state-of-the-art print presses to ensure dot-alignment precision, vibrant pigment density, and clean border cuts on all custom projects.
                </p>
              </div>
            </Reveal>

            {/* Specifications Bento Box */}
            <Reveal className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 shadow-sm shadow-ink/5 text-left">
              <h3 className="font-extrabold text-xl text-ink mb-6 tracking-tight">Technical Specifications</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {service.specifications.map((spec, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink-light">
                    <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right Side: Order Desk (PDF upload + clover payment) (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Main Interactive order builder */}
            <Reveal className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 shadow-xl shadow-ink/5 text-left space-y-8 relative overflow-hidden">
              
              {/* Apple-style step card title */}
              <div className="border-b border-border-subtle pb-6">
                <h3 className="font-extrabold text-2xl text-ink tracking-tight">Order Form & Deposit</h3>
                <p className="text-xs text-ink-light mt-1">Upload your file and complete the Clover secure merchant deposit.</p>
                
                {/* Secondary Canva redirect button */}
                <div className="mt-4 pt-4 border-t border-border-subtle/50 flex flex-col gap-2">
                  <div className="text-[11px] font-semibold text-ink-light flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-brand-blue" />
                    Don&apos;t have a print-ready file?
                  </div>
                  <Link
                    href={`/design?category=${
                      service.slug === "custom-banner-printing" ? "banner" :
                      service.slug === "custom-merchandise" ? "merch" :
                      service.slug === "custom-window-graphics" ? "window" :
                      service.slug === "custom-stickers" ? "stickers" :
                      service.slug === "custom-tshirt-printing" ? "tshirt" :
                      service.slug === "custom-organizational-tshirts" ? "org" : "tshirt"
                    }`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-paper-cool border border-border-subtle text-xs font-extrabold text-ink hover:text-brand-blue hover:bg-brand-blue/5 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Design Online with Canva
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* STEP 1: PDF Uploader */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-ink text-sm uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-[10px]">1</span>
                    Upload Print PDF
                  </h4>
                  <span className="text-[10px] font-semibold text-ink-light uppercase">Required</span>
                </div>

                {!file ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                      dragActive 
                        ? "border-brand-blue bg-brand-blue/5 scale-[0.99]" 
                        : "border-border-medium hover:border-brand-blue/40 bg-paper-cool/30"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <UploadCloud className="w-10 h-10 text-brand-blue/60 mb-3 animate-pulse" />
                    <span className="text-sm font-semibold text-ink">Drag & Drop print PDF</span>
                    <span className="text-xs text-ink-light mt-1">or click to browse your folders</span>
                    <span className="text-[9px] text-ink-light mt-3 uppercase font-medium bg-paper-cool px-2 py-0.5 rounded border border-border-subtle">Accepts PDF files only</span>
                  </div>
                ) : (
                  <div className="border border-border-subtle rounded-2xl p-4 bg-paper-cool/30 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-blue">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 text-left">
                          <div className="text-sm font-bold text-ink truncate w-full">{file.name}</div>
                          <div className="text-xs text-ink-light">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => { setFile(null); setSubmitSuccess(false); }} 
                        className="text-xs font-semibold text-rose-500 hover:underline px-2 py-1"
                        disabled={submitting}
                      >
                        Remove
                      </button>
                    </div>

                    {submitting ? (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-ink-light">
                          <span>Submitting...</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-border-medium rounded-full overflow-hidden">
                          <div className="h-full bg-brand-blue transition-all duration-150" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    ) : submitSuccess ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 text-left">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>File Selected & Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue text-left">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>PDF Loaded - Ready to Submit</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* STEP 2: Contact Info Submission Form */}
              <div className="space-y-4 pt-6 border-t border-border-subtle">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-ink text-sm uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-[10px]">2</span>
                    Contact Info & Submit
                  </h4>
                </div>

                {submitSuccess ? (
                  <div className="p-6 bg-emerald-50/50 border border-emerald-200 rounded-2xl flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="text-left w-full space-y-2">
                      <h4 className="font-bold text-emerald-800 text-center">Design Submitted Successfully!</h4>
                      <p className="text-xs text-emerald-700 leading-relaxed text-center">
                        Your print-ready PDF has been sent to our production email. We will review your file specs and text/call you at <span className="font-bold">{phone}</span> to finalize your order details.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitDesign} className="space-y-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-ink-light uppercase mb-1 text-left">First Name</label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className="w-full px-4 py-2.5 bg-paper-cool border border-border-subtle rounded-xl text-sm font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-ink-light uppercase mb-1 text-left">Last Name</label>
                          <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="w-full px-4 py-2.5 bg-paper-cool border border-border-subtle rounded-xl text-sm font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-ink-light uppercase mb-1 text-left">Phone Number</label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="(346) 218-0615"
                          className="w-full px-4 py-2.5 bg-paper-cool border border-border-subtle rounded-xl text-sm font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-ink-light uppercase mb-1 text-left">Occasion</label>
                        <select
                          value={occasion}
                          onChange={(e) => setOccasion(e.target.value)}
                          className="w-full px-4 py-2.5 bg-paper-cool border border-border-subtle rounded-xl text-sm font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                        >
                          <option value="Personal">Personal</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Business / Corporate">Business / Corporate</option>
                          <option value="Birthday / Party">Birthday / Party</option>
                          <option value="School / Team Sports">School / Team Sports</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {formError && (
                      <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-medium flex items-start gap-2 text-left">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-blue/95 transition-all shadow-md shadow-brand-blue/15 hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] duration-300 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting Design...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Submit Design File
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Print Shop Guidelines (Frosted banner below form) */}
            <Reveal className="bg-white/80 border border-border-subtle rounded-3xl p-5 shadow-sm shadow-ink/5 text-left flex items-start gap-3.5">
              <div className="w-8 h-8 bg-brand-blue/5 border border-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue flex-shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-1">
                <h4 className="font-bold text-ink">Print Ready Upload Tips</h4>
                <p className="text-ink-light leading-relaxed">
                  For optimal print quality, please make sure fonts are outlined, vector art layers are kept intact, and image links are embedded inside your PDF.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
