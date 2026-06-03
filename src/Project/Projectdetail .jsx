// ProjectDetail.jsx — EDS Theme (Tailwind + GSAP, no Redux)
// Merges: ProjectDetail + SubProjectDetail + Configuration + ConfigureModal
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

/* ─────────────────────────────────────────
   MOCK DATA — swap with real props/API
───────────────────────────────────────── */
const MOCK_PROJECT = {
  name: "elevator_2",
  company: "Acme Corp",
  specifier: "John Doe",
  jobLocation: "New York, USA",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  subprojects: [
    {
      _id: "sub_1",
      elevatorName: "LEVELe-101 #2",
      status: "In Progress",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

const CONFIG_LEVELS = {
  E: [
    { name: "LEVELe-101", image: "/Elevators/GAF-001v1.jpg", subImage: [{ name: "Variant A", image: "/Elevators/GAF-003 v1.jpg" }, { name: "Variant B", image: "/Elevators/GAF-004 v1.jpg" }] },
    { name: "LEVELe-102", image: "/Elevators/GAF-003 v1.jpg", subImage: [{ name: "Variant A", image: "/Elevators/GAF-004 v1.jpg" }] },
    { name: "LEVELe-103", image: "/Elevators/GAF-004 v1.jpg", subImage: [] },
  ],
  R: [
    { name: "LEVELr-101", image: "/Elevators/GAF-005 v1.jpg", subImage: [] },
    { name: "LEVELr-102", image: "/Elevators/GAF-001v1.jpg", subImage: [] },
  ],
  C: [
    { name: "LEVELc-101", image: "/Elevators/GAF-003 v1.jpg", subImage: [] },
    { name: "LEVELc-102", image: "/Elevators/GAF-004 v1.jpg", subImage: [] },
  ],
};

/* ─────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────── */
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
  borderRadius: "4px",
  color: "#2C2822",
  fontFamily: "inherit",
  backdropFilter: "blur(6px)",
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
};

const labelStyle = {
  fontSize: "9px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(161,124,80,0.75)",
};

function EDSInput({ label, type = "text", value, defaultValue, onChange, readOnly, placeholder, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        style={inputStyle}
        className="px-3 py-2.5 text-xs w-full"
        onFocus={e => { e.target.style.borderColor = "#A17C50"; e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1)"; }}
        onBlur={e => { e.target.style.borderColor = "rgba(161,124,80,0.22)"; e.target.style.boxShadow = "none"; }}
      />
    </div>
  );
}

function EDSSelect({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label style={labelStyle}>{label}</label>}
      <select
        style={{ ...inputStyle, appearance: "none" }}
        className="px-3 py-2.5 text-xs w-full cursor-pointer"
        onFocus={e => { e.target.style.borderColor = "#A17C50"; e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1)"; }}
        onBlur={e => { e.target.style.borderColor = "rgba(161,124,80,0.22)"; e.target.style.boxShadow = "none"; }}
      >
        {children}
      </select>
    </div>
  );
}

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
      onMouseEnter={() => { gsap.to(ref.current, { backgroundColor: "#8B6942", scale: 1.02, duration: 0.25 }); gsap.to(arrowRef.current, { x: 4, duration: 0.2 }); }}
      onMouseLeave={() => { gsap.to(ref.current, { backgroundColor: "#A17C50", scale: 1, duration: 0.25 }); gsap.to(arrowRef.current, { x: 0, duration: 0.2 }); }}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-white rounded-sm focus:outline-none disabled:opacity-50 ${small ? "px-4 py-2 text-[9px]" : "px-6 py-3 text-[10px]"}`}
      style={{ backgroundColor: "#A17C50", boxShadow: "0 6px 20px -4px rgba(161,124,80,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" }}
    >
      {children}
      <svg ref={arrowRef} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: small ? 10 : 12, height: small ? 10 : 12 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </button>
  );
}

/* ─────────────────────────────────────────
   SECTION: CONFIGURATION PANEL
───────────────────────────────────────── */
function ConfigurationPanel({ onSelectImage }) {
  const [activeLevel, setActiveLevel] = useState("E");
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const gridRef = useRef(null);

  const data = CONFIG_LEVELS[activeLevel];

  const switchLevel = (lvl) => {
    gsap.fromTo(gridRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
    setActiveLevel(lvl);
    setOpenIndex(null);
    setSelectedSub(null);
  };

  return (
    <div>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "#7A705F" }}>
        LEVELe pairs aluminum-framed panels with an interlocking grid system. Multiple configurations make it easy to create distinctive elevator interiors.
      </p>

      {/* Level tabs */}
      <div className="flex gap-2 mb-5">
        {["E", "R", "C"].map((lvl) => {
          const active = activeLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => switchLevel(lvl)}
              className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all"
              style={{
                background: active ? "#A17C50" : "rgba(255,255,255,0.5)",
                color: active ? "#fff" : "rgba(161,124,80,0.7)",
                border: `1px solid ${active ? "#A17C50" : "rgba(161,124,80,0.2)"}`,
                boxShadow: active ? "0 4px 12px rgba(161,124,80,0.3)" : "none",
              }}
            >
              {lvl === "E" ? "LEVELe" : lvl === "R" ? "LEVELr" : "LEVELc"}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {data.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="flex flex-col">
              <div
                className="rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  ...glassCard,
                  border: isOpen ? "1px solid #A17C50" : "1px solid rgba(161,124,80,0.18)",
                  boxShadow: isOpen ? "0 0 0 2px rgba(161,124,80,0.25), 0 8px 24px rgba(161,124,80,0.15)" : glassCard.boxShadow,
                }}
              >
                {!isOpen ? (
                  <div onClick={() => setOpenIndex(i)} className="flex flex-col items-center p-3 gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>{item.name}</p>
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  </div>
                ) : (
                  <div className="p-3 flex flex-col gap-2" style={{ minHeight: 120 }}>
                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#A17C50" }}>{item.name} Opening Options</p>
                    <label className="flex items-center gap-2 text-[10px] cursor-pointer" style={{ color: "#5A4F40" }}>
                      <input type="checkbox" className="w-3 h-3 accent-[#A17C50]" /> Front
                    </label>
                    <label className="flex items-center gap-2 text-[10px] cursor-pointer" style={{ color: "#5A4F40" }}>
                      <input type="checkbox" className="w-3 h-3 accent-[#A17C50]" /> Front &amp; Rear
                    </label>
                    <button onClick={() => setOpenIndex(null)} className="text-[9px] mt-1 font-bold uppercase tracking-wider text-left transition-opacity hover:opacity-60" style={{ color: "rgba(161,124,80,0.6)" }}>
                      ← Back
                    </button>
                  </div>
                )}
              </div>

              {/* Sub images */}
              {isOpen && item.subImage && item.subImage.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {item.subImage.map((sub, si) => (
                    <div
                      key={si}
                      onClick={() => { setSelectedSub(sub.image); if (onSelectImage) onSelectImage(sub.image); }}
                      className="flex-1 flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all"
                      style={{
                        ...glassCard,
                        border: selectedSub === sub.image ? "1px solid #A17C50" : "1px solid rgba(161,124,80,0.15)",
                      }}
                    >
                      <p className="text-[9px] font-bold" style={{ color: "#A17C50" }}>{sub.name}</p>
                      <img src={sub.image} alt={sub.name} className="w-14 h-14 object-cover rounded" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION: SUB PROJECT CARD
───────────────────────────────────────── */
function SubProjectCard({ sub, index }) {
  const cardRef = useRef(null);
  const [showConfig, setShowConfig] = useState(false);
  const [configImage, setConfigImage] = useState(sub.image || "/Elevators/GAF-001v1.jpg");

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, delay: index * 0.12, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={cardRef} className="w-full mb-6" style={{ opacity: 0 }}>
      <div style={glassCard} className="overflow-hidden">

        {/* Sub card header */}
        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)", background: "rgba(255,255,255,0.4)" }}>
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full" style={{ background: "#A17C50" }} />
            <div>
              <p className="text-sm font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#2C2822" }}>{sub.elevatorName}</p>
              <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: "rgba(161,124,80,0.1)", color: "#A17C50" }}>
                {sub.status || "In Progress"}
              </span>
            </div>
          </div>
          <div className="text-[9px] text-right" style={{ color: "rgba(161,124,80,0.55)" }}>
            <p>Created: {new Date(sub.createdAt).toLocaleDateString()}</p>
            <p>Modified: {new Date(sub.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

          {/* Col 1 — Image + actions */}
          <div className="p-5 flex flex-col gap-4" style={{ borderRight: "1px solid rgba(161,124,80,0.1)" }}>
            <div className="relative rounded-lg overflow-hidden" style={{ background: "rgba(255,255,255,0.4)", border: "1px solid rgba(161,124,80,0.12)" }}>
              <img src={configImage} alt="Elevator Preview" className="w-full h-44 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: "linear-gradient(to top, rgba(44,40,34,0.7), transparent)" }}>
                <span className="text-white text-[9px] font-bold uppercase tracking-widest opacity-80">IN PROGRESS</span>
              </div>
            </div>

            {/* Download actions */}
            <div className="space-y-0.5">
              <p style={{ ...labelStyle, marginBottom: 8 }}>Downloads</p>
              <ActionBtn icon="↓" label="Overview PDF" />
              <ActionBtn icon="↓" label="Design JPG" />
              <ActionBtn icon="↓" label="Advanced Download" />
            </div>

            {/* Edit actions */}
            <div className="space-y-0.5" style={{ borderTop: "1px solid rgba(161,124,80,0.1)", paddingTop: 12 }}>
              <p style={{ ...labelStyle, marginBottom: 8 }}>Manage</p>
              <ActionBtn icon="✎" label="Edit Design" onClick={() => {}} />
              <ActionBtn icon="⧉" label="Duplicate" onClick={() => {}} />
              <ActionBtn icon="✕" label="Delete Design" onClick={() => {}} danger />
            </div>
          </div>

          {/* Col 2 — Specs */}
          <div className="p-5 flex flex-col gap-4" style={{ borderRight: "1px solid rgba(161,124,80,0.1)" }}>
            <EDSInput label="Elevator Name" value={sub.elevatorName || ""} readOnly />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={labelStyle}>Configuration</label>
                <p className="text-xs mt-1 font-medium" style={{ color: "#2C2822" }}>LEVEL-e-102</p>
              </div>
              <div>
                <label style={labelStyle}>Frame Style</label>
                <p className="text-xs mt-1 font-medium" style={{ color: "#2C2822" }}>Minimal</p>
              </div>
              <div>
                <label style={labelStyle}>Lightplane</label>
                <p className="text-xs mt-1" style={{ color: "#5A4F40" }}>Panel A – N</p>
                <p className="text-xs" style={{ color: "#5A4F40" }}>Panel B – N</p>
              </div>
            </div>

            {/* Dimensions */}
            <div className="rounded-lg p-3" style={{ background: "rgba(161,124,80,0.05)", border: "1px solid rgba(161,124,80,0.12)" }}>
              <label style={{ ...labelStyle, marginBottom: 10, display: "block" }}>Cab Dimensions</label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[["D1","Depth"],["W1","Width"],["H1","Cab Shell Height"],["H2","Ceiling Height"]].map(([code, lbl]) => (
                  <div key={code} className="flex items-center gap-2">
                    <span className="text-[9px] font-black px-1.5 py-1 rounded" style={{ background: "rgba(161,124,80,0.15)", color: "#A17C50" }}>{code}</span>
                    <span className="text-[10px]" style={{ color: "#5A4F40" }}>{lbl}</span>
                  </div>
                ))}
              </div>
              <GoldBtn small>Edit Cab Dimensions</GoldBtn>
            </div>

            <EDSSelect label="Opening Option *">
              <option>Front</option>
              <option>Front &amp; Rear</option>
            </EDSSelect>

            <EDSInput label="Quantity *" type="number" defaultValue="1" />
          </div>

          {/* Col 3 — Job details */}
          <div className="p-5 flex flex-col gap-4">
            <EDSSelect label="Job Type">
              <option value="">Select an Option</option>
              <option>New Installation</option>
              <option>Modernization</option>
            </EDSSelect>

            <EDSSelect label="Elevator Type">
              <option value="">Select an Option</option>
              <option>Hydraulic</option>
              <option>Traction</option>
              <option>Machine Roomless</option>
            </EDSSelect>

            <EDSSelect label="Shell Material">
              <option value="">Select an Option</option>
              <option>Stainless Steel</option>
              <option>Aluminum</option>
              <option>Bronze</option>
            </EDSSelect>

            <EDSSelect label="Manufacturer">
              <option value="">Select an Option</option>
              <option>OTIS</option>
              <option>KONE</option>
              <option>TKE</option>
              <option>Schindler</option>
            </EDSSelect>

            <div className="flex flex-col gap-1.5">
              <label style={labelStyle}>Comments</label>
              <textarea
                rows={4}
                className="w-full text-xs px-3 py-2.5 resize-none"
                style={inputStyle}
                placeholder="Additional notes..."
                onFocus={e => { e.target.style.borderColor = "#A17C50"; e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(161,124,80,0.22)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <p className="text-[9px] leading-relaxed" style={{ color: "rgba(192,57,43,0.7)" }}>
              * Mandatory field — required to request an Advanced Download.
            </p>

            {/* Configuration toggle */}
            <button
              onClick={() => {
                setShowConfig(v => !v);
                gsap.from(".config-panel", { opacity: 0, y: 12, duration: 0.4, ease: "power3.out" });
              }}
              className="mt-auto text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{ color: "#A17C50" }}
            >
              <span style={{ fontSize: 13 }}>⚙</span>
              {showConfig ? "Hide Configuration" : "Change Configuration"}
            </button>
          </div>
        </div>

        {/* Configuration panel (expanded) */}
        {showConfig && (
          <div className="config-panel px-5 pb-5" style={{ borderTop: "1px solid rgba(161,124,80,0.12)" }}>
            <div className="pt-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: "#A17C50" }} />
                <h3 className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif", color: "#2C2822" }}>
                  Select Configuration
                </h3>
              </div>
              <ConfigurationPanel onSelectImage={setConfigImage} />
              {/* Apply bar */}
              <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid rgba(161,124,80,0.12)" }}>
                <div className="flex items-center gap-2 text-[10px]" style={{ color: "#7A705F" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: "#5A8A3C" }} />
                  Status: <span className="font-bold" style={{ color: "#5A8A3C" }}>Ready</span>
                  <span style={{ color: "rgba(161,124,80,0.3)" }}>·</span>
                  Configuration preview
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfig(false)}
                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all"
                    style={{ background: "rgba(161,124,80,0.08)", color: "rgba(161,124,80,0.7)", border: "1px solid rgba(161,124,80,0.2)" }}
                  >
                    Cancel
                  </button>
                  <GoldBtn small onClick={() => setShowConfig(false)}>Apply Configuration</GoldBtn>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN: PROJECT DETAIL
───────────────────────────────────────── */
export default function ProjectDetail({ project = MOCK_PROJECT, id = "mock_id" }) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);

  const [projectName, setProjectName] = useState(project?.name || "elevator_2");
  const [company, setCompany] = useState(project?.company || "");
  const [specifier, setSpecifier] = useState(project?.specifier || "");
  const [jobLocation, setJobLocation] = useState(project?.jobLocation || "");

  const created = project?.createdAt ? new Date(project.createdAt).toLocaleString() : "N/A";
  const lastModified = project?.updatedAt ? new Date(project.updatedAt).toLocaleString() : "N/A";

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current,
      { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }
    )
    .fromTo(headerRef.current,
      { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    )
    .fromTo(cardRef.current,
      { opacity: 0, y: 24, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" },
      "-=0.3"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-x-hidden py-24 px-4 sm:px-8 md:px-12 lg:px-16"
      style={{ backgroundColor: "#F7F4ED", fontFamily: "'DM Sans', sans-serif", opacity: 0 }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;800&display=swap');
        input::placeholder, textarea::placeholder { color: rgba(120,106,88,0.4); }
        select option { background: #F7F4ED; color: #2C2822; }
        @keyframes pulseEds { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.65)} }
      `}</style>

      {/* Background glows */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(161,124,80,0.1) 0%, transparent 70%)", zIndex: 0 }} />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(161,124,80,0.07) 0%, transparent 70%)", zIndex: 0 }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div ref={headerRef} className="mb-6" style={{ opacity: 0 }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-2 mb-4"
            style={{ color: "rgba(161,124,80,0.55)" }}>
            <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <span style={{ color: "rgba(161,124,80,0.3)" }}>›</span>
            <Link to="/profile" className="hover:opacity-70 transition-opacity">My Projects</Link>
            <span style={{ color: "rgba(161,124,80,0.3)" }}>›</span>
            <span style={{ color: "#A17C50" }}>{projectName}</span>
          </p>

          <div className="flex items-center gap-4">
            <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: "#A17C50" }} />
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(22px, 3.5vw, 36px)", color: "#2C2822", lineHeight: 1.2 }}>
                My Project
                <span className="font-light ml-3" style={{ color: "#A17C50" }}>| {projectName}</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Project main card */}
        <div ref={cardRef} className="mb-8" style={{ opacity: 0 }}>
          <div style={glassCard} className="overflow-hidden">

            {/* Card header bar */}
            <div className="px-5 py-3 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.4)", borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A17C50", animation: "pulseEds 2s infinite" }} />
                <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#A17C50" }}>Patent-Pending Technology</span>
              </div>
              <span className="text-[9px]" style={{ color: "rgba(161,124,80,0.45)" }}>Elevator Design Studio v2.0 ⚡</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">

              {/* Col 1 — Preview + project actions */}
              <div className="p-5 flex flex-col gap-4" style={{ borderRight: "1px solid rgba(161,124,80,0.1)" }}>
                <div className="relative rounded-lg overflow-hidden" style={{ border: "1px solid rgba(161,124,80,0.12)" }}>
                  <img src="/Elevators/GAF-001v1.jpg" alt="Elevator Preview" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,40,34,0.5) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white text-[9px] font-bold uppercase tracking-widest">Design Studio</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p style={{ ...labelStyle, marginBottom: 8 }}>Project Actions</p>
                  <ActionBtn icon="＋" label="Add Elevator Interior" onClick={() => {}} />
                  <ActionBtn icon="⧉" label="Duplicate Project" onClick={() => {}} />
                  <ActionBtn icon="✕" label="Delete Project" onClick={() => {}} danger />
                </div>
              </div>

              {/* Col 2 & 3 — Project info */}
              <div className="lg:col-span-2 p-5">
                <p className="text-xs leading-relaxed mb-5" style={{ color: "#7A705F" }}>
                  Within a project you can create multiple elevator interior designs. You can continue modifying them individually until you request an 'Advanced Download'. To ensure data accuracy, your design will stay locked until your request is processed.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Editable fields */}
                  <div className="flex flex-col gap-4">
                    <EDSInput label="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)} />
                    <EDSInput label="Company" value={company} onChange={e => setCompany(e.target.value)} placeholder="Enter company name" />
                    <EDSInput label="Specifier" value={specifier} onChange={e => setSpecifier(e.target.value)} placeholder="Enter specifier" />
                    <div className="flex flex-col gap-1.5">
                      <label style={labelStyle}>Job Location</label>
                      <textarea
                        value={jobLocation}
                        onChange={e => setJobLocation(e.target.value)}
                        rows={2}
                        className="w-full text-xs px-3 py-2.5 resize-none"
                        style={inputStyle}
                        placeholder="Enter job location"
                        onFocus={e => { e.target.style.borderColor = "#A17C50"; e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1)"; }}
                        onBlur={e => { e.target.style.borderColor = "rgba(161,124,80,0.22)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  {/* Dates + save */}
                  <div className="flex flex-col gap-4">
                    <div className="rounded-lg p-4 flex flex-col gap-3" style={{ background: "rgba(161,124,80,0.05)", border: "1px solid rgba(161,124,80,0.12)" }}>
                      <div>
                        <label style={labelStyle}>Created</label>
                        <p className="text-xs mt-1" style={{ color: "#5A4F40" }}>{created}</p>
                      </div>
                      <div>
                        <label style={labelStyle}>Last Modified</label>
                        <p className="text-xs mt-1" style={{ color: "#5A4F40" }}>{lastModified}</p>
                      </div>
                    </div>
                    <GoldBtn small onClick={() => {}}>Save Project</GoldBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub projects */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full" style={{ background: "#A17C50" }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: "#2C2822" }}>
                Elevator Interiors
              </h2>
            </div>
            <GoldBtn small onClick={() => {}}>＋ Add New Interior</GoldBtn>
          </div>

          {(project?.subprojects || MOCK_PROJECT.subprojects).map((sub, i) => (
            <SubProjectCard key={sub._id || i} sub={sub} index={i} />
          ))}
        </div>

        {/* Footer brand row */}
        <div className="mt-10 pt-7" style={{ borderTop: "1px solid rgba(161,124,80,0.15)" }}>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "rgba(161,124,80,0.45)" }}>
            Trusted By Industry Leaders
          </p>
          <div className="flex items-center gap-5" style={{ opacity: 0.45, filter: "grayscale(1)" }}>
            {["OTIS","KONE","TKE"].map(b => (
              <span key={b} className="font-black text-sm tracking-tighter cursor-pointer transition-all hover:opacity-100" style={{ color: "#5A4F40" }}>{b}</span>
            ))}
            <span className="font-light text-xs tracking-wide cursor-pointer" style={{ color: "#5A4F40" }}>Schindler</span>
          </div>
        </div>

      </div>
    </div>
  );
}