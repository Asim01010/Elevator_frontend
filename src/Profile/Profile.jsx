// src/pages/Profile.jsx - EDS Theme with GSAP (No Redux)
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import { FilePenLine, PlusCircle, X, Search, ArrowUpDown } from "lucide-react";

// Mock Data
const MOCK_PROJECTS = [
  {
    _id: "1",
    name: "Burj Khalifa Tower",
    company: "OTIS Elevators",
    createdAt: new Date(2024, 10, 15).toISOString(),
    updatedAt: new Date(2024, 11, 20).toISOString(),
  },
  {
    _id: "2",
    name: "Central Park Tower",
    company: "KONE Corporation",
    createdAt: new Date(2024, 9, 10).toISOString(),
    updatedAt: new Date(2024, 11, 18).toISOString(),
  },
  {
    _id: "3",
    name: "Lotte World Tower",
    company: "TKE Elevators",
    createdAt: new Date(2024, 8, 5).toISOString(),
    updatedAt: new Date(2024, 11, 15).toISOString(),
  },
  {
    _id: "4",
    name: "One World Trade Center",
    company: "Schindler Group",
    createdAt: new Date(2024, 7, 20).toISOString(),
    updatedAt: new Date(2024, 11, 10).toISOString(),
  },
  {
    _id: "5",
    name: "Shanghai Tower",
    company: "Mitsubishi Electric",
    createdAt: new Date(2024, 6, 25).toISOString(),
    updatedAt: new Date(2024, 11, 5).toISOString(),
  },
];

// Shared EDS Styles
const glassCard = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(161,124,80,0.18)",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(161,124,80,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
};

const inputStyle = {
  background: "rgba(255,255,255,0.6)",
  border: "1px solid rgba(161,124,80,0.22)",
  borderRadius: "8px",
  color: "#2C2822",
  fontFamily: "inherit",
  backdropFilter: "blur(6px)",
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
};

const labelStyle = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(161,124,80,0.75)",
};

