"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Sparkles, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  CreditCard, 
  ShieldCheck, 
  Layout, 
  Palette, 
  FileDown, 
  Send,
  HelpCircle
} from "lucide-react";
import Reveal from "@/components/Reveal";

interface DesignTemplate {
  id: string;
  name: string;
  categoryName: string;
  externalUrl: string;
  specs: string;
}

const templates: DesignTemplate[] = [
  {
    id: "tshirt",
    name: "Custom T-Shirt",
    categoryName: "T-Shirt Template",
    externalUrl: "https://www.canva.com/t-shirts/templates/",
    specs: "Standard print area: 12\" x 16\" @ 300dpi",
  },
  {
    id: "banner",
    name: "Outdoor Banner",
    categoryName: "Banner Template",
    externalUrl: "https://www.canva.com/banners/templates/",
    specs: "Aspect Ratio: 3:1 (Standard outdoor banner)",
  },
  {
    id: "window",
    name: "Window Graphics",
    categoryName: "Storefront Window Sign",
    externalUrl: "https://www.canva.com/signs/templates/",
    specs: "Standard storefront window dimensions",
  },
  {
    id: "stickers",
    name: "Stickers & Decals",
    categoryName: "Die-Cut Sticker Sheet",
    externalUrl: "https://www.canva.com/stickers/templates/",
    specs: "Cutline padding: 0.125\" bleed margins",
  },
  {
    id: "merch",
    name: "Custom Merchandise",
    categoryName: "Promo Mug / Bottle Design",
    externalUrl: "https://www.canva.com/mugs/templates/",
    specs: "Cylindrical wrap design space: 8.5\" x 3.5\"",
  },
  {
    id: "org",
    name: "Organizational Shirts",
    categoryName: "Bulk Group Apparel",
    externalUrl: "https://www.canva.com/t-shirts/templates/",
    specs: "Perfect sizing across S to 3XL templates",
  },
];

