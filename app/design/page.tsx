"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Printer,
  ArrowLeft
} from "lucide-react";
import Reveal from "@/components/Reveal";

interface DesignTemplate {
  id: string;
  name: string;
  categoryName: string;
  specs: string;
}

// Single Templated embed used for all product categories.
const TEMPLATED_EMBED_URL =
  "https://app.templated.io/editor?embed=55032d73-62d0-476b-a239-5d9ec775c9d2";

const templates: DesignTemplate[] = [
  { id: "banner", name: "Vinyl Banners", categoryName: "Banner Template", specs: "Aspect Ratio: 3:1 (Standard outdoor banner)" },
  { id: "stickers", name: "Custom Stickers", categoryName: "Die-Cut Sticker Sheet", specs: "Cutline padding: 0.125\" bleed margins" },
  { id: "tshirt", name: "Custom T-Shirts", categoryName: "T-Shirt Template", specs: "Standard print area: 12\" x 16\" @ 300dpi" },
  { id: "business-cards", name: "Business Cards", categoryName: "Standard Card Template", specs: "Standard size: 3.5\" x 2\" with bleed" },
  { id: "hats", name: "Embroidered Hats", categoryName: "Hat Template", specs: "Max embroidery height: 2.25\"" },
  { id: "mugs", name: "Ceramic Mugs", categoryName: "Mug Template", specs: "Cylindrical wrap design space: 8.5\" x 3.5\"" },
  { id: "window", name: "Window Graphics", categoryName: "Storefront Window Cling", specs: "Standard storefront window dimensions" },
  { id: "flyers", name: "Flyers & Documents", categoryName: "Flyer Template", specs: "Standard letter size: 8.5\" x 11\" with 0.125\" margins" }
];

