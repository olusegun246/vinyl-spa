"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle,
  ArrowRight,
  Info,
  ShoppingCart,
  Phone,
  Layers,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import Reveal from "@/components/Reveal";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
}

const projects: ProjectItem[] = [
  {
    id: "ten-commandments-banner",
    title: "Ten Commandments Banner",
    category: "Banner",
    description: "Large custom printed outdoor church vinyl banner with high-contrast scripture text.",
    image: "/Ten-Commandments-Banner.jpeg"
  },
  {
    id: "back-to-90s",
    title: "Back to the 90s Shirt",
    category: "Heat Press",
    description: "Retro neon brand aesthetic print applied to a premium black cotton shirt.",
    image: "/Back-to-the-90s.jpeg"
  }
];

export default function GalleryPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(projects[0]);
  const [activePreview, setActivePreview] = useState<string>(projects[0].image);
  const cartRef = useRef<HTMLDivElement>(null);

  // Cart list state (starts empty)
  const [cart, setCart] = useState<ProjectItem[]>([]);

  // Lightbox Modal states for pop-out photo viewing
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string>("");

  // Tracks which image is previewed inside each individual card
  const [cardPreviews, setCardPreviews] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    projects.forEach((p) => {
      initial[p.id] = p.image;
    });
    return initial;
  });

  // Customer Contact Info states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("Personal");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    const currentCardPreview = cardPreviews[project.id] || project.image;
    setActivePreview(currentCardPreview);
    setSubmitSuccess(false);
    setFormError("");
    setLightboxProject(project);
    setLightboxImage(currentCardPreview);
  };

  const handleToggleCart = (e: React.MouseEvent, project: ProjectItem) => {
    e.stopPropagation();
    setCart((prev) => {
      const exists = prev.find((item) => item.id === project.id);
      if (exists) {
        return prev.filter((item) => item.id !== project.id);
      } else {
        return [...prev, project];
      }
    });
  };

  const handleRemoveFromCart = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setCart((prev) => prev.filter((item) => item.id !== projectId));
  };

  const handleCardNext = (e: React.MouseEvent, project: ProjectItem) => {
    e.stopPropagation();
    const imagesList = project.images || [project.image];
    const currentImg = cardPreviews[project.id] || project.image;
    const currentIndex = imagesList.indexOf(currentImg);
    const nextIndex = (currentIndex + 1) % imagesList.length;
    
    const nextImg = imagesList[nextIndex];
    setCardPreviews(prev => ({ ...prev, [project.id]: nextImg }));
    if (selectedProject.id === project.id) {
      setActivePreview(nextImg);
    }
  };

  const handleCardPrev = (e: React.MouseEvent, project: ProjectItem) => {
    e.stopPropagation();
    const imagesList = project.images || [project.image];
    const currentImg = cardPreviews[project.id] || project.image;
    const currentIndex = imagesList.indexOf(currentImg);
    const prevIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
    
    const prevImg = imagesList[prevIndex];
    setCardPreviews(prev => ({ ...prev, [project.id]: prevImg }));
    if (selectedProject.id === project.id) {
      setActivePreview(prevImg);
    }
  };

  const handleThumbnailClick = (e: React.MouseEvent, project: ProjectItem, img: string) => {
    e.stopPropagation();
    setCardPreviews(prev => ({ ...prev, [project.id]: img }));
    if (selectedProject.id === project.id) {
      setActivePreview(img);
    }
  };

  const handleLightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxProject) return;
    const imagesList = lightboxProject.images || [lightboxProject.image];
    const currentIndex = imagesList.indexOf(lightboxImage);
    const nextIndex = (currentIndex + 1) % imagesList.length;
    setLightboxImage(imagesList[nextIndex]);
  };

  const handleLightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxProject) return;
    const imagesList = lightboxProject.images || [lightboxProject.image];
    const currentIndex = imagesList.indexOf(lightboxImage);
    const prevIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
    setLightboxImage(imagesList[prevIndex]);
  };

  const openLightbox = (e: React.MouseEvent, project: ProjectItem) => {
    e.stopPropagation();
    setLightboxProject(project);
    setLightboxImage(cardPreviews[project.id] || project.image);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setFormError("Please add at least one project to your cart.");
      return;
    }
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
      setFormError("Please fill out all contact info fields.");
      return;
    }

    setFormError("");
    setSubmitting(true);

    try {
      const projectTitles = cart.map(item => item.title).join(", ");
      const formData = new FormData();
      formData.append("projectTitle", projectTitles);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("occasion", occasion);
      formData.append("description", description);

      const res = await fetch("/api/send-inquiry", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitting(false);
        setSubmitSuccess(true);
      } else {
        const data = await res.json();
        setFormError(data.error || "There was an issue sending your inquiry. Please try again.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setFormError("Submission failed. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-[#f1f5f9] via-[#e2e8f0] to-[#f1f5f9] min-h-screen grid-bg relative overflow-hidden">
      {/* Top Header Ambient radial glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />

      {/* Soft Brand Ambient radial glows (Starts below hero) */}
      <div className="absolute top-[480px] right-0 w-[700px] h-[700px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none translate-x-1/4" />
      <div className="absolute bottom-[200px] left-0 w-[600px] h-[600px] bg-brand-cyan/15 rounded-full blur-[120px] pointer-events-none -translate-x-1/4" />
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Hero Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          <Reveal className="lg:col-span-7 space-y-4 text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black leading-tight">
              Our Previous <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">Work</span>
            </h1>
            <p className="text-base md:text-lg text-black leading-relaxed max-w-xl">
              Explore a curated showcase of our previous projects. See something you like? Click any item to request the same build or customize it to fit your brand.
            </p>
          </Reveal>
        </div>

        {/* Core Layout Split */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Showcase Gallery (7 cols) - Reverted to grid-cols-3 */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-2.5 md:gap-6">
            {projects.map((project) => {
              const isSelected = selectedProject.id === project.id;
              const activeCardPreview = cardPreviews[project.id] || project.image;
              return (
                <div
                  key={project.id}
                  onClick={() => handleSelectProject(project)}
                  className={`bg-white rounded-2xl md:rounded-3xl overflow-hidden border shadow-sm cursor-pointer p-2 md:p-4 transition-all duration-300 flex flex-col justify-between ${
                    isSelected 
                      ? "border-brand-blue ring-2 ring-brand-blue/20 scale-[1.01]" 
                      : "border-border-subtle hover:border-brand-blue/30 hover:shadow-md hover:scale-[1.01]"
                  }`}
                >
                  <div>
                    {/* Main Product Card Photo Box */}
                    <div 
                      className="relative aspect-square md:aspect-[16/11] w-full rounded-xl overflow-hidden bg-white border border-border-subtle/30 mb-2 md:mb-4 group/photo"
                    >
                      <Image
                        src={activeCardPreview}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 80vw, 250px"
                        className="object-cover transition-transform duration-500 group-hover/photo:scale-105"
                      />
                    </div>

                    {/* Multi-Photo Thumbnails directly under the main card photo */}
                    {project.images && project.images.length > 1 && (
                      <div className="flex gap-1 md:gap-1.5 justify-start overflow-x-auto pb-1.5 mb-1.5 px-0.5">
                        {project.images.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => handleThumbnailClick(e, project, img)}
                            className={`relative w-6 h-6 md:w-9 md:h-9 rounded-md md:rounded-lg overflow-hidden border flex-shrink-0 transition-all ${
                              activeCardPreview === img 
                                ? "border-brand-blue ring-2 ring-brand-blue/15 scale-95" 
                                : "border-border-subtle hover:border-brand-blue/30"
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`${project.title} view ${idx + 1}`}
                              fill
                              sizes="24px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Card text details */}
                    <div className="text-left space-y-1.5 px-0.5 mb-2 md:mb-4">
                      <div className="flex flex-col gap-1">
                        <h3 className={`font-extrabold text-[11px] md:text-sm leading-tight transition-colors ${
                          isSelected ? "text-brand-blue" : "text-ink group-hover:text-brand-blue"
                        }`}>
                          {project.title}
                        </h3>
                        {/* Category Badge on small version */}
                        <div className="flex">
                          <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-full text-[7px] md:text-[9px] font-bold text-slate-650 uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add to Our Cart Button */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleCart(e, project)}
                    className={`w-full py-1.5 md:py-2.5 px-2 rounded-lg md:rounded-xl text-[8px] md:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      cart.find((item) => item.id === project.id)
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                        : "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-sm"
                    }`}
                  >
                    {cart.find((item) => item.id === project.id) ? (
                      <>
                        <CheckCircle className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                        <span className="hidden sm:inline">Added to Cart</span>
                        <span className="sm:hidden">Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                        <span className="hidden sm:inline">Add to Our Cart</span>
                        <span className="sm:hidden">Add</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Side: Inquiry Desk (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Inquiry Form Card */}
            <div ref={cartRef} className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 shadow-xl shadow-ink/5 text-left space-y-6 relative overflow-hidden">
              
              <div className="border-b border-border-subtle pb-4">
                <h3 className="font-extrabold text-xl text-ink tracking-tight flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-brand-blue" />
                  The Our Work Cart
                </h3>
                <p className="text-xs text-ink-light mt-1">Submit your details below to request a similar setup or customized build.</p>
              </div>

              {/* Items in Cart Overlay (No Images, just Name list) */}
              <div className="bg-paper-cool/50 border border-border-subtle rounded-2xl p-4 space-y-3">
                <div className="text-[10px] font-bold text-ink-light uppercase tracking-wider mb-1 text-left">Items in Your Cart ({cart.length})</div>
                
                {cart.length === 0 ? (
                  <p className="text-xs text-ink-light leading-relaxed italic text-left">Your cart is empty. Click "Add to Our Cart" on any product to customize.</p>
                ) : (
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-white border border-border-subtle rounded-xl p-3">
                        <div className="text-left min-w-0">
                          <h4 className="font-bold text-xs text-ink truncate">{item.title}</h4>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveFromCart(e, item.id)}
                          className="text-xs font-semibold text-rose-500 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {submitSuccess ? (
                <div className="p-6 bg-emerald-50/50 border border-emerald-200 rounded-2xl flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="text-left w-full space-y-2">
                    <h4 className="font-bold text-emerald-800 text-center">Inquiry Sent Successfully!</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed text-center">
                      We have received your custom order request for:
                      <div className="my-2 p-2.5 bg-white border border-emerald-100 rounded-xl font-bold text-emerald-800">
                        {cart.map(item => item.title).join(", ")}
                      </div>
                      Our design team will review your specifications and contact you at <span className="font-bold">{phone}</span> to discuss quote estimates.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-ink-light uppercase mb-1">First Name</label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          className="w-full px-4 py-2 bg-paper-cool border border-border-subtle rounded-xl text-xs font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-ink-light uppercase mb-1">Last Name</label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          className="w-full px-4 py-2 bg-paper-cool border border-border-subtle rounded-xl text-xs font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                        />
                      </div>
                    </div>

                     <div>
                      <label className="block text-[11px] font-bold text-ink-light uppercase mb-1">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="(346) 218-0615"
                        className="w-full px-4 py-2 bg-paper-cool border border-border-subtle rounded-xl text-xs font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-ink-light uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@example.com"
                        className="w-full px-4 py-2 bg-paper-cool border border-border-subtle rounded-xl text-xs font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-ink-light uppercase mb-1">Occasion</label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full px-4 py-2 bg-paper-cool border border-border-subtle rounded-xl text-xs font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors"
                      >
                        <option value="Personal">Personal</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Business / Corporate">Business / Corporate</option>
                        <option value="Birthday / Party">Birthday / Party</option>
                        <option value="School / Team Sports">School / Team Sports</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-ink-light uppercase mb-1">Describe custom tweaks</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        placeholder="E.g., I want the same sign layout but in 2ft x 4ft dimension with our company logo..."
                        className="w-full px-4 py-2 bg-paper-cool border border-border-subtle rounded-xl text-xs font-semibold text-ink focus:outline-none focus:border-brand-blue/50 transition-colors resize-none leading-relaxed"
                      />
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
                    className="w-full py-3 bg-brand-blue text-white text-xs font-bold rounded-xl hover:bg-brand-blue/95 transition-all shadow-md shadow-brand-blue/15 hover:shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] duration-300 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Adding to Cart...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Submit Cart Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Quick Support Guidelines */}
            <div className="bg-white/80 border border-border-subtle rounded-3xl p-5 shadow-sm shadow-ink/5 text-left flex items-start gap-3.5">
              <div className="w-8 h-8 bg-brand-blue/5 border border-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue flex-shrink-0">
                <Info className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-1">
                <h4 className="font-bold text-ink">Design Tweaks & Edits</h4>
                <p className="text-ink-light leading-relaxed">
                  Our graphics team can change layouts, swap colored logos, adjust font weights, or scale dimensions to match your brand style guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating mobile View Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
          <button
            onClick={() => cartRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="bg-brand-blue text-white px-5 py-3 rounded-full font-bold text-xs shadow-lg shadow-brand-blue/30 flex items-center gap-2 animate-bounce cursor-pointer border-none"
          >
            <ShoppingCart className="w-4 h-4" />
            View Cart ({cart.length})
          </button>
        </div>
      )}


      {/* Pop-out Image & Details Card Modal */}
      {lightboxProject && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxProject(null)}
        >
          {/* Main expanded card pop-out (Vertical Stack Layout) */}
          <div 
            className="relative max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col text-left animate-in zoom-in-95 duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button on top-right of modal card */}
            <button 
              onClick={() => setLightboxProject(null)}
              className="absolute top-4 right-4 text-white hover:text-slate-200 bg-black/45 hover:bg-black/60 p-2 rounded-full transition-all cursor-pointer z-50 border-none flex items-center justify-center shadow-sm"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Photo Panel (Fills width) */}
            <div className="relative w-full aspect-[4/3] bg-slate-50 border-b border-slate-100">
              <Image
                src={lightboxImage}
                alt={lightboxProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
                priority
              />

              {/* Modal Navigation Arrows for multiple photos */}
              {lightboxProject.images && lightboxProject.images.length > 1 && (
                <>
                  <button
                    onClick={handleLightboxPrev}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 hover:bg-black/55 border border-white/20 flex items-center justify-center text-white cursor-pointer z-40 transition-all"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleLightboxNext}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 hover:bg-black/55 border border-white/20 flex items-center justify-center text-white cursor-pointer z-40 transition-all"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom details panel (Under the picture) */}
            <div className="p-6 space-y-5">
              <div className="space-y-3">
                {/* Category badge & Title */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-brand-blue/5 border border-brand-blue/10 rounded-full text-[9px] font-bold text-brand-blue uppercase tracking-wider">
                    {lightboxProject.category}
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
                  {lightboxProject.title}
                </h3>
                {/* Description under the picture */}
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {lightboxProject.description}
                </p>
              </div>

              {/* Add to Our Cart Button */}
              <button
                type="button"
                onClick={(e) => {
                  handleToggleCart(e, lightboxProject);
                }}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border-none ${
                  cart.find((item) => item.id === lightboxProject.id)
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                    : "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-md"
                }`}
              >
                {cart.find((item) => item.id === lightboxProject.id) ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Added to Inquiry Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Inquiry Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
