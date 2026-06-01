import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const ctaRef = useRef(null);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(logoRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.4")
      .fromTo(
        linksRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07 },
        "-=0.3"
      )
      .fromTo(ctaRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, "-=0.2");

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openSidebar = () => {
    setSidebarOpen(true);
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: "block" });
    gsap.fromTo(
      sidebarRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.45, ease: "power3.out" }
    );
    // Animate hamburger to X
    gsap.to(hamburgerRef.current.children[0], { rotate: 45, y: 8, duration: 0.3 });
    gsap.to(hamburgerRef.current.children[1], { opacity: 0, duration: 0.2 });
    gsap.to(hamburgerRef.current.children[2], { rotate: -45, y: -8, duration: 0.3 });
  };

  const closeSidebar = () => {
    gsap.to(sidebarRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setSidebarOpen(false),
    });
    // Animate X back to hamburger
    gsap.to(hamburgerRef.current.children[0], { rotate: 0, y: 0, duration: 0.3 });
    gsap.to(hamburgerRef.current.children[1], { opacity: 1, duration: 0.2 });
    gsap.to(hamburgerRef.current.children[2], { rotate: 0, y: 0, duration: 0.3 });
  };

  const handleCtaHover = (e, enter) => {
    gsap.to(e.currentTarget, {
      scale: enter ? 1.05 : 1,
      boxShadow: enter ? "0 8px 30px rgba(176,140,76,0.45)" : "0 0px 0px rgba(0,0,0,0)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const navLinks = [
    { label: "Platform", hasDropdown: true, key: "platform" },
    { label: "Design Studio", hasDropdown: false },
    { label: "Material Library", hasDropdown: false },
    { label: "Suppliers", hasDropdown: false },
    { label: "Pricing", hasDropdown: false },
    { label: "Company", hasDropdown: true, key: "company" },
  ];

  const platformItems = ["Overview", "Features", "Integrations", "How It Works"];
  const companyItems = ["About Us", "Careers", "Contact", "Press"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');
        
        :root {
          --gold: #B08C4C;
          --gold-light: #D4AF72;
          --gold-dark: #8B6D35;
          --cream: #F5F0E8;
          --cream-dark: #EDE5D4;
          --dark: #1A1610;
          --dark-mid: #2C2418;
          --text-muted: #8A7A5A;
          --white: #FFFFFF;
        }

        .meds-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          font-family: 'Jost', sans-serif;
          transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease;
          padding: 0 2.5rem;
        }

        .meds-navbar.scrolled {
          background: rgba(250, 247, 240, 0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 40px rgba(176,140,76,0.12);
        }

        .meds-navbar:not(.scrolled) {
          background: rgba(250, 247, 240, 0.95);
          backdrop-filter: blur(8px);
        }

        .nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          height: 72px;
          gap: 2rem;
        }

        /* LOGO */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .logo-meds {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--dark);
          letter-spacing: 0.1em;
        }

        .logo-sub {
          font-size: 0.52rem;
          color: var(--text-muted);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 400;
          margin-top: 1px;
        }

        /* NAV LINKS */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          list-style: none;
          margin: 0;
          padding: 0;
          margin-left: auto;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.45rem 0.75rem;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--dark);
          text-decoration: none;
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'Jost', sans-serif;
          transition: color 0.2s ease;
          white-space: nowrap;
        }

        .nav-link:hover { color: var(--gold); }

        .nav-link svg {
          width: 10px;
          height: 10px;
          transition: transform 0.2s ease;
          fill: currentColor;
        }

        .nav-item:hover .nav-link svg { transform: rotate(180deg); }

        /* DROPDOWN */
        .dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--white);
          border: 1px solid rgba(176,140,76,0.2);
          border-top: 2px solid var(--gold);
          box-shadow: 0 20px 60px rgba(26,22,16,0.12);
          min-width: 180px;
          padding: 0.5rem 0;
          opacity: 0;
          visibility: hidden;
          transform: translateX(-50%) translateY(8px);
          transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
          z-index: 100;
        }

        .nav-item:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dropdown a {
          display: block;
          padding: 0.55rem 1.2rem;
          font-size: 0.78rem;
          color: var(--dark);
          text-decoration: none;
          font-weight: 400;
          letter-spacing: 0.04em;
          transition: color 0.2s, background 0.2s;
        }

        .dropdown a:hover {
          color: var(--gold);
          background: rgba(176,140,76,0.05);
        }

        /* CTA BUTTONS */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .btn-demo {
          padding: 0.55rem 1.2rem;
          background: var(--gold);
          color: var(--white);
          border: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .btn-demo:hover { background: var(--gold-dark); }

        .btn-signin {
          padding: 0.5rem 0.9rem;
          background: transparent;
          color: var(--dark);
          border: 1px solid rgba(176,140,76,0.4);
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .btn-signin:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        /* HAMBURGER */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          background: none;
          border: none;
          margin-left: 1rem;
        }

        .hamburger span {
          display: block;
          width: 26px;
          height: 2px;
          background: var(--dark);
          transform-origin: center;
        }

        /* SIDEBAR OVERLAY */
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26,22,16,0.5);
          z-index: 1001;
          opacity: 0;
          display: none;
          backdrop-filter: blur(4px);
        }

        /* SIDEBAR */
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: min(360px, 88vw);
          height: 100dvh;
          background: var(--cream);
          z-index: 1002;
          transform: translateX(100%);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.8rem;
          border-bottom: 1px solid rgba(176,140,76,0.2);
        }

        .sidebar-close {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(176,140,76,0.3);
          background: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .sidebar-close:hover {
          border-color: var(--gold);
          background: rgba(176,140,76,0.08);
        }

        .sidebar-close svg { width: 16px; height: 16px; stroke: var(--dark); }

        .sidebar-nav {
          padding: 1.5rem 0;
          flex: 1;
        }

        .sidebar-section {
          padding: 0 1.8rem;
          margin-bottom: 0.5rem;
        }

        .sidebar-section-label {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.5rem;
          margin-top: 1rem;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(176,140,76,0.1);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--dark);
          text-decoration: none;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: color 0.2s;
        }

        .sidebar-link:hover { color: var(--gold); }
        .sidebar-link svg { width: 14px; height: 14px; stroke: var(--text-muted); }

        .sidebar-sub-link {
          display: block;
          padding: 0.45rem 0;
          font-size: 0.82rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .sidebar-sub-link:hover { color: var(--gold); }

        .sidebar-footer {
          padding: 1.5rem 1.8rem;
          border-top: 1px solid rgba(176,140,76,0.2);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .sidebar-footer .btn-demo {
          width: 100%;
          justify-content: center;
          padding: 0.85rem;
        }

        .sidebar-footer .btn-signin {
          width: 100%;
          text-align: center;
          padding: 0.75rem;
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .nav-links { display: none; }
          .btn-signin { display: none; }
          .btn-demo { display: none; }
          .hamburger { display: flex; margin-left: auto; }
          .nav-inner { gap: 0; }
        }

        @media (max-width: 480px) {
          .meds-navbar { padding: 0 1.2rem; }
        }
      `}</style>

      <nav ref={navRef} className={`meds-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <a ref={logoRef} href="/" className="nav-logo">
            <svg className="logo-icon" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="40" height="40" rx="2" stroke="#B08C4C" strokeWidth="1.5"/>
              <rect x="7" y="8" width="10" height="26" rx="1" fill="#B08C4C" fillOpacity="0.15" stroke="#B08C4C" strokeWidth="1.2"/>
              <rect x="16" y="8" width="10" height="26" rx="1" fill="#B08C4C" fillOpacity="0.08" stroke="#B08C4C" strokeWidth="0.8"/>
              <rect x="25" y="8" width="10" height="26" rx="1" fill="#B08C4C" fillOpacity="0.15" stroke="#B08C4C" strokeWidth="1.2"/>
              <line x1="7" y1="21" x2="35" y2="21" stroke="#B08C4C" strokeWidth="1"/>
            </svg>
            <div className="logo-text">
              <span className="logo-meds">MEDS</span>
              <span className="logo-sub">My Elevator Design Studio</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {navLinks.map((link, i) => (
              <li key={link.label} className="nav-item">
                <a
                  ref={(el) => (linksRef.current[i] = el)}
                  className="nav-link"
                  href="#"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  )}
                </a>
                {link.hasDropdown && (
                  <div className="dropdown">
                    {(link.key === "platform" ? platformItems : companyItems).map((item) => (
                      <a key={item} href="#">{item}</a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div ref={ctaRef} className="nav-actions">
            <button className="btn-signin">Sign In</button>
            <a
              href="#"
              className="btn-demo"
              onMouseEnter={(e) => handleCtaHover(e, true)}
              onMouseLeave={(e) => handleCtaHover(e, false)}
            >
              Request a Demo
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>

          {/* Hamburger */}
          <button ref={hamburgerRef} className="hamburger" onClick={openSidebar} aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div ref={overlayRef} className="sidebar-overlay" onClick={closeSidebar} />

      {/* Sidebar */}
      <div ref={sidebarRef} className="sidebar">
        <div className="sidebar-header">
          <a href="/" className="nav-logo">
            <svg width="34" height="34" viewBox="0 0 42 42" fill="none">
              <rect x="1" y="1" width="40" height="40" rx="2" stroke="#B08C4C" strokeWidth="1.5"/>
              <rect x="7" y="8" width="10" height="26" rx="1" fill="#B08C4C" fillOpacity="0.15" stroke="#B08C4C" strokeWidth="1.2"/>
              <rect x="16" y="8" width="10" height="26" rx="1" fill="#B08C4C" fillOpacity="0.08" stroke="#B08C4C" strokeWidth="0.8"/>
              <rect x="25" y="8" width="10" height="26" rx="1" fill="#B08C4C" fillOpacity="0.15" stroke="#B08C4C" strokeWidth="1.2"/>
              <line x1="7" y1="21" x2="35" y2="21" stroke="#B08C4C" strokeWidth="1"/>
            </svg>
            <div className="logo-text">
              <span className="logo-meds" style={{fontSize:"1.3rem"}}>MEDS</span>
              <span className="logo-sub">My Elevator Design Studio</span>
            </div>
          </a>
          <button className="sidebar-close" onClick={closeSidebar}>
            <svg viewBox="0 0 16 16" fill="none" strokeWidth="1.8" strokeLinecap="round">
              <line x1="2" y1="2" x2="14" y2="14"/>
              <line x1="14" y1="2" x2="2" y2="14"/>
            </svg>
          </button>
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-section">
            <div className="sidebar-section-label">Platform</div>
            {platformItems.map((item) => (
              <a key={item} href="#" className="sidebar-sub-link">{item}</a>
            ))}

            <a href="#" className="sidebar-link" style={{marginTop:"0.5rem"}}>
              Design Studio
              <svg viewBox="0 0 14 14" fill="none" strokeWidth="1.5" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
            </a>
            <a href="#" className="sidebar-link">
              Material Library
              <svg viewBox="0 0 14 14" fill="none" strokeWidth="1.5" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
            </a>
            <a href="#" className="sidebar-link">
              Suppliers
              <svg viewBox="0 0 14 14" fill="none" strokeWidth="1.5" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
            </a>
            <a href="#" className="sidebar-link">
              Pricing
              <svg viewBox="0 0 14 14" fill="none" strokeWidth="1.5" strokeLinecap="round"><path d="M2 7h10M7 2l5 5-5 5"/></svg>
            </a>

            <div className="sidebar-section-label" style={{marginTop:"1.5rem"}}>Company</div>
            {companyItems.map((item) => (
              <a key={item} href="#" className="sidebar-sub-link">{item}</a>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <a href="#" className="btn-demo">Request a Demo</a>
          <button className="btn-signin">Sign In</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;