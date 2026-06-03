// Register.jsx - EDS Theme (Tailwind + GSAP only)
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);

  const containerRef = useRef(null);
  const ruleRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const btnRef = useRef(null);
  const arrowRef = useRef(null);
  const badgeRef = useRef(null);
  const breadcrumbRef = useRef(null);
  const rulesRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(containerRef.current,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
    .fromTo(breadcrumbRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(badgeRef.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
      "-=0.2"
    )
    .fromTo(ruleRef.current,
      { height: 0, opacity: 0 },
      { height: 44, opacity: 1, duration: 0.45, ease: "power3.out" },
      "-=0.15"
    )
    .fromTo(headingRef.current,
      { opacity: 0, x: -14 },
      { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(rulesRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(formRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.15"
    );

    gsap.to(btnRef.current, {
      y: -3,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1.4,
    });
  }, []);

  const handleInput = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      const pw = e.target.name === "password" ? e.target.value : updated.password;
      const cpw = e.target.name === "confirmPassword" ? e.target.value : updated.confirmPassword;
      if (cpw.length > 0) setPasswordMatch(pw === cpw);
      else setPasswordMatch(null);
    }
  };

  const handleBtnEnter = () => {
    gsap.to(btnRef.current, { scale: 1.03, backgroundColor: "#8B6942", duration: 0.3 });
    gsap.to(arrowRef.current, { x: 6, duration: 0.25 });
  };

  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { scale: 1, backgroundColor: "#A17C50", duration: 0.3 });
    gsap.to(arrowRef.current, { x: 0, duration: 0.25 });
  };

  const handleBtnClick = () => {
    gsap.timeline()
      .to(btnRef.current, { scale: 0.96, duration: 0.1 })
      .to(btnRef.current, { scale: 1.03, duration: 0.2, ease: "elastic.out(1, 0.5)" })
      .to(btnRef.current, { scale: 1, duration: 0.15 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;
    setLoading(true);
    // Hook up your own submit logic here
    setTimeout(() => setLoading(false), 2000);
  };

  const inputFocus = (e) => {
    e.target.style.borderColor = "#A17C50";
    e.target.style.background = "rgba(255,255,255,0.92)";
    e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1), 0 4px 16px rgba(161,124,80,0.08)";
  };

  const inputBlur = (e) => {
    e.target.style.borderColor = "rgba(161,124,80,0.22)";
    e.target.style.background = "rgba(255,255,255,0.65)";
    e.target.style.boxShadow = "none";
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.65)",
    border: "1px solid rgba(161,124,80,0.22)",
    color: "#2C2822",
    backdropFilter: "blur(6px)",
    fontFamily: "'DM Sans', sans-serif",
  };

  const passwordRules = [
    { icon: "8+", text: "Minimum 8 characters" },
    { icon: "123", text: "At least 1 number" },
    { icon: "#!@", text: "At least 1 special character" },
    { icon: "ABC", text: "At least 1 uppercase letter" },
    { icon: "abc", text: "At least 1 lowercase letter" },
  ];

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ backgroundColor: "#F7F4ED", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;800&display=swap');
        input::placeholder { color: rgba(120,106,88,0.45); }
        input:focus { outline: none; }
        .brand-item { transition: all 0.2s; }
        .brand-item:hover { color: #A17C50 !important; opacity: 1 !important; filter: grayscale(0) !important; }
        @keyframes pulseEds { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.65)} }
      `}</style>

      {/* Glow overlays */}
      <div className="absolute top-0 left-0 w-72 h-72 md:w-[420px] md:h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(161,124,80,0.13) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-56 h-56 md:w-80 md:h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(161,124,80,0.08) 0%, transparent 70%)" }} />
      <div className="absolute top-1/3 right-1/4 w-44 h-44 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)" }} />

      <div
        ref={containerRef}
        className="relative z-10 pt-24 pb-20 px-6 sm:px-12 md:px-20 lg:px-40 xl:px-56"
        style={{ opacity: 0 }}
      >

        {/* Breadcrumb */}
        <p
          ref={breadcrumbRef}
          className="text-[10px] font-bold uppercase tracking-[0.18em] mb-7 flex items-center gap-2"
          style={{ color: "rgba(161,124,80,0.55)", opacity: 0 }}
        >
          <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <span style={{ color: "rgba(161,124,80,0.3)" }}>›</span>
          <span>User Account</span>
          <span style={{ color: "rgba(161,124,80,0.3)" }}>›</span>
          <span style={{ color: "#A17C50" }}>Register</span>
        </p>

        {/* Patent badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 text-[9px] font-bold uppercase tracking-[0.15em]"
          style={{
            background: "rgba(161,124,80,0.08)",
            border: "1px solid rgba(161,124,80,0.2)",
            color: "#A17C50",
            opacity: 0,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A17C50", animation: "pulseEds 2s infinite" }} />
          Patent-Pending Technology
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="flex items-center mb-5"
          style={{ opacity: 0 }}
        >
          <span
            ref={ruleRef}
            className="inline-block w-[3px] rounded-sm mr-4 flex-shrink-0"
            style={{ height: 0, backgroundColor: "#A17C50" }}
          />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: "clamp(26px, 4vw, 44px)",
              color: "#2C2822",
              lineHeight: 1.2,
            }}
          >
            Register for an Account
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-sm leading-relaxed mb-5 max-w-lg" style={{ color: "#7A705F" }}>
          Create your Elevator Design Studio account to start designing. Your password must meet the following requirements:
        </p>

        {/* Password rules */}
        <div
          ref={rulesRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mb-10"
          style={{ opacity: 0 }}
        >
          {passwordRules.map((rule, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-sm px-3 py-2.5"
              style={{
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(161,124,80,0.14)",
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                className="text-[9px] font-black tracking-tight rounded px-1.5 py-0.5 flex-shrink-0"
                style={{ background: "rgba(161,124,80,0.1)", color: "#A17C50" }}
              >
                {rule.icon}
              </span>
              <span className="text-[11px] font-medium" style={{ color: "#7A705F" }}>
                {rule.text}
              </span>
            </div>
          ))}
        </div>

        {/* Already have account */}
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium mb-10 transition-opacity hover:opacity-60"
          style={{ color: "#A17C50" }}
        >
          Already have an account? Log in
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 max-w-lg"
          style={{ opacity: 0 }}
        >

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5"
              style={{ color: "rgba(161,124,80,0.75)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#A17C50" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              placeholder="Enter your email address"
              required
              className="w-full rounded-sm px-4 py-3.5 text-sm transition-all duration-200"
              style={inputStyle}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5"
              style={{ color: "rgba(161,124,80,0.75)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#A17C50" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              placeholder="Create a strong password"
              required
              className="w-full rounded-sm px-4 py-3.5 text-sm transition-all duration-200"
              style={inputStyle}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5"
              style={{ color: "rgba(161,124,80,0.75)" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#A17C50" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Confirm Password
              {passwordMatch === true && (
                <span className="ml-1 text-[10px] font-bold" style={{ color: "#5A8A3C" }}>✓ Match</span>
              )}
              {passwordMatch === false && (
                <span className="ml-1 text-[10px] font-bold" style={{ color: "#C0392B" }}>✗ No match</span>
              )}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInput}
              placeholder="Re-enter your password"
              required
              className="w-full rounded-sm px-4 py-3.5 text-sm transition-all duration-200"
              style={{
                ...inputStyle,
                borderColor: passwordMatch === false
                  ? "rgba(192,57,43,0.5)"
                  : passwordMatch === true
                  ? "rgba(90,138,60,0.5)"
                  : "rgba(161,124,80,0.22)",
              }}
              onFocus={inputFocus}
              onBlur={(e) => {
                e.target.style.background = "rgba(255,255,255,0.65)";
                e.target.style.boxShadow = "none";
                e.target.style.borderColor = passwordMatch === false
                  ? "rgba(192,57,43,0.5)"
                  : passwordMatch === true
                  ? "rgba(90,138,60,0.5)"
                  : "rgba(161,124,80,0.22)";
              }}
            />
          </div>

          {/* Submit */}
          <button
            ref={btnRef}
            type="submit"
            disabled={loading || passwordMatch === false}
            onClick={handleBtnClick}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
            className="w-full flex items-center justify-center gap-3 rounded-sm py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "#A17C50",
              boxShadow: "0 8px 24px -6px rgba(161,124,80,0.4), inset 0 1px 0 rgba(255,255,255,0.18)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {loading ? "Creating Account…" : "Create Account"}
            {!loading && (
              <svg
                ref={arrowRef}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
          </button>

        </form>

        {/* Divider + Trusted brands */}
        <div
          className="mt-10 pt-7 max-w-lg"
          style={{ borderTop: "1px solid rgba(161,124,80,0.15)" }}
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-4"
            style={{ color: "rgba(161,124,80,0.45)" }}>
            Trusted By Industry Leaders
          </p>
          <div className="flex items-center gap-5" style={{ opacity: 0.5, filter: "grayscale(1)" }}>
            {["OTIS", "KONE", "TKE"].map((brand) => (
              <span key={brand} className="brand-item font-black text-sm tracking-tighter cursor-pointer" style={{ color: "#5A4F40" }}>
                {brand}
              </span>
            ))}
            <span className="brand-item font-light text-xs tracking-wide cursor-pointer" style={{ color: "#5A4F40" }}>
              Schindler
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}