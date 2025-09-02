import { useState, useEffect, useRef } from "react";
import { 
  FaBars, 
  FaTimes, 
  FaGithub, 
  FaLinkedin, 
  FaInstagram,
  FaCertificate   // ✅ added
} from "react-icons/fa";

export default function SidebarSection({ menuItems, active, setActive, progress }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sidebarRef = useRef(null);

  const socialLinks = {
    github: "https://github.com/dhruvpatel1403",
    linkedin: "https://www.linkedin.com/in/dhruv-patel-7997aa24a",
    instagram: "https://instagram.com/dhruvpatel_1403",
  };

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (mobile) {
        setOpen(false); // closed by default on mobile
      } else {
        setOpen(false); // collapsed by default on desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside (mobile + desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Mobile: original logic
      if (isMobile && open && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }

      // Desktop: shrink if expanded and clicked outside
      if (!isMobile && open && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, isMobile]);

  return (
    <>
      {/* Toggle button fixed at top-left (visible only on mobile) */}
      {isMobile && (
        <button
          onClick={() => setOpen(!open)}
          style={{
            position: "fixed",
            top: "12px",
            left: "12px",
            zIndex: 1100,
            width: "40px",
            height: "40px",
            border: "none",
            borderRadius: "50%",
            background: "#e6f0ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {open ? <FaTimes size={20} color="#182848" /> : <FaBars size={20} color="#182848" />}
        </button>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="d-flex flex-column position-fixed"
        style={{
          width: isMobile ? (open ? "240px" : "0px") : open ? "240px" : "72px",
          transition: "width 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          top: 0,
          left: 0,
          bottom: 0,
          background: "linear-gradient(180deg, #ffffff, #f9fafc)",
          borderRight: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "2px 0 18px rgba(0,0,0,0.1)",
          zIndex: 1000,
          overflow: "hidden",
        }}
      >
        {/* Header (desktop only) */}
        {!isMobile && (
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            {open && (
              <h1 className="h5 mb-0 fw-bold" style={{ color: "#182848" }}>
                Portfolio
              </h1>
            )}
            <button
              onClick={() => setOpen(!open)}
              onMouseEnter={() => {
                if (!isMobile && !open) setOpen(true); // auto expand on hover
              }}
              style={{
                width: "40px",
                height: "40px",
                border: "none",
                borderRadius: "50%",
                background: "#e6f0ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {open ? <FaTimes size={20} color="#182848" /> : <FaBars size={20} color="#182848" />}
            </button>
          </div>
        )}

        {/* Menu */}
        <ul className="list-unstyled flex-grow-1 mt-3 px-2">
          {menuItems.map((item, i) => {
            const isActive = active === item.name;
            return (
              <li
                key={i}
                onClick={() => {
                  document.getElementById(item.name).scrollIntoView({ behavior: "smooth" });
                  setActive(item.name);
                  if (isMobile) setOpen(false);
                }}
                className="d-flex align-items-center mb-2 p-2 rounded-3 fw-medium"
                style={{
                  cursor: "pointer",
                  background: isActive
                    ? "linear-gradient(90deg, #f0f4ff, #d9e7ff)"
                    : "transparent",
                  color: isActive ? "#174ea6" : "#42506a",
                  fontWeight: isActive ? "600" : "400",
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                  boxShadow: isActive ? "0 4px 14px rgba(23,78,166,0.25)" : "none",
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#eef4ff";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                <span style={{ width: "24px", display: "flex", justifyContent: "center" }}>
                  {item.icon}
                </span>
                <span
                  className="ms-2"
                  style={{
                    opacity: open ? 1 : 0,
                    transition: "opacity 0.35s ease, color 0.35s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Progress bar (desktop only) */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "6px",
              height: "100%",
              background: "rgba(0,0,0,0.05)",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${progress}%`,
                background: "linear-gradient(180deg, #174ea6, #5a9bff)",
                transition: "height 0.2s linear",
                borderRadius: "4px",
              }}
            />
          </div>
        )}

        {/* Social icons */}
        <div className="d-flex justify-content-center gap-3 p-3 border-top">
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
            <FaGithub size={18} color="#182848" />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={18} color="#182848" />
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram size={18} color="#182848" />
          </a>
        </div>
      </div>
    </>
  );
}
