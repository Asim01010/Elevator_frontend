// src/pages/ProfileEdit.jsx - EDS Theme with GSAP (No Redux)
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Images, Upload, Shield, User, Mail, Phone, MapPin, Building, Briefcase, Lock, Key } from "lucide-react";

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
  return (
    <button
      ref={ref}
      onClick={() => {
        if (onClick) onClick();
        gsap.timeline()
          .to(ref.current, { scale: 0.96, duration: 0.1 })
          .to(ref.current, { scale: 1, duration: 0.2, ease: "elastic.out(1,0.5)" });
      }}
      onMouseEnter={() => gsap.to(ref.current, { backgroundColor: "#8B6942", scale: 1.02, duration: 0.25 })}
      onMouseLeave={() => gsap.to(ref.current, { backgroundColor: "#A17C50", scale: 1, duration: 0.25 })}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-white rounded-lg focus:outline-none disabled:opacity-50 transition-all ${small ? "px-4 py-2 text-[10px]" : "px-6 py-3 text-[11px]"}`}
      style={{ backgroundColor: "#A17C50", boxShadow: "0 6px 20px -4px rgba(161,124,80,0.4), inset 0 1px 0 rgba(255,255,255,0.2)" }}
    >
      {children}
    </button>
  );
}

// Input Component with GSAP focus effects
function EDSInput({ label, type = "text", value, onChange, placeholder, readOnly, icon: Icon }) {
  const inputRef = useRef(null);
  
  const handleFocus = (e) => {
    gsap.to(inputRef.current, { borderColor: "#A17C50", boxShadow: "0 0 0 3px rgba(161,124,80,0.1)", duration: 0.2 });
  };
  
  const handleBlur = (e) => {
    gsap.to(inputRef.current, { borderColor: "rgba(161,124,80,0.22)", boxShadow: "none", duration: 0.2 });
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label style={labelStyle}>{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(161,124,80,0.5)" }}>
            <Icon size={16} />
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          style={inputStyle}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 text-sm`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

// Select Component
function EDSSelect({ label, value, onChange, options, icon: Icon }) {
  const selectRef = useRef(null);
  
  const handleFocus = (e) => {
    gsap.to(selectRef.current, { borderColor: "#A17C50", boxShadow: "0 0 0 3px rgba(161,124,80,0.1)", duration: 0.2 });
  };
  
  const handleBlur = (e) => {
    gsap.to(selectRef.current, { borderColor: "rgba(161,124,80,0.22)", boxShadow: "none", duration: 0.2 });
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label style={labelStyle}>{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10" style={{ color: "rgba(161,124,80,0.5)" }}>
            <Icon size={16} />
          </div>
        )}
        <select
          ref={selectRef}
          value={value}
          onChange={onChange}
          style={{ ...inputStyle, appearance: "none" }}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-10 py-2.5 text-sm cursor-pointer bg-white/60`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(161,124,80,0.5)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 8 4 4 4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Mock User Data
const MOCK_USER = {
  _id: "user_123",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  company: "Premium Elevators Inc.",
  jobTitle: "Senior Designer",
  country: "United States",
  city: "New York",
  zipCode: "10001",
  phone: "+1 (555) 123-4567",
  profileImage: "/Howorks.jpg",
};

const ProfileEdit = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState("contact");
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(MOCK_USER.profileImage);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    email: MOCK_USER.email,
    firstName: MOCK_USER.firstName,
    lastName: MOCK_USER.lastName,
    company: MOCK_USER.company,
    jobTitle: MOCK_USER.jobTitle,
    country: MOCK_USER.country,
    city: MOCK_USER.city,
    zipCode: MOCK_USER.zipCode,
    phone: MOCK_USER.phone,
  });

  const [passwordData, setPasswordData] = useState({
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
    ).fromTo(formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
  }, []);

  // Tab switch animation
  const handleTabChange = (tab) => {
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
    setActiveTab(tab);
  };

  const handleImageAreaClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      gsap.fromTo(".profile-image",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(0.6)" }
      );
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
      gsap.fromTo(".profile-image",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(0.6)" }
      );
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordData.previousPassword.trim() || !passwordData.newPassword.trim()) {
      gsap.to(".password-error", { opacity: 1, duration: 0.3, repeat: 2, yoyo: true });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      gsap.to(".password-error", { opacity: 1, duration: 0.3, repeat: 2, yoyo: true });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPasswordData({ previousPassword: "", newPassword: "", confirmPassword: "" });
      gsap.to(".success-message", { opacity: 1, duration: 0.3, yoyo: true, repeat: 1 });
    }, 500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      gsap.to(".success-message", { opacity: 1, duration: 0.3, yoyo: true, repeat: 1 });
    }, 500);
  };

  const countryOptions = [
    { value: "", label: "Select Country" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "United States", label: "United States" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Canada", label: "Canada" },
    { value: "Australia", label: "Australia" },
    { value: "Germany", label: "Germany" },
    { value: "France", label: "France" },
    { value: "UAE", label: "United Arab Emirates" },
  ];

  const jobTitleOptions = [
    { value: "", label: "Select Job Title" },
    { value: "Architect", label: "Architect" },
    { value: "Designer", label: "Designer" },
    { value: "Engineer", label: "Engineer" },
    { value: "Project Manager", label: "Project Manager" },
    { value: "Sales Director", label: "Sales Director" },
    { value: "Consultant", label: "Consultant" },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-x-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-20"
      style={{ backgroundColor: "#F7F4ED", fontFamily: "'DM Sans', sans-serif", opacity: 0 }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        input::placeholder, textarea::placeholder { color: rgba(120,106,88,0.4); }
        .success-message { opacity: 0; }
        .password-error { opacity: 0; }
      `}</style>

      {/* Background glows */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(161,124,80,0.08) 0%, transparent 70%)", zIndex: 0 }} />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(161,124,80,0.06) 0%, transparent 70%)", zIndex: 0 }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div ref={headerRef}>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-2 mb-6"
            style={{ color: "rgba(161,124,80,0.55)" }}>
            <Link to="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <span style={{ color: "rgba(161,124,80,0.3)" }}>›</span>
            <Link to="/profile" className="hover:opacity-70 transition-opacity">My Profile</Link>
            <span style={{ color: "rgba(161,124,80,0.3)" }}>›</span>
            <span style={{ color: "#A17C50" }}>Edit Profile</span>
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: "#A17C50" }} />
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(24px, 4vw, 36px)", color: "#2C2822", lineHeight: 1.2 }}>
                Edit Profile
                <span className="font-light ml-3" style={{ color: "#A17C50" }}>| Manage Your Account</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b" style={{ borderBottom: "1px solid rgba(161,124,80,0.15)" }}>
          <button
            onClick={() => handleTabChange("contact")}
            className={`px-6 py-3 text-[11px] font-bold uppercase tracking-wider transition-all relative ${
              activeTab === "contact"
                ? "text-[#A17C50]"
                : "text-gray-400 hover:text-[#A17C50]/70"
            }`}
          >
            <div className="flex items-center gap-2">
              <User size={14} />
              Contact Info
            </div>
            {activeTab === "contact" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A17C50]" />
            )}
          </button>
          <button
            onClick={() => handleTabChange("account")}
            className={`px-6 py-3 text-[11px] font-bold uppercase tracking-wider transition-all relative ${
              activeTab === "account"
                ? "text-[#A17C50]"
                : "text-gray-400 hover:text-[#A17C50]/70"
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield size={14} />
              Account Security
            </div>
            {activeTab === "account" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A17C50]" />
            )}
          </button>
        </div>

        {/* Content */}
        <div ref={formRef}>
          {activeTab === "contact" ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Profile Image */}
              <div>
                <div style={glassCard}>
                  <div className="p-5 border-b" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A17C50" }} />
                      <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>Profile Image</h2>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="mb-5">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="profile-image w-full h-64 object-cover rounded-lg shadow-md"
                        style={{ border: "1px solid rgba(161,124,80,0.15)" }}
                      />
                    </div>

                    <div
                      className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all hover:border-[#A17C50] hover:bg-white/30"
                      style={{ borderColor: "rgba(161,124,80,0.25)", background: "rgba(255,255,255,0.3)" }}
                      onClick={handleImageAreaClick}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <Upload size={32} style={{ color: "rgba(161,124,80,0.5)" }} />
                      <p className="text-[11px] mt-3" style={{ color: "rgba(161,124,80,0.6)" }}>
                        Drag & drop or click to upload
                      </p>
                      <p className="text-[9px] mt-1" style={{ color: "rgba(161,124,80,0.4)" }}>
                        PNG, JPG up to 5MB
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div>
                <form onSubmit={handleContactSubmit}>
                  <div style={glassCard}>
                    <div className="p-5 border-b" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A17C50" }} />
                        <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>Personal Information</h2>
                      </div>
                    </div>
                    
                    <div className="p-5 space-y-4">
                      <EDSInput
                        label="Email Address"
                        value={formData.email}
                        readOnly
                        icon={Mail}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <EDSInput
                          label="First Name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          icon={User}
                        />
                        <EDSInput
                          label="Last Name"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          icon={User}
                        />
                      </div>

                      <EDSInput
                        label="Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        icon={Building}
                      />

                      <EDSSelect
                        label="Job Title"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        options={jobTitleOptions}
                        icon={Briefcase}
                      />

                      <EDSSelect
                        label="Country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        options={countryOptions}
                        icon={MapPin}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <EDSInput
                          label="City"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                        <EDSInput
                          label="Zip/Postal Code"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        />
                      </div>

                      <EDSInput
                        label="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        icon={Phone}
                      />

                      <div className="pt-4">
                        <GoldBtn disabled={isLoading}>
                          {isLoading ? "Saving..." : "Save Changes"}
                        </GoldBtn>
                      </div>
                      
                      <div className="success-message text-center mt-3">
                        <p className="text-[10px]" style={{ color: "#5A8A3C" }}>✓ Profile updated successfully!</p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handlePasswordSubmit}>
                <div style={glassCard}>
                  <div className="p-5 border-b" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#A17C50" }} />
                      <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>Change Password</h2>
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-5">
                    <p className="text-[11px] leading-relaxed" style={{ color: "#7A705F" }}>
                      Please enter your previous password and your updated password to change your password.
                      For security reasons, use a strong password with at least 8 characters.
                    </p>

                    <EDSInput
                      label="Previous Password"
                      type="password"
                      value={passwordData.previousPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, previousPassword: e.target.value })}
                      icon={Key}
                    />

                    <EDSInput
                      label="New Password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      icon={Lock}
                    />

                    <EDSInput
                      label="Confirm New Password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      icon={Lock}
                    />

                    <div className="password-error text-center">
                      <p className="text-[10px]" style={{ color: "rgba(192,57,43,0.7)" }}>⚠️ Please check your passwords</p>
                    </div>

                    <GoldBtn disabled={isLoading}>
                      {isLoading ? "Updating..." : "Update Password"}
                    </GoldBtn>

                    <div className="success-message text-center mt-3">
                      <p className="text-[10px]" style={{ color: "#5A8A3C" }}>✓ Password updated successfully!</p>
                    </div>
                  </div>
                </div>
              </form>

              {/* Security Tips */}
              <div className="mt-6 p-4 rounded-lg" style={{ background: "rgba(161,124,80,0.05)", border: "1px solid rgba(161,124,80,0.1)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={14} style={{ color: "#A17C50" }} />
                  <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#A17C50" }}>Security Tips</p>
                </div>
                <ul className="text-[10px] space-y-1" style={{ color: "rgba(90,79,64,0.7)" }}>
                  <li>• Use at least 8 characters</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Add numbers and special characters</li>
                  <li>• Don't share your password with anyone</li>
                </ul>
              </div>
            </div>
          )}
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
    </div>
  );
};

export default ProfileEdit;