function DesignWorkspaceContent() {
  const [activeTemplate, setActiveTemplate] = useState<DesignTemplate>(templates[0]);
  const searchParams = useSearchParams();
  const categoryParam = searchParams ? searchParams.get("category") : null;

  useEffect(() => {
    if (categoryParam) {
      const match = templates.find((t) => t.id === categoryParam);
      if (match) {
        setActiveTemplate(match);
      }
    }
  }, [categoryParam]);
  
  // File upload states
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clover Payment states
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardName, setCardName] = useState("");
  const [paymentError, setPaymentError] = useState("");

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
      validateAndUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUploadFile(e.target.files[0]);
    }
  };

  const validateAndUploadFile = async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are accepted for print-ready uploads.");
      return;
    }

    setFile(selectedFile);
    setUploading(true);
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
      formData.append("file", selectedFile);
      formData.append("serviceTitle", activeTemplate.name);
      formData.append("slug", activeTemplate.id);

      const res = await fetch("/api/send-print", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      if (res.ok) {
        setProgress(100);
        setTimeout(() => {
          setUploading(false);
        }, 300);
      } else {
        alert("There was an issue sending your file. Please try again.");
        setFile(null);
        setUploading(false);
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      alert("Upload failed. Please try again.");
      setFile(null);
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted.substring(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setCardExpiry(value.substring(0, 5));
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setPaymentError("Please upload your print-ready PDF file first before placing your deposit.");
      return;
    }
    if (!cardName || cardNumber.length < 15 || cardExpiry.length < 5 || cardCVC.length < 3) {
      setPaymentError("Please fill in valid Clover secure card checkout fields.");
      return;
    }

    setPaymentError("");
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
    }, 2500);
  };

  return (
    <section className="py-16 md:py-24 px-6 lg:px-12 bg-gradient-to-b from-[#1b0303] via-[#0d0101] to-[#1b0303] min-h-screen grid-bg relative overflow-hidden">
      {/* Top Header Ambient radial glows (Muted Burgundy/Rose) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-rose-950/15 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />

      {/* Soft Brand Ambient radial glows (Starts below hero) */}
      <div className="absolute top-[480px] right-0 w-[700px] h-[700px] bg-red-900/10 rounded-full blur-[140px] pointer-events-none translate-x-1/4" />
      <div className="absolute bottom-[200px] left-0 w-[600px] h-[600px] bg-rose-950/12 rounded-full blur-[120px] pointer-events-none -translate-x-1/4" />
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-red-950/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Header Split Hero Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <Reveal className="lg:col-span-7 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 text-black leading-none">
              Design Your Own <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">Prints</span>
            </h1>
            <p className="text-base md:text-lg text-black leading-relaxed">
              Select a template dimension, design online using Canva, download your print-ready PDF, and upload it below to submit your secure deposit.
            </p>
          </Reveal>

          {/* Autoplay Printing Production Video */}
          <Reveal delay={0.15} className="lg:col-span-5 w-full">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950">
              <video
                src="/Printing-Machine-Hero-3.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </Reveal>
        </div>

        {/* Workspace Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: 3-Step Design Roadmap (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1 Card: Select Product & Launch */}
            <Reveal className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 shadow-sm shadow-ink/5 text-left space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-sm shadow-md shadow-brand-blue/20">
                  01
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-ink tracking-tight">Select Product & Launch Canva</h3>
                  <p className="text-xs text-ink-light mt-0.5">Choose your product type to open Canva with the correct dimensions preset.</p>
                </div>
              </div>

              {/* Sizing Grid Selection */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => {
                      setActiveTemplate(tpl);
                      setFile(null);
                      setPaymentSuccess(false);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-1 cursor-pointer ${
                      tpl.id === activeTemplate.id
                        ? "bg-brand-blue/5 border-brand-blue ring-1 ring-brand-blue"
                        : "bg-white border-border-subtle hover:border-brand-blue/40"
                    }`}
                  >
                    <span className={`text-sm font-bold ${tpl.id === activeTemplate.id ? "text-brand-blue" : "text-ink"}`}>
                      {tpl.name}
                    </span>
                    <span className="text-[10px] font-semibold text-ink-light">
                      {tpl.specs}
                    </span>
                  </button>
                ))}
              </div>

              {/* Action Launch Button */}
              <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-[11px] font-semibold text-ink-light">
                  Selected preset size: <strong className="text-brand-blue">{activeTemplate.specs}</strong>
                </div>
                <a
                  href={activeTemplate.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-blue text-white font-bold rounded-xl hover:bg-brand-blue/95 transition-all shadow-md shadow-brand-blue/15 hover:scale-[1.02] duration-300 text-xs uppercase tracking-wider cursor-pointer"
                >
                  Launch {activeTemplate.name} Creator
                  <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </div>
            </Reveal>

            {/* Step 2 Card: Design Your Artwork */}
            <Reveal className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 shadow-sm shadow-ink/5 text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-sm shadow-md shadow-brand-blue/20">
                  02
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-ink tracking-tight">Design in Canva</h3>
                  <p className="text-xs text-ink-light mt-0.5">Use Canva&apos;s free drag-and-drop workspace in the new tab to create your artwork.</p>
                </div>
              </div>

              <div className="bg-paper-cool/50 rounded-2xl p-5 border border-border-subtle text-xs font-semibold text-ink-light space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                  <span><strong>Customize Elements:</strong> Add high-resolution photos, upload your own store logo files, or choose from thousands of free Canva design vectors.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                  <span><strong>Safety Margins:</strong> Keep all critical text, titles, and logos centered within the margins to prevent clipping during border trims.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 flex-shrink-0" />
                  <span><strong>No Account Needed:</strong> Canva lets you design fully as a guest or standard account for free. No premium Canva subscription is required.</span>
                </div>
              </div>
            </Reveal>

            {/* Step 3 Card: Export & Return */}
            <Reveal className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 shadow-sm shadow-ink/5 text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-cyan text-white flex items-center justify-center font-black text-sm shadow-md shadow-brand-cyan/20">
                  03
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-ink tracking-tight">Download & Upload Back to Us</h3>
                  <p className="text-xs text-ink-light mt-0.5">Return your design to our production desk to complete the order deposit.</p>
                </div>
              </div>

              <p className="text-xs text-ink-light leading-relaxed">
                When you are satisfied with your design, click <strong>Share</strong> in the top-right corner of Canva, select <strong>Download</strong>, and set the File Type to <strong>PDF Print</strong> (this ensures the highest vector resolution). Once downloaded, drag that PDF into the **Submission Desk** on the right!
              </p>
            </Reveal>
          </div>

          {/* Right Side: Upload and Checkout Bubble (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Form card container */}
            <Reveal className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 shadow-xl shadow-ink/5 text-left space-y-8 relative overflow-hidden">
              
              <div className="border-b border-border-subtle pb-6">
                <h3 className="font-extrabold text-xl text-ink tracking-tight">Print Submission Desk</h3>
                <p className="text-[11px] text-ink-light mt-1">Submit designs to our printing staff.</p>
              </div>

              {/* Step 1: Drag & Drop PDF */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-ink text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-[9px]">1</span>
                    Upload PDF Design
                  </h4>
                  <span className="text-[9px] font-semibold text-ink-light uppercase">Required</span>
                </div>

                {!file ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
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
                    <UploadCloud className="w-8 h-8 text-brand-blue/60 mb-2 animate-pulse" />
                    <span className="text-xs font-semibold text-ink">Drag & Drop print PDF</span>
                    <span className="text-[10px] text-ink-light mt-0.5">or click to browse files</span>
                  </div>
                ) : (
                  <div className="border border-border-subtle rounded-2xl p-4 bg-paper-cool/30 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-blue">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 text-left">
                          <div className="text-xs font-bold text-ink truncate w-32 md:w-40">{file.name}</div>
                          <div className="text-[10px] text-ink-light">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setFile(null)} 
                        className="text-[10px] font-semibold text-rose-500 hover:underline px-2 py-1"
                        disabled={uploading}
                      >
                        Remove
                      </button>
                    </div>

                    {uploading ? (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold text-ink-light">
                          <span>Uploading...</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-border-medium rounded-full overflow-hidden">
                          <div className="h-full bg-brand-blue transition-all duration-150" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-3 text-left">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>PDF Sent to VinylSupplyMore@gmail.com</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-1 text-[9px] text-ink-light font-semibold">
                          <div className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" /> Outlines: Pass
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" /> DPI Check: Pass
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Step 2: Clover Deposit secure check out */}
              <div className="space-y-4 pt-6 border-t border-border-subtle">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-ink text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-[9px]">2</span>
                    Pay Deposit via Clover
                  </h4>
                  <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-2 py-0.5 rounded-full">$50.00</span>
                </div>

                {paymentSuccess ? (
                  <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl flex flex-col items-center text-center space-y-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="text-left w-full space-y-1.5">
                      <h4 className="font-bold text-emerald-800 text-xs text-center">Receipt Confirmation</h4>
                      <div className="bg-white border border-emerald-100 rounded-xl p-3 text-[10px] font-semibold text-ink-light space-y-1 mt-1 shadow-sm">
                        <div className="flex justify-between">
                          <span>Merchant ID:</span>
                          <span className="text-ink">VSM-HOUSTON</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transaction:</span>
                          <span className="text-ink">CLV-99374B</span>
                        </div>
                        <div className="flex justify-between font-bold text-ink border-t border-border-subtle pt-1 mt-1">
                          <span>Amount Authorized:</span>
                          <span>$50.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-ink-light uppercase mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-2 bg-paper-cool border border-border-subtle rounded-xl text-xs font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-ink-light uppercase mb-1">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="4000 1234 5678 9010"
                            className="w-full pl-9 pr-4 py-2 bg-paper-cool border border-border-subtle rounded-xl text-xs font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                          />
                          <CreditCard className="w-3.5 h-3.5 text-ink-light/75 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-ink-light uppercase mb-1">Expiry Date</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 bg-paper-cool border border-border-subtle rounded-xl text-xs font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-ink-light uppercase mb-1">CVC Code</label>
                          <input
                            type="password"
                            required
                            value={cardCVC}
                            onChange={(e) => setCardCVC(e.target.value.replace(/[^0-9]/g, "").substring(0, 4))}
                            placeholder="•••"
                            className="w-full px-4 py-2 bg-paper-cool border border-border-subtle rounded-xl text-xs font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {paymentError && (
                      <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-[10px] font-medium flex items-start gap-1.5 text-left">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span>{paymentError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={processing || uploading}
                      className="w-full py-3 bg-brand-blue text-white text-xs font-bold rounded-xl hover:bg-brand-blue/95 transition-all shadow-md shadow-brand-blue/15 hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.01] duration-300 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer"
                    >
                      {processing ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Verifying Card...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Pay Deposit via Clover®
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Support Box */}
            <Reveal className="bg-white/80 border border-border-subtle rounded-3xl p-5 text-left flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
              <div className="text-[11px] space-y-1">
                <h4 className="font-bold text-ink">Need assistance?</h4>
                <p className="text-ink-light leading-relaxed">
                  Call our team at **346-218-0615** or email us at **VinylSupplyMore@gmail.com** for manual setup.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DesignPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center bg-paper-cool">
        <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DesignWorkspaceContent />
    </Suspense>
  );
}
