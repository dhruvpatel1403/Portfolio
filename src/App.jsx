import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaUser,
  FaFileAlt,
  FaStar,
  FaBriefcase,
  FaPhone,
} from "react-icons/fa";

import AboutSection from "./Components/AboutSection";
import SkillsSection from "./Components/SkillsSection";
import ContactSection from "./Components/ContactSection";
import ResumeSection from "./Components/ResumeSection";
import SidebarSection from "./Components/SidebarSection";
import HomeSection from "./Components/HomeSection";
import ProjectSection from "./Components/ProjectSection";
import CLITerminal from "./Components/CLITerminal";
import GamePage from "./Components/GamePage";

export default function App() {
  const [active, setActive] = useState("Home");
  const [progress, setProgress] = useState(0);
  const sectionsRef = useRef([]);

  const menuItems = [
    { name: "Home", icon: <FaHome size={18} /> },
    { name: "About", icon: <FaUser size={18} /> },
    { name: "Resume", icon: <FaFileAlt size={18} /> },
    { name: "Skills", icon: <FaStar size={18} /> },
    { name: "Projects", icon: <FaBriefcase size={18} /> },
    { name: "Contact", icon: <FaPhone size={18} /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        setProgress((currentScroll / totalHeight) * 100);
      },
      {
        threshold: [0.3, 0.6],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    sectionsRef.current.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <Routes>
        {/* ✅ Portfolio main page */}
        <Route
          path="/"
          element={
            <div
              className="d-flex bg-light"
              style={{ height: "100vh", overflow: "hidden" }}
            >
              {/* Sidebar */}
              <SidebarSection
                menuItems={menuItems}
                active={active}
                setActive={setActive}
                progress={progress}
              />

              {/* Content */}
              <div
                className="flex-grow-1"
                style={{
                  width: "100vw",
                  height: "100vh",
                  overflowY: "scroll",
                  scrollSnapType: "y mandatory",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {menuItems.map((item, i) => (
                  <section
                    key={i}
                    id={item.name}
                    ref={(el) => (sectionsRef.current[i] = el)}
                    style={{
                      minHeight: "100vh",
                      scrollSnapAlign: "start",
                      padding: "60px 20px",
                    }}
                    className={
                      item.name === "About" ||
                      item.name === "Skills" ||
                      item.name === "Contact" ||
                      item.name === "Resume"
                        ? "d-flex flex-column justify-content-start align-items-start text-start"
                        : "d-flex flex-column justify-content-center align-items-center text-center"
                    }
                  >
                    {item.name === "Home" ? (
                      <HomeSection />
                    ) : item.name === "About" ? (
                      <AboutSection />
                    ) : item.name === "Skills" ? (
                      <SkillsSection />
                    ) : item.name === "Contact" ? (
                      <ContactSection />
                    ) : item.name === "Resume" ? (
                      <ResumeSection />
                    ) : item.name === "Projects" ? (
                      <ProjectSection />
                    ) : (
                      <>
                        <h1 className="display-5 fw-bold">{item.name} Section</h1>
                        <p className="text-secondary">
                          This is the {item.name} content
                        </p>
                      </>
                    )}
                  </section>
                ))}
              </div>
            </div>
          }
        />

        {/* ✅ CLI Page */}
        <Route path="/cli" element={<CLITerminal />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}