const categoriesData = [
  {
    id: "marketing",
    name: "Marketing Materials",
    products: [
      { name: "Business Flyers", templateId: "flyers", desc: "Premium flyers for advertising your business services." },
      { name: "Club Flyers", templateId: "flyers", desc: "Vibrant custom club handouts and promotional event cards." },
      { name: "Custom Flyers", templateId: "flyers", desc: "Bespoke print flyers tailored exactly to your dimensions." },
      { name: "Direct Mail", templateId: "flyers", desc: "Promotional mailers built for targeted route deliveries." },
      { name: "Every Door Direct Mail", templateId: "flyers", desc: "EDDM-compliant postcard mailers for local saturation marketing." },
      { name: "Event Flyers", templateId: "flyers", desc: "Eye-catching custom layouts for concerts, events, or galleries." },
      { name: "Flyers", templateId: "flyers", desc: "Multi-purpose single sheet advertisements." },
      { name: "Folded Cards", templateId: "business-cards", desc: "Greeting cards, event menus, or half-fold promotional cards." },
      { name: "Greeting Cards", templateId: "business-cards", desc: "Premium custom folded greeting cards and envelopes." },
      { name: "Invitations", templateId: "business-cards", desc: "Elegant invites for weddings, corporate galas, or birthdays." },
      { name: "Magnets", templateId: "stickers", desc: "High-grade custom outdoor magnetic signage." },
      { name: "Mailing Flyers", templateId: "flyers", desc: "Direct mailers ready to fold, address, and ship." },
      { name: "Menus", templateId: "flyers", desc: "Professional dining lists, takeout booklets, or single sheets." },
      { name: "Postcards", templateId: "flyers", desc: "Standard direct mail postcards with high-gloss finishes." },
      { name: "Sell Sheets", templateId: "flyers", desc: "Clean business portfolio layouts detailing products or services." },
      { name: "Sticker Sheets", templateId: "stickers", desc: "Kiss-cut decals and branding graphics on single custom sheets." },
      { name: "Vinyl Banners", templateId: "banner", desc: "Heavy-duty outdoor hanging grommeted vinyl banners." }
    ]
  },
  {
    id: "essentials",
    name: "Business Essentials",
    products: [
      { name: "Appointment Cards", templateId: "business-cards", desc: "Standard 3.5\" x 2\" cards with writable backside surfaces." },
      { name: "Business Cards", templateId: "business-cards", desc: "Double-sided premium networking cards with custom finishes." },
      { name: "Business Flyers", templateId: "flyers", desc: "Professional product catalog lists and handouts." },
      { name: "Carbonless Forms", templateId: "flyers", desc: "Multi-part carbonless NCR forms for invoices, receipts, and bids." },
      { name: "Direct Mail", templateId: "flyers", desc: "Corporate mail templates ready for shipping routes." },
      { name: "Every Door Direct Mail", templateId: "flyers", desc: "High-volume local marketing mailers." },
      { name: "Envelopes", templateId: "business-cards", desc: "Standard #10 envelope templates custom printed with company logos." },
      { name: "Flyers", templateId: "flyers", desc: "Standard single sheet marketing prints." },
      { name: "Letterhead", templateId: "flyers", desc: "Standard 8.5\" x 11\" company letterheads." },
      { name: "Loyalty Cards", templateId: "business-cards", desc: "Custom punch cards to drive repeat customer engagement." },
      { name: "Mailing Flyers", templateId: "flyers", desc: "Folded newsletters and mailers ready for mailing stamps." },
      { name: "Mailing Services", templateId: "flyers", desc: "Design flyers pre-formatted for direct mail saturation." },
      { name: "Postcards", templateId: "flyers", desc: "Branded mailing postcards." },
      { name: "Presentation Folders", templateId: "business-cards", desc: "Glossy die-cut folders with dual pockets and business card slots." },
      { name: "Self-Seal Envelopes", templateId: "business-cards", desc: "Peel-and-seal premium corporate envelope layouts." },
      { name: "Sell Sheets", templateId: "flyers", desc: "Corporate product marketing sheets." },
      { name: "Silk Presentation Folders", templateId: "business-cards", desc: "Ultra-premium presentation folders with a matte silk-laminate finish." },
      { name: "Square Business Cards", templateId: "business-cards", desc: "Trendy 2.5\" x 2.5\" square profiles for modern networking." },
      { name: "Standard Business Cards", templateId: "business-cards", desc: "Classic high-volume 3.5\" x 2\" business cards." },
      { name: "Sticker Sheets", templateId: "stickers", desc: "Custom labeled sheets for product branding." },
      { name: "Company Apparel", templateId: "tshirt", desc: "Branded polo shirts, tees, and custom staff uniforms." }
    ]
  },
  {
    id: "stickers",
    name: "Label and Stickers",
    products: [
      { name: "Custom Stickers", templateId: "stickers", desc: "Premium die-cut or kiss-cut individual logo decals." },
      { name: "Sticker Sheets", templateId: "stickers", desc: "Multiple custom shapes on a single paper sheet." },
      { name: "Bumper Stickers", templateId: "stickers", desc: "Weatherproof vinyl stickers suited for vehicles." },
      { name: "Clear Stickers", templateId: "stickers", desc: "Transparent backing decals for windows or products." },
      { name: "Vinyl Stickers", templateId: "stickers", desc: "Heavy-duty outdoor stickers built for rugged use." },
      { name: "Oval Stickers", templateId: "stickers", desc: "Sleek oval profile decals." },
      { name: "Rectangle Stickers", templateId: "stickers", desc: "Classic rectangular label cuts." },
      { name: "Round Stickers", templateId: "stickers", desc: "Circular product labels and logo badges." },
      { name: "Square Stickers", templateId: "stickers", desc: "Perfect square-cut custom branding labels." },
      { name: "DTF Transfers", templateId: "tshirt", desc: "Direct-to-film print transfers ready for heat presses." },
      { name: "Return Address Labels", templateId: "stickers", desc: "Convenient mini address labels for packaging." },
      { name: "All Labels", templateId: "stickers", desc: "General adhesive packaging stickers." },
      { name: "All Stickers", templateId: "stickers", desc: "Multi-purpose sticker designs." }
    ]
  },
  {
    id: "banners",
    name: "Banner & Signs",
    products: [
      { name: "A-Frame Signs", templateId: "banner", desc: "Double-sided street sidewalk signage boards." },
      { name: "Backdrops", templateId: "banner", desc: "Step-and-repeat backdrops for photo booths and events." },
      { name: "Banners", templateId: "banner", desc: "General outdoor and hanging banners." },
      { name: "Canvas Prints", templateId: "banner", desc: "Premium photo prints stretched onto canvas." },
      { name: "Deluxe Retractable Banners", templateId: "banner", desc: "Premium pull-up banners with heavy-duty bases." },
      { name: "Mesh Banners", templateId: "banner", desc: "Perforated outdoor banners for windy fences." },
      { name: "Mounted Posters", templateId: "banner", desc: "Thick rigid foam-board posters." },
      { name: "Pole Banners", templateId: "banner", desc: "Double-sided street light pole banners." },
      { name: "Posters", templateId: "banner", desc: "High-resolution prints for wall displays." },
      { name: "Retractable Banners", templateId: "banner", desc: "Standard trade show roll-up banners." },
      { name: "Rolled Canvas", templateId: "banner", desc: "Unframed canvas art prints." },
      { name: "Stretched Canvas", templateId: "banner", desc: "Stretched canvas prints ready to hang." },
      { name: "Vinyl Banners", templateId: "banner", desc: "Heavy grommeted outdoor banners." },
      { name: "Wall Decals", templateId: "stickers", desc: "Custom graphic stickers for interior walls." },
      { name: "Window Clings", templateId: "window", desc: "Static non-adhesive window decals." },
      { name: "Window Decals", templateId: "window", desc: "Adhesive storefront vinyl displays." },
      { name: "X-Banners", templateId: "banner", desc: "Lightweight X-frame stand displays." },
      { name: "Yard Signs", templateId: "banner", desc: "Corrugated plastic signs with metal H-stakes." },
      { name: "All Banners", templateId: "banner", desc: "Custom banners in all sizes." },
      { name: "All Signs", templateId: "banner", desc: "General signs and signage." }
    ]
  },
  {
    id: "promotional",
    name: "Promotional Items",
    products: [
      { name: "Custom Apparel", templateId: "tshirt", desc: "Premium tees, hoodies, and jackets." },
      { name: "Embroidered Hats", templateId: "hats", desc: "Stitch-embroidered caps and beanies." },
      { name: "Branded Drinkware", templateId: "mugs", desc: "Insulated tumblers, flasks, and cups." },
      { name: "Custom Ceramic Mugs", templateId: "mugs", desc: "Vibrant photo print coffee mugs." },
      { name: "Tote Bags", templateId: "tshirt", desc: "Reusable canvas shopping tote bags." },
      { name: "All Promotional Items", templateId: "tshirt", desc: "Promotional event merch and branding." }
    ]
  }
];