// Gold Button Component
function GoldBtn({ children, onClick, disabled, small = false }) {
  const ref = useRef(null);
  const arrowRef = useRef(null);
  return (
    <button
      ref={ref}
      onClick={() => {
        if (onClick) onClick();
        gsap.timeline()
          .to(ref.current, { scale: 0.96, duration: 0.1 })
          .to(ref.current, { scale: 1, duration: 0.2, ease: "elastic.out(1,0.5)" });
      }}
      onMouseEnter={() => { 
        gsap.to(ref.current, { backgroundColor: "#8B6942", scale: 1.02, duration: 0.25 }); 
        if (arrowRef.current) gsap.to(arrowRef.current, { x: 4, duration: 0.2 });
      }}
      onMouseLeave={() => { 
        gsap.to(ref.current, { backgroundColor: "#A17C50", scale: 1, duration: 0.25 }); 
        if (arrowRef.current) gsap.to(arrowRef.current, { x: 0, duration: 0.2 });
      }}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-white rounded-lg focus:outline-none disabled:opacity-50 transition-all ${small ? "px-4 py-2 text-[10px]" : "px-6 py-3 text-[11px]"}`}
      style={{ backgroundColor: "#A17C50", boxShadow: "0 6px 20px -4px rgba(161,124,80,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" }}
    >
      {children}
      {arrowRef && (
        <svg ref={arrowRef} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: small ? 10 : 12, height: small ? 10 : 12 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      )}
    </button>
  );
}

// Action Button Component
function ActionBtn({ icon, label, onClick, danger = false }) {
  const ref = useRef(null);
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => gsap.to(ref.current, { x: 3, duration: 0.2 })}
      onMouseLeave={() => gsap.to(ref.current, { x: 0, duration: 0.2 })}
      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest py-1.5 transition-colors"
      style={{ color: danger ? "rgba(192,57,43,0.75)" : "rgba(161,124,80,0.7)", letterSpacing: "0.15em" }}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      {label}
    </button>
  );
}

// Create Project Modal with GSAP
function CreateProjectModal({ isOpen, onClose, onCreate }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", company: "" });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(contentRef.current,
        { scale: 0.95, y: 30, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "back.out(0.6)" }
      );
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company.trim()) return;
    onCreate(formData);
    setFormData({ name: "", company: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(44,40,34,0.6)", backdropFilter: "blur(8px)" }}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-md"
        style={glassCard}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A17C50" }} />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>
              Create New Project
            </h3>
          </div>
          <button
            onClick={onClose}
            className="transition-opacity hover:opacity-60"
            style={{ color: "rgba(161,124,80,0.6)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label style={labelStyle} className="block mb-1.5">Project Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              className="w-full px-3 py-2.5 text-sm"
              placeholder="e.g. Residential Tower Lift"
              onFocus={e => { e.target.style.borderColor = "#A17C50"; e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(161,124,80,0.22)"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <div>
            <label style={labelStyle} className="block mb-1.5">Company Name *</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              style={inputStyle}
              className="w-full px-3 py-2.5 text-sm"
              placeholder="e.g. ABC Elevators Pvt Ltd"
              onFocus={e => { e.target.style.borderColor = "#A17C50"; e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(161,124,80,0.22)"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <div className="flex gap-3 pt-3">
            <GoldBtn small onClick={handleSubmit}>
              Create Project
            </GoldBtn>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
              style={{ background: "rgba(161,124,80,0.08)", color: "rgba(161,124,80,0.7)", border: "1px solid rgba(161,124,80,0.2)" }}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Decorative icon */}
        <div className="absolute -top-3 -right-3 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg opacity-80">
          <span className="text-lg">✨</span>
        </div>
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, onClick, onEdit, onDelete, onDuplicate }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(project._id)}
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={glassCard}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src="/Elevators/GAF-001v1.jpg"
          alt={project.name}
          className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,40,34,0.6) 0%, transparent 60%)" }} />
        <div className="absolute bottom-3 left-3">
          <span className="text-white text-[9px] font-bold uppercase tracking-widest bg-[#A17C50]/80 px-2 py-0.5 rounded-full">
            Design Studio
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold mb-1 line-clamp-1" style={{ color: "#2C2822", fontFamily: "'Playfair Display', serif" }}>
          {project.name}
        </h3>
        <p className="text-[10px] mb-3" style={{ color: "rgba(161,124,80,0.6)" }}>{project.company}</p>

        <div className="flex items-center justify-between pt-2 border-t" style={{ borderTop: "1px solid rgba(161,124,80,0.1)" }}>
          <p className="text-[8px]" style={{ color: "rgba(161,124,80,0.45)" }}>
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onEdit(project._id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:scale-110"
              style={{ color: "rgba(161,124,80,0.6)" }}
            >
              <FilePenLine size={12} />
            </button>
            <button
              onClick={() => onDuplicate(project._id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:scale-110"
              style={{ color: "rgba(161,124,80,0.6)" }}
            >
              <span className="text-xs">⧉</span>
            </button>
            <button
              onClick={() => onDelete(project._id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:scale-110"
              style={{ color: "rgba(192,57,43,0.6)" }}
            >
              <span className="text-xs">✕</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Profile Component
const Profile = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState("date");
  const [isLoading, setIsLoading] = useState(false);

  // GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    ).fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );
  }, []);

  const handleCreateProject = (formData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newProject = {
        _id: Date.now().toString(),
        name: formData.name,
        company: formData.company,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProjects([newProject, ...projects]);
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project? This will delete all its designs too.")) {
      setProjects(projects.filter(p => p._id !== id));
    }
  };

  const handleDuplicateProject = (id) => {
    const projectToDuplicate = projects.find(p => p._id === id);
    const newName = prompt("Enter new project name:", `${projectToDuplicate?.name} (Copy)`);
    if (newName && newName.trim()) {
      const duplicatedProject = {
        ...projectToDuplicate,
        _id: Date.now().toString(),
        name: newName.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProjects([duplicatedProject, ...projects]);
    }
  };

  const handleEditProject = (id) => {
    const projectToEdit = projects.find(p => p._id === id);
    const newName = prompt("Enter new project name:", projectToEdit?.name);
    if (newName && newName.trim()) {
      setProjects(projects.map(p => 
        p._id === id ? { ...p, name: newName.trim(), updatedAt: new Date().toISOString() } : p
      ));
    }
  };

  // Client-side search & sort
  const filteredAndSortedProjects = projects
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortMode === "az") return a.name.localeCompare(b.name);
      if (sortMode === "za") return b.name.localeCompare(a.name);
      if (sortMode === "date") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-x-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20"
      style={{ backgroundColor: "#F7F4ED", fontFamily: "'DM Sans', sans-serif", opacity: 0 }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        input::placeholder, textarea::placeholder { color: rgba(120,106,88,0.4); }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Background glows */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(161,124,80,0.08) 0%, transparent 70%)", zIndex: 0 }} />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(161,124,80,0.06) 0%, transparent 70%)", zIndex: 0 }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div ref={headerRef} className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-2"
            style={{ color: "rgba(161,124,80,0.55)" }}>
            <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <span style={{ color: "rgba(161,124,80,0.3)" }}>›</span>
            <span style={{ color: "#A17C50" }}>My Profile</span>
          </p>

          <div className="flex items-center gap-4 mt-4">
            <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: "#A17C50" }} />
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(24px, 4vw, 36px)", color: "#2C2822", lineHeight: 1.2 }}>
                My Profile
                <span className="font-light ml-3" style={{ color: "#A17C50" }}>| Elevator Design Studio</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Header Description */}
        <div className="mb-10" style={glassCard}>
          <div className="p-5">
            <p className="text-xs leading-relaxed" style={{ color: "#7A705F" }}>
              FAST-TRACK THE DESIGN PROCESS! my.EDS lets you create and manage Elevator Design Studio projects, 
              designs, and your profile information from one spot.
            </p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* My Profile Section */}
          <div style={glassCard}>
            <div className="p-5 border-b" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A17C50" }} />
                <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>My Profile</h2>
              </div>
            </div>
            <div className="p-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src="/Howorks.jpg"
                alt="Profile placeholder"
                className="w-32 h-32 object-cover rounded-lg shadow-md"
                style={{ border: "1px solid rgba(161,124,80,0.15)" }}
              />
              <div className="space-y-2 w-full">
                <ActionBtn icon="✎" label="Edit Username/Password" onClick={() => navigate("/profile-edit")} />
                <ActionBtn icon="✎" label="Edit Contact Information" onClick={() => navigate("/profile-edit")} />
              </div>
            </div>
          </div>

          {/* How Does It Work Section */}
          <div style={glassCard}>
            <div className="p-5 border-b" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A17C50" }} />
                <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>How Does It Work?</h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-[11px] leading-relaxed mb-4" style={{ color: "#7A705F" }}>
                Getting started with the Elevator Design Studio (EDS) is easy. In 10 simple steps, 
                this tutorial will show you how to select your elevator interior configuration, 
                apply materials and finishes, view your progress with realistic renderings, 
                and manage your project from a single location.
              </p>
              <Link to="/how-does-it-work" className="inline-block">
                <span className="text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-70" style={{ color: "#A17C50" }}>
                  Learn More →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Create New Project & My Projects Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create New Project */}
          <div>
            <div style={glassCard}>
              <div className="p-5 border-b" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A17C50" }} />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>Create New Project</h2>
                </div>
              </div>
              <div
                className="p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-105"
                onClick={() => setShowCreateModal(true)}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(161,124,80,0.1)" }}>
                  <PlusCircle size={40} style={{ color: "#A17C50" }} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#A17C50" }}>Start New Project</p>
                <p className="text-[9px] text-center" style={{ color: "rgba(161,124,80,0.5)" }}>Click to create a new elevator interior project</p>
              </div>
            </div>
          </div>

          {/* My Projects */}
          <div className="lg:col-span-2">
            <div style={glassCard}>
              <div className="p-5 border-b" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A17C50" }} />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>My Projects</h2>
                </div>
                <p className="text-[11px] leading-relaxed mb-4" style={{ color: "#7A705F" }}>
                  Just click on any project thumbnail to open it and access its corresponding Elevator Design Studio (EDS) designs, 
                  or start an entirely new project.
                </p>

                {/* Search and Sort */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(161,124,80,0.5)" }} />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={inputStyle}
                        className="w-full pl-9 pr-3 py-2 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortMode("date")}
                      className={`px-3 py-2 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all ${sortMode === "date" ? "bg-[#A17C50] text-white" : "bg-white/60 text-gray-600"}`}
                      style={{ border: "1px solid rgba(161,124,80,0.2)" }}
                    >
                      Date
                    </button>
                    <button
                      onClick={() => setSortMode("az")}
                      className={`px-3 py-2 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all ${sortMode === "az" ? "bg-[#A17C50] text-white" : "bg-white/60 text-gray-600"}`}
                      style={{ border: "1px solid rgba(161,124,80,0.2)" }}
                    >
                      A-Z
                    </button>
                    <button
                      onClick={() => setSortMode("za")}
                      className={`px-3 py-2 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all ${sortMode === "za" ? "bg-[#A17C50] text-white" : "bg-white/60 text-gray-600"}`}
                      style={{ border: "1px solid rgba(161,124,80,0.2)" }}
                    >
                      Z-A
                    </button>
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="p-5">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#A17C50", borderTopColor: "transparent" }} />
                  </div>
                ) : filteredAndSortedProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-sm" style={{ color: "rgba(161,124,80,0.5)" }}>No projects found</p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="mt-4 text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
                      style={{ color: "#A17C50" }}
                    >
                      Create your first project →
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredAndSortedProjects.map((project) => (
                      <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={(id) => navigate(`/project/${id}`)}
                        onEdit={handleEditProject}
                        onDelete={handleDeleteProject}
                        onDuplicate={handleDuplicateProject}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t" style={{ borderTop: "1px solid rgba(161,124,80,0.15)" }}>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(161,124,80,0.45)" }}>
            Trusted By Industry Leaders
          </p>
          <div className="flex items-center gap-5" style={{ opacity: 0.45, filter: "grayscale(1)" }}>
            {["OTIS", "KONE", "TKE"].map(b => (
              <span key={b} className="font-black text-sm tracking-tighter cursor-pointer transition-all hover:opacity-100" style={{ color: "#5A4F40" }}>{b}</span>
            ))}
            <span className="font-light text-xs tracking-wide cursor-pointer" style={{ color: "#5A4F40" }}>Schindler</span>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
};

export default Profile;