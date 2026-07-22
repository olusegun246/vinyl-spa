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
  ChevronLeft,
  Info,
  Palette,
  ArrowRight
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/services";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const existingService = services.find((s) => s.slug === slug);

  // Helper to format title from slug
  const formatTitle = (s: string) => {
    return s
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const service = existingService || {
    slug: slug,
    title: formatTitle(slug),
    description: `Professional custom printing for ${formatTitle(slug).toLowerCase()}, crafted with ultimate precision and quality.`,
    tag: "Custom Print",
    Icon: Printer,
    image: "/coming-soon.jpg",
    machineImage: "/rolls-vinyl.jpg",
    machineName: "Commercial Wide-Format Digital Print Engine",
    longDescription: `Get premium, custom-manufactured ${formatTitle(slug).toLowerCase()} tailored to your exact specifications. Choose your dimensions, materials, and quantities, and submit your print-ready artwork file for automated preflight checks.`,
    specifications: [
      "Custom size configurations available",
      "High-resolution color fidelity",
      "Premium material finishes",
      "Automated preflight spec checks"
    ]
  };

  // Dynamic size options based on product type
  const getProductSizes = (productSlug: string) => {
    const lower = productSlug.toLowerCase();
    if (lower.includes("banner") || lower.includes("sign") || lower.includes("backdrop") || lower.includes("flag")) {
      return ["2ft x 4ft", "3ft x 6ft", "4ft x 8ft", "5ft x 10ft", "18\" x 24\" (Yard Sign)", "24\" x 36\" (A-Frame)", "Custom Size"];
    }
    if (lower.includes("shirt") || lower.includes("apparel") || lower.includes("hoodie") || lower.includes("hat") || lower.includes("cap") || lower.includes("wear") || lower.includes("clothing") || lower.includes("t-shirt") || lower.includes("tshirt")) {
      return ["Adult Small (S)", "Adult Medium (M)", "Adult Large (L)", "Adult X-Large (XL)", "Adult XX-Large (XXL)", "Youth Small", "Youth Medium", "Youth Large"];
    }
    if (lower.includes("sticker") || lower.includes("label") || lower.includes("decal")) {
      return ["2\" x 2\" (Standard)", "3\" x 3\" (Popular)", "4\" x 4\" (Large)", "5\" x 5\" (Extra Large)", "Custom Dimensions"];
    }
    if (lower.includes("box") || lower.includes("pack") || lower.includes("pouch") || lower.includes("mailer") || lower.includes("bag")) {
      return ["6\" x 6\" x 2\" (Mailer)", "8\" x 8\" x 4\" (Shipping)", "10\" x 10\" x 4\" (Large)", "Custom Box Dimensions"];
    }
    if (lower.includes("flyer") || lower.includes("brochure") || lower.includes("catalog") || lower.includes("menu") || lower.includes("postcard") || lower.includes("letterhead") || lower.includes("folder") || lower.includes("booklet") || lower.includes("sheet")) {
      return ["4\" x 6\" (Postcard)", "8.5\" x 11\" (Letter)", "11\" x 17\" (Folded)", "Custom Print Size"];
    }
    if (lower.includes("mug") || lower.includes("tumbler") || lower.includes("cup") || lower.includes("drinkware")) {
      return ["11oz (Standard Mug)", "15oz (Large Mug)", "20oz (Tumbler)", "30oz (XL Tumbler)"];
    }
    return ["Standard Size", "Custom Dimensions", "Bulk Dimensions"];
  };

  const sizeOptions = getProductSizes(slug);

  // File Upload states
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Customer Contact Info states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("Personal");
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [formError, setFormError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Photos Gallery state
  const galleryPhotos = [
    service.image && service.image !== "/coming-soon.jpg" ? service.image : "/coming-soon.jpg",
    "/coming-soon.jpg", // Thumbnail 1
    "/coming-soon.jpg", // Thumbnail 2
    "/coming-soon.jpg", // Thumbnail 3
  ];
  const [activePhoto, setActivePhoto] = useState(0);

  const handleNextPhoto = () => {
    setActivePhoto((prev) => (prev + 1) % galleryPhotos.length);
  };

  const handlePrevPhoto = () => {
    setActivePhoto((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

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
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
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
      formData.append("email", email);
      formData.append("occasion", occasion);
      formData.append("selectedSize", selectedSize);

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
    <div className="bg-white min-h-screen">
      {/* Top Header / Breadcrumb / Title Area in Clean White */}
      <div className="pt-10 pb-8 px-6 lg:px-12 bg-white relative">
        <div className="max-w-6xl mx-auto">
          {/* Back Link Breadcrumb */}
          <Reveal className="mb-6">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-light hover:text-brand-blue transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
          </Reveal>

          {/* Page Header */}
          <div className="max-w-4xl space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-ink font-poppins leading-tight">
              {service.title}
            </h1>
            <p className="text-sm md:text-base text-ink-light leading-relaxed max-w-2xl">
              {service.longDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Form & Gallery Content Area on Dark Green Background */}
      <section className="py-12 md:py-16 px-6 lg:px-12 bg-[#133E2B] relative border-t border-emerald-900/30">
        {/* Soft atmospheric green radial glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Core Layout Split */}
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Side: Machinery & Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Pictures Gallery Showcase */}
              <div className="space-y-4">
                <Reveal className="relative w-full h-[500px] md:h-[650px] rounded-3xl overflow-hidden bg-slate-950 border border-emerald-900/60 shadow-xl group">
                  {galleryPhotos[activePhoto] === "/coming-soon.jpg" && activePhoto > 0 ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e] flex flex-col items-center justify-center text-center p-6 select-none">
                      <Printer className="w-12 h-12 text-brand-cyan mb-3 opacity-80 animate-pulse" />
                      <h3 className="text-white text-xs font-extrabold tracking-tight uppercase">Coming Soon</h3>
                      <p className="text-white/60 text-[10px] mt-1 max-w-xs leading-relaxed">
                        Product sample photoshoot coming soon. Upload your design file to submit your print order!
                      </p>
                    </div>
                  ) : galleryPhotos[activePhoto] === "/coming-soon.jpg" && !existingService ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e] flex flex-col items-center justify-center text-center p-6 select-none">
                      <Printer className="w-12 h-12 text-brand-cyan mb-3 opacity-80 animate-pulse" />
                      <h3 className="text-white text-xs font-extrabold tracking-tight uppercase">Coming Soon</h3>
                      <p className="text-white/60 text-[10px] mt-1 max-w-xs leading-relaxed">
                        Product sample photoshoot coming soon. Upload your design file to submit your print order!
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={galleryPhotos[activePhoto]}
                      alt={`${service.title} Slide ${activePhoto + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out"
                    />
                  )}

                  {/* Left Navigation Arrow */}
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 hover:scale-105 transition-all cursor-pointer z-30 animate-in fade-in duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Right Navigation Arrow */}
                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 hover:scale-105 transition-all cursor-pointer z-30 animate-in fade-in duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-left">
                    <span className="text-white text-xs font-semibold">
                      {activePhoto === 0 ? "Finished Product Sample" : `Detail View ${activePhoto}`}
                    </span>
                  </div>
                </Reveal>

                {/* Three Small Photos underneath (Thumbnails) */}
                <div className="grid grid-cols-3 gap-4">
                  {galleryPhotos.slice(1).map((photoUrl, index) => {
                    const photoIdx = index + 1;
                    return (
                      <button
                        key={photoIdx}
                        type="button"
                        onClick={() => setActivePhoto(photoIdx)}
                        className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                          activePhoto === photoIdx ? "border-brand-cyan scale-[1.02] shadow-lg" : "border-emerald-900/40 hover:border-emerald-800"
                        }`}
                      >
                        <div className="absolute inset-0 bg-zinc-900/95 flex flex-col items-center justify-center text-center p-2">
                          <span className="text-white/40 text-[9px] font-extrabold uppercase tracking-wider">Photo {photoIdx}</span>
                          <span className="text-white/65 text-[8px] mt-0.5 font-bold">Coming Soon</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          {/* Right Side: Order Desk (PDF upload + clover payment) (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Main Interactive order builder */}
            <Reveal className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 shadow-xl shadow-ink/5 text-left space-y-8 relative overflow-hidden">
              
              {/* Apple-style step card title */}
              <div className="border-b border-border-subtle pb-6">
                <h3 className="font-extrabold text-2xl text-ink tracking-tight">Print Submission Deck</h3>
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
                    Design Online (Template.io)
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
                        Your print-ready PDF has been sent to our production email. We will review your file specs and text/call you at <span className="font-bold">{phone}</span> to finalize your order details for size <span className="font-bold">{selectedSize || sizeOptions[0]}</span>.
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
                        <label className="block text-[11px] font-bold text-ink-light uppercase mb-1 text-left">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john.doe@example.com"
                          className="w-full px-4 py-2.5 bg-paper-cool border border-border-subtle rounded-xl text-sm font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-ink-light uppercase mb-1 text-left">Select Product Size</label>
                        <select
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="w-full px-4 py-2.5 bg-paper-cool border border-border-subtle rounded-xl text-sm font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                        >
                          {sizeOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
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

          </div>
        </div>
      </div>
    </section>

      {/* Technical Specs & Guidelines Section on White Background */}
      <section className="py-12 px-6 lg:px-12 bg-white relative border-t border-border-subtle">
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal className="grid md:grid-cols-2 gap-6">
            {/* Technical Specifications (White background) */}
            <div className="bg-white border border-border-subtle rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-left">
              <h3 className="font-extrabold text-base text-ink mb-4 tracking-tight">Technical Specifications</h3>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {service.specifications.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-ink-light">
                    <CheckCircle className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Print Shop Guidelines (White background) */}
            <div className="bg-white border border-border-subtle rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-left flex items-start gap-3.5">
              <div className="w-8 h-8 bg-brand-blue/5 border border-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue flex-shrink-0">
                <Info className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1.5 min-w-0">
                <h4 className="font-extrabold text-base text-ink tracking-tight">Print Ready Upload Tips</h4>
                <p className="text-xs text-ink-light leading-relaxed">
                  For optimal print quality, please make sure fonts are outlined, vector art layers are kept intact, and image links are embedded inside your PDF.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