function DesignWorkspaceContent() {
  const [activeTemplate, setActiveTemplate] = useState<DesignTemplate>(templates[0]);
  const [wizardStep, setWizardStep] = useState<"select-product" | "editor">("select-product");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState("marketing");
  const searchParams = useSearchParams();
  const categoryParam = searchParams ? searchParams.get("category") : null;

  useEffect(() => {
    if (categoryParam) {
      const match = templates.find((t) => t.id === categoryParam);
      if (match) {
        setActiveTemplate(match);
        setWizardStep("editor");
        
        setTimeout(() => {
          const panel = document.getElementById("design-selection-panel");
          if (panel) {
            panel.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    }
  }, [categoryParam]);

  // File upload states
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic size options based on active template category
  const getTemplateSizes = (templateId: string) => {
    if (templateId === "banner") {
      return ["2ft x 4ft", "3ft x 6ft", "4ft x 8ft", "5ft x 10ft", "Custom Size"];
    }
    if (templateId === "tshirt") {
      return ["Adult Small (S)", "Adult Medium (M)", "Adult Large (L)", "Adult X-Large (XL)", "Adult XX-Large (XXL)", "Youth Small", "Youth Medium", "Youth Large"];
    }
    if (templateId === "stickers") {
      return ["2\" x 2\" (Standard)", "3\" x 3\" (Popular)", "4\" x 4\" (Large)", "Custom Dimensions"];
    }
    if (templateId === "window") {
      return ["18\" x 24\" (Standard)", "24\" x 36\" (A-Frame)", "Custom Window Graphics Dimensions"];
    }
    if (templateId === "mugs") {
      return ["11oz (Standard Mug)", "15oz (Large Mug)", "20oz (Tumbler)", "30oz (XL Tumbler)"];
    }
    if (templateId === "hats") {
      return ["Standard Fit (Adjustable)", "S/M Flexfit", "L/XL Flexfit"];
    }
    if (templateId === "business-cards") {
      return ["Standard (3.5\" x 2\")", "Square (2.5\" x 2.5\")", "Slim (3.5\" x 1.75\")"];
    }
    if (templateId === "flyers") {
      return ["Standard Flyer (8.5\" x 11\")", "Club Flyer (4\" x 6\")", "Large Flyer (11\" x 17\")", "Custom Dimensions"];
    }
    return ["Standard Size", "Custom Dimensions", "Bulk Dimensions"];
  };

  const sizeOptions = getTemplateSizes(activeTemplate.id);

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

  useEffect(() => {
    const options = getTemplateSizes(activeTemplate.id);
    setSelectedSize(options[0]);
  }, [activeTemplate]);

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
    // Format input as phone: (XXX) XXX-XXXX
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
      formData.append("serviceTitle", activeTemplate.name);
      formData.append("slug", activeTemplate.id);
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

  const handleStartDesigningClick = () => {
    const targetElement = document.getElementById("design-selection-panel");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Header (Always visible at the top) */}
      <section className="relative h-[500px] sm:h-[540px] md:h-[400px] lg:h-[440px] w-full overflow-hidden bg-slate-50 border-b border-border-subtle">
        <div className="absolute inset-0 flex flex-col-reverse md:flex-row">
          {/* Left Side: Wording */}
          <div className="w-full md:w-[45%] lg:w-[50%] h-[50%] md:h-full bg-gradient-to-br from-[#CBDCD3] to-[#b8cabf] flex flex-col justify-center items-center md:items-start px-6 py-6 sm:px-12 lg:px-20 text-center md:text-left space-y-3.5 md:space-y-4 z-20 relative">
            <Reveal delay={0.05}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight font-poppins leading-[1.1]">
                Design your prints online
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-xs sm:text-sm md:text-sm text-ink leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
                Use our interactive editor to craft designs for shirts, signs, labels, and marketing materials—or skip the builder and upload your print-ready PDF file.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="pt-1 flex flex-row justify-center md:justify-start gap-3">
              <button
                onClick={handleStartDesigningClick}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 shadow-md shadow-slate-900/10 hover:scale-[1.02] transition-all duration-300 text-xs md:text-sm cursor-pointer border-none"
              >
                <span>Start Designing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-medium bg-white text-ink font-bold rounded-full hover:bg-slate-50 hover:scale-[1.02] transition-all duration-300 text-xs md:text-sm"
              >
                Get Support
              </Link>
            </Reveal>
          </div>

          {/* Right Side: Video */}
          <div className="w-full md:w-[55%] lg:w-[50%] h-[50%] md:h-full relative overflow-hidden bg-slate-950 z-10">
            <video
              src="/Printing-Machine-Hero-3.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Quick Steps Roadmap (Always visible below the hero) */}
      <section className="py-12 px-6 lg:px-12 bg-white text-center border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <h2 className="text-2xl font-black text-ink tracking-tight font-poppins">How the Custom Designer Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {/* Step 1 */}
            <Reveal className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                01
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Select Product</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Choose from our popular catalog lists, including banners, stickers, mugs, hats, or tees.
                </p>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-cyan text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                02
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Interactive Canvas</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Build your graphics inside the embedded editor canvas and export to vector PDF format.
                </p>
              </div>
            </Reveal>

            {/* Step 3 */}
            <Reveal className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                03
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Submit Design Deck</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload your file to the Print Submission Deck uploader on the right to place your order.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Dynamic Products Grid or Workspace Area (Scroll Target) */}
      <div id="design-selection-panel" className="scroll-mt-16">
        {wizardStep === "select-product" ? (
          /* STEP 2: Product selection grid screen */
          <section className="py-16 px-6 lg:px-12 bg-white min-h-screen text-center animate-in fade-in duration-300">
            <div className="max-w-6xl mx-auto relative">
              <div className="text-center space-y-3 mb-12">
                <h2 className="text-3xl font-black text-ink font-poppins tracking-tight">What product do you want to design?</h2>
                <p className="text-sm text-ink-light leading-relaxed max-w-xl mx-auto">
                  Select a template style category below to initialize your online workspace and submission deck.
                </p>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10 max-w-4xl mx-auto">
                {categoriesData.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryTab(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer border-none ${
                      selectedCategoryTab === cat.id
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200/60"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Active Category Products Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(categoriesData.find((c) => c.id === selectedCategoryTab) || categoriesData[0]).products.map((prod) => {
                  return (
                    <Reveal
                      key={prod.name}
                      className="group bg-white border border-border-subtle hover:border-brand-blue/30 rounded-3xl p-5 hover:shadow-xl hover:shadow-ink/5 transition-all duration-300 text-left flex flex-col items-stretch cursor-pointer"
                    >
                      <button
                        onClick={() => {
                          const baseTpl = templates.find((t) => t.id === prod.templateId) || templates[0];
                          setActiveTemplate({
                            id: prod.templateId,
                            name: prod.name,
                            categoryName: baseTpl.categoryName,
                            specs: baseTpl.specs
                          });
                          setFile(null);
                          setSubmitSuccess(false);
                          setWizardStep("editor");
                          setTimeout(() => {
                            const panel = document.getElementById("design-selection-panel");
                            if (panel) {
                              panel.scrollIntoView({ behavior: "smooth" });
                            }
                          }, 100);
                        }}
                        className="w-full text-left bg-transparent border-none p-0 flex flex-col items-stretch flex-1 cursor-pointer"
                      >
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1c1e] to-[#2c2c2e] mb-4 border border-border-subtle/50 shadow-inner flex-shrink-0 flex items-center justify-center group-hover:scale-[1.01] transition-transform duration-300">
                          <span className="text-[10px] uppercase font-black tracking-widest text-slate-500/80 font-poppins">Picture Coming Soon</span>
                        </div>
                        <h3 className="font-extrabold text-lg text-ink group-hover:text-brand-blue transition-colors">{prod.name}</h3>
                        <p className="text-xs text-ink-light leading-relaxed mt-1.5 flex-1">{prod.desc}</p>
                        <div className="mt-4 pt-3 border-t border-border-subtle/50 flex items-center justify-between text-brand-blue font-bold text-xs uppercase tracking-wider">
                          <span>Start Designing</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          /* STEP 3: Embedded Editor Workspace + Side Form */
          <section id="templated-editor-panel" className="py-12 px-6 lg:px-12 bg-gradient-to-b from-[#f1f5f9] via-[#e2e8f0] to-[#f1f5f9] min-h-screen relative overflow-hidden border-t border-border-subtle animate-in fade-in duration-300">
            {/* Background Ambient radial glows */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 -translate-x-1/4" />
            <div className="absolute top-[480px] right-0 w-[700px] h-[700px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none translate-x-1/4" />
            <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/3" />

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Top Workspace controls */}
              <div className="text-left mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <button
                  onClick={() => {
                    setWizardStep("select-product");
                    setTimeout(() => {
                      const panel = document.getElementById("design-selection-panel");
                      if (panel) {
                        panel.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 100);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase text-ink-light hover:text-brand-blue transition-colors cursor-pointer bg-transparent border-none"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Product Templates
                </button>
                <div className="bg-brand-blue/5 border border-brand-blue/10 rounded-full px-3 py-1 text-[10px] font-bold text-brand-blue uppercase tracking-wider inline-block">
                  Designing: {activeTemplate.name}
                </div>
              </div>

              {/* 2-Column Split Workspace Grid */}
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Side: Roadmap Steps & Embedded Canva Editor */}
                <div className="lg:col-span-8 space-y-6 text-left">
                  {/* Embedded editor view container */}
                  <Reveal key="editor-workspace" className="w-full space-y-3">
                    <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3 rounded-t-2xl shadow-md border border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                          Interactive Template Canvas: <span className="text-brand-cyan font-extrabold">{activeTemplate.name} Workspace</span>
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-semibold hidden sm:inline-block">
                        Specs: {activeTemplate.specs}
                      </span>
                    </div>
                    <div className="relative w-full h-[600px] rounded-b-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
                      <iframe
                        src={TEMPLATED_EMBED_URL}
                        className="w-full h-full border-none"
                        allow="clipboard-write; clipboard-read"
                        title="Templated Design Editor"
                      />
                    </div>
                  </Reveal>
                </div>

                {/* Right Side: Print Submission Deck Form */}
                <div className="lg:col-span-4 space-y-6">
                  <Reveal className="bg-white border border-border-subtle rounded-3xl p-5 md:p-6 shadow-xl shadow-ink/5 text-left space-y-6 relative overflow-hidden">
                    <div className="border-b border-border-subtle pb-4">
                      <h3 className="font-extrabold text-lg text-ink tracking-tight">Print Submission Deck</h3>
                      <p className="text-[10px] text-ink-light mt-0.5">Submit designs to our printing staff.</p>
                    </div>

                    {/* Step 1: Locked Product Category */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-ink text-xs uppercase tracking-wider flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-[9px]">1</span>
                          Product Category
                        </h4>
                      </div>
                      <div className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-left">
                        {activeTemplate.name}
                      </div>
                    </div>

                    {/* Step 2: Drag & Drop PDF */}
                    <div className="space-y-3 pt-5 border-t border-border-subtle">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-ink text-xs uppercase tracking-wider flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-[9px]">2</span>
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
                          className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
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
                          <UploadCloud className="w-7 h-7 text-brand-blue/60 mb-2" />
                          <span className="text-xs font-semibold text-ink">Drag & Drop print PDF</span>
                          <span className="text-[10px] text-ink-light mt-0.5">or click to browse files</span>
                        </div>
                      ) : (
                        <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/50 flex flex-col gap-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-blue">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 text-left">
                                <div className="text-xs font-bold text-slate-800 truncate w-32 md:w-40">{file.name}</div>
                                <div className="text-[9px] text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => { setFile(null); setSubmitSuccess(false); }}
                              className="text-[10px] font-semibold text-rose-500 hover:underline px-2 py-1 bg-transparent border-none cursor-pointer"
                              disabled={submitting}
                            >
                              Remove
                            </button>
                          </div>

                          {submitting ? (
                            <div className="space-y-1">
                              <div className="flex justify-between text-[9px] font-bold text-slate-400">
                                <span>Submitting...</span>
                                <span>{progress}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
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

                    {/* Step 3: Contact Info Submission Form */}
                    <div className="space-y-4 pt-5 border-t border-slate-200">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-[9px]">3</span>
                          Contact Info
                        </h4>
                      </div>

                      {submitSuccess ? (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col items-center text-center space-y-2">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <div className="text-left w-full space-y-1">
                            <h4 className="font-bold text-emerald-800 text-xs text-center">Design Submitted Successfully!</h4>
                            <p className="text-[10px] text-emerald-700 leading-relaxed text-center">
                              Your print-ready PDF has been sent to our production email. We will review your file specs and text/call you at <span className="font-bold">{phone}</span> to finalize your order details for size <span className="font-bold">{selectedSize || sizeOptions[0]}</span>.
                            </p>
                          </div>
                        </div>
                      ) : (
                      <form onSubmit={handleSubmitDesign} className="space-y-4">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">First Name</label>
                              <input
                                type="text"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="John"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">Last Name</label>
                              <input
                                type="text"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">Phone Number</label>
                            <input
                              type="text"
                              required
                              value={phone}
                              onChange={handlePhoneChange}
                              placeholder="(346) 218-0615"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">Email Address</label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="john.doe@example.com"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">Select Template Size</label>
                            <select
                              value={selectedSize}
                              onChange={(e) => setSelectedSize(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-blue/50 transition-colors"
                            >
                              {sizeOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">Occasion</label>
                            <select
                              value={occasion}
                              onChange={(e) => setOccasion(e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-blue/50 transition-colors"
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
                          <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-[10px] font-medium flex items-start gap-1.5 text-left">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            <span>{formError}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-3 bg-brand-blue text-white text-xs font-bold rounded-xl hover:bg-brand-blue/95 transition-all shadow-md shadow-brand-blue/15 hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.01] duration-300 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer border-none"
                        >
                          {submitting ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Submitting Design...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" />
                              Submit Design File
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </Reveal>

                {/* Support Box */}
                <Reveal className="bg-white border border-border-subtle rounded-3xl p-5 text-left flex items-start gap-3 shadow-sm backdrop-blur-sm">
                  <HelpCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                  <div className="text-[11px] space-y-1">
                    <h4 className="font-bold text-ink">Need assistance?</h4>
                    <p className="text-ink-light leading-relaxed">
                      Call our team at <strong>346-218-0615</strong> or email us at <strong>VinylSupplyMore@gmail.com</strong> for manual setup.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  </>
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