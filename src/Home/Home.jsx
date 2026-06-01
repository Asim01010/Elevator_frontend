import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Elevator image placeholders (Unsplash elevator/luxury interior) ─── */
const HERO_IMG =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80";
const GALLERY = [
  { src: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=500&q=80", label: "Modern Luxe", sub: "Timeless sophistication" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80", label: "Natural Elegance", sub: "Light, Warm, Refined" },
  { src: "https://images.unsplash.com/photo-1486304873000-235643847519?w=500&q=80", label: "Premium Wood", sub: "Rich textures, Elevated" },
  { src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=500&q=80", label: "Contemporary", sub: "Bold lines, Modern edge" },
];
const TABLET_IMG =
  "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&q=80";

const FEATURES = [
  { icon: "◈", title: "Real-Time Rendering", desc: "Instantly visualize every detail" },
  { icon: "◇", title: "Smart Budgeting", desc: "Accurate pricing in real-time" },
  { icon: "⬡", title: "Code & Weight Check", desc: "Built-in compliance validation" },
  { icon: "◎", title: "Collaboration", desc: "Work together seamlessly" },
  { icon: "⊕", title: "Supplier Network", desc: "Connect with trusted partners" },
  { icon: "▣", title: "Anywhere Access", desc: "Desktop, tablet, or mobile" },
];

const WORKFLOW = [
  { n: "01", icon: "✏", title: "Design", desc: "Customize every detail in our interactive studio" },
  { n: "02", icon: "◈", title: "Visualize", desc: "Real-time 3D renderings bring your design to life" },
  { n: "03", icon: "$", title: "Budget", desc: "Smart pricing & budgeting with instant estimates" },
  { n: "04", icon: "☰", title: "Document", desc: "Generate drawings, specs & submittals automatically" },
  { n: "05", icon: "◎", title: "Collaborate", desc: "Share, review & approve with your team in real time" },
  { n: "06", icon: "⚙", title: "Produce", desc: "Connect with suppliers and fabricators" },
];

const TOOLS = [
  { icon: "▣", label: "Mosaic Visualization" },
  { icon: "◈", label: "AR Experience Coming Soon" },
  { icon: "☁", label: "Cloud Collaboration" },
  { icon: "⊕", label: "Secure & Scalable Platform" },
];

const BRANDS = ["OTIS", "KONE", "TKE", "Schindler", "Hyundai"];

export default function Home() {
  const heroRef = useRef(null);
  const heroTagRef = useRef(null);
  const heroH1Ref = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnsRef = useRef(null);
  const heroImgRef = useRef(null);
  const studioCardRef = useRef(null);
  const brandsRef = useRef(null);
  const featureCardsRef = useRef([]);
  const workflowRef = useRef([]);
  const galleryRef = useRef([]);
  const suppRef = useRef(null);
  const toolsSectionRef = useRef(null);

  const [activeWall, setActiveWall] = useState(0);
  const [activeHandrail, setActiveHandrail] = useState(0);

  const WALL_COLORS = ["#C2A06E", "#E8E0D0", "#D0CABC", "#1A1610"];
  const HANDRAIL_COLORS = ["#B08C4C", "#E8E0D0", "#1A1610"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(heroTagRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.3 })
        .fromTo(heroH1Ref.current.children, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, "-=0.2")
        .fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(heroBtnsRef.current.children, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.12 }, "-=0.2")
        .fromTo(heroImgRef.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.6")
        .fromTo(studioCardRef.current, { opacity: 0, x: 30, y: -10 }, { opacity: 1, x: 0, y: 0, duration: 0.6 }, "-=0.5")
        .fromTo(brandsRef.current.children, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, "-=0.3");

      // Feature cards scroll
      featureCardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, delay: (i % 6) * 0.07,
            scrollTrigger: { trigger: el, start: "top 88%", once: true }
          }
        );
      });

      // Workflow scroll
      workflowRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.09,
            scrollTrigger: { trigger: el, start: "top 90%", once: true }
          }
        );
      });

      // Gallery
      galleryRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.55, delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 88%", once: true }
          }
        );
      });

      // Supplier section
      if (suppRef.current) {
        gsap.fromTo(suppRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.7,
            scrollTrigger: { trigger: suppRef.current, start: "top 80%", once: true }
          }
        );
      }

      // Tools section
      if (toolsSectionRef.current) {
        gsap.fromTo(toolsSectionRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7,
            scrollTrigger: { trigger: toolsSectionRef.current, start: "top 80%", once: true }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const animBtn = (el, enter) => {
    gsap.to(el, {
      scale: enter ? 1.04 : 1,
      boxShadow: enter ? "0 8px 28px rgba(176,140,76,0.4)" : "none",
      duration: 0.22,
      ease: "power2.out",
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700;800&family=Jost:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #B08C4C;
          --gold-light: #D4AF72;
          --gold-dark: #8B6D35;
          --cream: #F8F4EC;
          --cream-mid: #EDE5D4;
          --cream-dark: #E3D9C5;
          --dark: #1A1610;
          --dark-mid: #2C2418;
          --text-muted: #8A7A5A;
          --white: #FFFFFF;
          --border: rgba(176,140,76,0.2);
        }

        body { background: var(--cream); font-family: 'Jost', sans-serif; color: var(--dark); overflow-x: hidden; }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          padding-top: 72px;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 3rem;
          padding-right: 3rem;
          gap: 2rem;
          align-items: center;
          position: relative;
        }

        .hero-left { padding: 3rem 0; z-index: 1; }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.5rem;
        }

        .hero-tag::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: var(--gold);
        }

        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 4.5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.05;
          color: var(--dark);
          margin-bottom: 1.5rem;
        }

        .hero-h1 .accent { color: var(--gold); display: block; }

        .hero-sub {
          font-size: 0.92rem;
          font-weight: 400;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 420px;
          margin-bottom: 2.5rem;
        }

        .hero-btns {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.8rem;
          background: var(--gold);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: var(--gold-dark); }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.82rem 1.5rem;
          background: transparent;
          color: var(--dark);
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }
        .btn-ghost svg circle { transition: fill 0.2s; }
        .btn-ghost:hover { color: var(--gold); }

        .trusted-section { margin-top: 3rem; }
        .trusted-label {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .trusted-logos {
          display: flex;
          align-items: center;
          gap: 1.8rem;
          flex-wrap: wrap;
        }

        .trusted-logos span {
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #C0B090;
        }

        /* HERO RIGHT */
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 520px;
        }

        .hero-img-wrap {
          width: 100%;
          height: 580px;
          position: relative;
          overflow: hidden;
        }

        .hero-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, var(--cream) 0%, transparent 18%);
          pointer-events: none;
        }

        /* STUDIO CARD */
        .studio-card {
          position: absolute;
          top: 2rem;
          right: -1rem;
          width: 230px;
          background: rgba(250,247,240,0.97);
          border: 1px solid var(--border);
          border-top: 2px solid var(--gold);
          box-shadow: 0 20px 60px rgba(26,22,16,0.1);
          padding: 1.2rem;
          z-index: 10;
        }

        .studio-card-title {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .studio-card-title span { font-size: 1rem; cursor: pointer; color: var(--text-muted); }

        .config-label {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          margin-top: 0.8rem;
        }

        .config-icons {
          display: flex;
          gap: 0.4rem;
          margin-bottom: 0.5rem;
        }

        .config-icon {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          cursor: pointer;
          transition: border-color 0.2s;
          color: var(--text-muted);
        }
        .config-icon.active { border-color: var(--gold); color: var(--gold); background: rgba(176,140,76,0.06); }
        .config-icon:hover { border-color: var(--gold); }

        .color-swatches { display: flex; gap: 0.4rem; flex-wrap: wrap; }

        .swatch {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.2s, transform 0.2s;
        }
        .swatch.active { border-color: var(--gold); transform: scale(1.15); }
        .swatch:hover { transform: scale(1.1); }

        .handrail-swatches { display: flex; gap: 0.5rem; margin-bottom: 0.3rem; }
        .handrail-swatch {
          height: 6px;
          width: 40px;
          border-radius: 3px;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: border-color 0.2s;
        }
        .handrail-swatch.active { border-color: var(--gold); }

        .btn-view-render {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: 1rem;
          padding: 0.7rem 0.9rem;
          background: var(--gold);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-view-render:hover { background: var(--gold-dark); }

        /* ── FEATURES BAR ── */
        .features-bar {
          background: var(--white);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .features-bar-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0;
        }

        .feature-bar-item {
          padding: 1.8rem 1.2rem;
          border-right: 1px solid var(--border);
          text-align: center;
        }
        .feature-bar-item:last-child { border-right: none; }

        .feature-bar-icon {
          font-size: 1.2rem;
          color: var(--gold);
          margin-bottom: 0.5rem;
          display: block;
        }

        .feature-bar-title {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--dark);
          margin-bottom: 0.3rem;
        }

        .feature-bar-desc {
          font-size: 0.7rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        /* ── WORKFLOW ── */
        .workflow-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 5rem 3rem;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 4rem;
          align-items: start;
        }

        .workflow-left-tag {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1rem;
        }

        .workflow-left h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 2.5vw, 2.5rem);
          font-weight: 700;
          line-height: 1.1;
          color: var(--dark);
          margin-bottom: 1.5rem;
        }

        .workflow-left p {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.4rem;
          background: transparent;
          border: 1px solid var(--gold);
          color: var(--gold);
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-outline:hover { background: var(--gold); color: #fff; }

        .workflow-steps {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0;
          position: relative;
        }

        .workflow-steps::before {
          content: '';
          position: absolute;
          top: 28px;
          left: 30px;
          right: 30px;
          height: 1px;
          background: linear-gradient(to right, var(--gold) 0%, rgba(176,140,76,0.2) 100%);
        }

        .workflow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 0.5rem;
          position: relative;
        }

        .step-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--gold);
          line-height: 1;
          margin-bottom: 0.8rem;
        }

        .step-icon-wrap {
          width: 52px;
          height: 52px;
          border: 1px solid var(--border);
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: var(--gold);
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
          transition: all 0.2s;
        }
        .workflow-step:hover .step-icon-wrap {
          border-color: var(--gold);
          background: rgba(176,140,76,0.06);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(176,140,76,0.2);
        }

        .step-title {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--dark);
          margin-bottom: 0.4rem;
        }

        .step-desc {
          font-size: 0.68rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* ── GALLERY + SUPPLIERS ── */
        .gallery-section {
          background: var(--cream-mid);
          padding: 4rem 0;
        }

        .gallery-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 4rem;
        }

        .gallery-left {}

        .gallery-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .gallery-tag {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .gallery-tag::before { content: '—'; }

        .gallery-explore {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .gallery-item img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .gallery-item:hover img { transform: scale(1.05); }

        .gallery-item-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem 0.8rem 0.8rem;
          background: linear-gradient(to top, rgba(26,22,16,0.85) 0%, transparent 100%);
          color: #fff;
        }

        .gallery-item-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }

        .gallery-item-sub {
          font-size: 0.62rem;
          color: rgba(255,255,255,0.7);
        }

        .gallery-item-btn {
          position: absolute;
          top: 0.7rem;
          right: 0.7rem;
          width: 28px;
          height: 28px;
          background: rgba(176,140,76,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.9rem;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .gallery-item:hover .gallery-item-btn { opacity: 1; }

        /* SUPPLIERS */
        .suppliers-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .suppliers-tag {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.8rem;
        }

        .suppliers-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 2.5vw, 2.5rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
          color: var(--dark);
        }

        .suppliers-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .suppliers-list {
          list-style: none;
          margin-bottom: 2rem;
        }

        .suppliers-list li {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: var(--dark);
          padding: 0.4rem 0;
        }

        .suppliers-list li::before {
          content: '';
          width: 7px;
          height: 7px;
          background: var(--gold);
          flex-shrink: 0;
        }

        .network-map {
          width: 100%;
          height: 120px;
          background: var(--cream-dark);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
          position: relative;
          overflow: hidden;
        }

        .network-map-inner {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .map-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--gold);
          border-radius: 50%;
        }

        .map-line {
          position: absolute;
          background: rgba(176,140,76,0.3);
          height: 1px;
          transform-origin: left center;
        }

        /* ── TOOLS ── */
        .tools-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 5rem 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .tools-devices {
          position: relative;
          min-height: 340px;
        }

        .device-tablet {
          position: relative;
          z-index: 2;
          width: 75%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(26,22,16,0.18);
          border: 6px solid var(--dark);
          background: var(--dark);
        }

        .device-tablet img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          display: block;
        }

        .device-phone {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 35%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(26,22,16,0.2);
          border: 4px solid var(--dark);
          background: var(--dark);
          z-index: 3;
        }

        .device-phone img {
          width: 100%;
          aspect-ratio: 9/16;
          object-fit: cover;
          display: block;
        }

        .tools-right {}

        .tools-tag {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.8rem;
        }

        .tools-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 3rem);
          font-weight: 700;
          line-height: 1.05;
          margin-bottom: 2rem;
          color: var(--dark);
        }

        .tools-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .tool-item {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
        }

        .tool-icon-wrap {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          font-size: 1rem;
          flex-shrink: 0;
        }

        .tool-label {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--dark);
          line-height: 1.3;
        }

        .tools-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.7;
        }

        /* ── FOOTER ── */
        .footer {
          background: var(--cream-dark);
          border-top: 1px solid var(--border);
          padding: 3rem 3rem 1.5rem;
        }

        .footer-inner {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr;
          gap: 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1.5rem;
        }

        .footer-brand .logo-meds { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 700; color: var(--dark); letter-spacing: 0.1em; display: block; margin-bottom: 0.3rem; }
        .footer-brand .logo-sub { font-size: 0.55rem; color: var(--text-muted); letter-spacing: 0.15em; text-transform: uppercase; }

        .footer-col-title {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--dark);
          margin-bottom: 1rem;
        }

        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 0.5rem; }
        .footer-links a { font-size: 0.78rem; color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--gold); }

        .footer-social {
          display: flex;
          gap: 0.7rem;
          margin-top: 0.5rem;
        }

        .social-icon {
          width: 32px;
          height: 32px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .social-icon:hover { border-color: var(--gold); color: var(--gold); }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .footer-bottom-links {
          display: flex;
          gap: 1.5rem;
        }
        .footer-bottom-links a { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
        .footer-bottom-links a:hover { color: var(--gold); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .hero { grid-template-columns: 1fr; padding: 5rem 1.5rem 3rem; }
          .hero-right { display: none; }
          .features-bar-inner { grid-template-columns: repeat(3, 1fr); }
          .feature-bar-item:nth-child(3) { border-right: none; }
          .feature-bar-item:nth-child(3) ~ .feature-bar-item { border-top: 1px solid var(--border); }
          .workflow-section { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 1.5rem; }
          .workflow-steps { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          .workflow-steps::before { display: none; }
          .gallery-inner { grid-template-columns: 1fr; gap: 2rem; padding: 0 1.5rem; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .tools-section { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 1.5rem; }
          .footer-top { grid-template-columns: 1fr 1fr 1fr; gap: 2rem; }
        }

        @media (max-width: 768px) {
          .hero { padding: 5rem 1.2rem 2rem; }
          .features-bar-inner { grid-template-columns: repeat(2, 1fr); }
          .feature-bar-item:nth-child(2) { border-right: none; }
          .workflow-steps { grid-template-columns: repeat(2, 1fr); }
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .tools-grid { grid-template-columns: 1fr; }
          .footer-top { grid-template-columns: 1fr 1fr; }
          .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
        }

        @media (max-width: 480px) {
          .features-bar-inner { grid-template-columns: 1fr; }
          .feature-bar-item { border-right: none; border-bottom: 1px solid var(--border); }
          .gallery-grid { grid-template-columns: 1fr; }
          .workflow-steps { grid-template-columns: 1fr; }
          .footer-top { grid-template-columns: 1fr; }
          .studio-card { display: none; }
        }
      `}</style>

      <main>
        {/* ── HERO ── */}
        <section ref={heroRef} className="hero">
          <div className="hero-left">
            <div ref={heroTagRef} className="hero-tag">Patent-Pending Technology</div>
            <h1 ref={heroH1Ref} className="hero-h1">
              <span>Design Elevator</span>
              <span>Interiors</span>
              <span className="accent">Without Limits</span>
            </h1>
            <p ref={heroSubRef} className="hero-sub">
              The all-in-one platform for visualization, customization, budgeting, and
              collaboration — built exclusively for the elevator industry.
            </p>
            <div ref={heroBtnsRef} className="hero-btns">
              <a
                href="#"
                className="btn-primary"
                onMouseEnter={(e) => animBtn(e.currentTarget, true)}
                onMouseLeave={(e) => animBtn(e.currentTarget, false)}
              >
                Start Designing
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </a>
              <a href="#" className="btn-ghost">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M11.5 10l7 4-7 4V10z" fill="currentColor"/>
                </svg>
                Watch Video
              </a>
            </div>

            <div className="trusted-section">
              <div className="trusted-label">Trusted by Industry Leaders</div>
              <div ref={brandsRef} className="trusted-logos">
                {BRANDS.map((b) => <span key={b}>{b}</span>)}
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div ref={heroImgRef} className="hero-img-wrap">
              <img src={HERO_IMG} alt="Luxury elevator interior" />
            </div>

            <div ref={studioCardRef} className="studio-card">
              <div className="studio-card-title">
                Design Studio <span>—</span>
              </div>

              <div className="config-label">Configurations</div>
              <div className="config-icons">
                {["▩","▧","▤","▥"].map((ic, i) => (
                  <div key={i} className={`config-icon ${i===0?"active":""}`}>{ic}</div>
                ))}
              </div>

              <div className="config-label">Wall Panels</div>
              <div className="color-swatches">
                {WALL_COLORS.map((c, i) => (
                  <div
                    key={i}
                    className={`swatch ${activeWall === i ? "active" : ""}`}
                    style={{ background: c, border: c === "#fff" ? "1px solid #ddd" : undefined }}
                    onClick={() => setActiveWall(i)}
                  />
                ))}
              </div>

              <div className="config-label">Handrails</div>
              <div className="handrail-swatches">
                {HANDRAIL_COLORS.map((c, i) => (
                  <div
                    key={i}
                    className={`handrail-swatch ${activeHandrail === i ? "active" : ""}`}
                    style={{ background: c }}
                    onClick={() => setActiveHandrail(i)}
                  />
                ))}
              </div>

              <div className="config-label">Ceilings</div>
              <div className="config-icons">
                {["✦","◈","⬡","❖"].map((ic, i) => (
                  <div key={i} className={`config-icon ${i===0?"active":""}`}>{ic}</div>
                ))}
              </div>

              <button className="btn-view-render">
                View Rendering
                <span>⚙</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── FEATURES BAR ── */}
        <section className="features-bar">
          <div className="features-bar-inner">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="feature-bar-item"
                ref={(el) => (featureCardsRef.current[i] = el)}
              >
                <span className="feature-bar-icon">{f.icon}</span>
                <div className="feature-bar-title">{f.title}</div>
                <div className="feature-bar-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WORKFLOW ── */}
        <section className="workflow-section">
          <div className="workflow-left">
            <div className="workflow-left-tag">The MEDS Platform</div>
            <h2>One Seamless Workflow From Concept to Completion</h2>
            <p>
              MEDS connects every part of the process so you can design, approve,
              price, and deliver exceptional elevator interiors faster.
            </p>
            <a href="#" className="btn-outline">
              Explore the Platform
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </a>
          </div>

          <div className="workflow-steps">
            {WORKFLOW.map((step, i) => (
              <div key={step.n} className="workflow-step" ref={(el) => (workflowRef.current[i] = el)}>
                <div className="step-number">{step.n}</div>
                <div className="step-icon-wrap">{step.icon}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GALLERY + SUPPLIERS ── */}
        <section className="gallery-section">
          <div className="gallery-inner">
            <div className="gallery-left">
              <div className="gallery-header">
                <div className="gallery-tag">Design Without Limits</div>
                <a href="#" className="gallery-explore">
                  Explore Gallery
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
              <div className="gallery-grid">
                {GALLERY.map((item, i) => (
                  <div key={item.label} className="gallery-item" ref={(el) => (galleryRef.current[i] = el)}>
                    <img src={item.src} alt={item.label} />
                    <div className="gallery-item-btn">+</div>
                    <div className="gallery-item-info">
                      <div className="gallery-item-label">{item.label}</div>
                      <div className="gallery-item-sub">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="suppliers-right" ref={suppRef}>
              <div className="suppliers-tag">A Connected Ecosystem</div>
              <h2 className="suppliers-h2">Suppliers &amp; Fabricators</h2>
              <p className="suppliers-desc">
                Access a nationwide network of premium material suppliers and trusted
                fabricators.
              </p>
              <ul className="suppliers-list">
                <li>Submit &amp; manage leads</li>
                <li>Exclusive material libraries</li>
                <li>Regional &amp; specialty suppliers</li>
                <li>Stronger projects, together</li>
              </ul>
              <a
                href="#"
                className="btn-primary"
                style={{ alignSelf: "flex-start" }}
                onMouseEnter={(e) => animBtn(e.currentTarget, true)}
                onMouseLeave={(e) => animBtn(e.currentTarget, false)}
              >
                Join Our Network
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </a>
              <div className="network-map" style={{marginTop:"1.5rem"}}>
                {/* Decorative network dots */}
                {[
                  {left:"10%",top:"30%"},{left:"25%",top:"55%"},{left:"40%",top:"25%"},
                  {left:"55%",top:"60%"},{left:"70%",top:"35%"},{left:"85%",top:"50%"},
                  {left:"50%",top:"80%"},{left:"30%",top:"75%"}
                ].map((pos,i) => (
                  <div key={i} className="map-dot" style={pos}/>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section ref={toolsSectionRef} className="tools-section">
          <div className="tools-devices">
            <div className="device-tablet">
              <img src={TABLET_IMG} alt="MEDS on tablet" />
            </div>
            <div className="device-phone">
              <img src={HERO_IMG} alt="MEDS on phone" />
            </div>
          </div>

          <div className="tools-right">
            <div className="tools-tag">Technology That Elevates</div>
            <h2 className="tools-h2">Powerful Tools. Beautiful Results.</h2>
            <div className="tools-grid">
              {TOOLS.map((t) => (
                <div key={t.label} className="tool-item">
                  <div className="tool-icon-wrap">{t.icon}</div>
                  <div className="tool-label">{t.label}</div>
                </div>
              ))}
            </div>
            <p className="tools-desc">
              MEDS leverages advanced visualization, automation, and industry intelligence
              to help you design with confidence and deliver with precision.
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-top">
              <div className="footer-brand">
                <svg width="34" height="34" viewBox="0 0 42 42" fill="none" style={{display:"block",marginBottom:"0.6rem"}}>
                  <rect x="1" y="1" width="40" height="40" rx="2" stroke="#B08C4C" strokeWidth="1.5"/>
                  <rect x="7" y="8" width="10" height="26" rx="1" fill="#B08C4C" fillOpacity="0.15" stroke="#B08C4C" strokeWidth="1.2"/>
                  <rect x="16" y="8" width="10" height="26" rx="1" fill="#B08C4C" fillOpacity="0.08" stroke="#B08C4C" strokeWidth="0.8"/>
                  <rect x="25" y="8" width="10" height="26" rx="1" fill="#B08C4C" fillOpacity="0.15" stroke="#B08C4C" strokeWidth="1.2"/>
                  <line x1="7" y1="21" x2="35" y2="21" stroke="#B08C4C" strokeWidth="1"/>
                </svg>
                <span className="logo-meds">MEDS</span>
                <span className="logo-sub">My Elevator Design Studio</span>
              </div>

              {[
                { title: "Platform", links: ["Overview","Features","Integrations"] },
                { title: "Design Studio", links: ["How It Works","Material Library","3D Visualization"] },
                { title: "Suppliers", links: ["Become a Supplier","Find Suppliers","For Fabricators"] },
                { title: "Company", links: ["About Us","Careers","Contact"] },
              ].map((col) => (
                <div key={col.title}>
                  <div className="footer-col-title">{col.title}</div>
                  <ul className="footer-links">
                    {col.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
                  </ul>
                </div>
              ))}

              <div>
                <div className="footer-col-title">Stay Connected</div>
                <div className="footer-social">
                  <a href="#" className="social-icon">in</a>
                  <a href="#" className="social-icon">ig</a>
                  <a href="#" className="social-icon">yt</a>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© 2026 Elevator Design Studio (MEDS). All rights reserved.</span>
              <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}