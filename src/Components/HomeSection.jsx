import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, MessageCircle, Terminal } from "lucide-react"; 
import { Link } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeSection.css";

export default function HomeSection() {
  const highlights = [
    { value: "1+", label: "Years of Experience" },
    { value: "12+", label: "Technologies Mastered" },
    { value: "3", label: "Core Domains: Full-Stack, Cloud, AI" },
  ];

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const introVariant = {
    hidden: { opacity: 0, x: -80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  };

  const statVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  const socialVariant = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, type: "spring", stiffness: 120 },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="d-flex justify-content-center align-items-center w-100 position-relative"
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
      }}
    >
      {/* ✅ Floating Projects Button (only visible in Home) */}
      {visible && (
        <motion.a
          href="#portfolio"
          className="project-float-btn"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="btn-text">Projects</span>
          <span className="btn-ring"></span>
          <span className="btn-dot"></span>
        </motion.a>
      )}

      <Card
        className="shadow-lg border-0 rounded-4 p-4 w-100"
        style={{
          maxWidth: "1000px",
          background: "linear-gradient(135deg, #ffffff 85%, #f0f7ff 100%)",
        }}
      >
        <Card.Body className="row g-4 align-items-center">
          {/* Left: Intro */}
          <motion.div
            className="col-md-6 text-center text-md-start"
            variants={introVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1
              className="fw-bold mb-2"
              style={{ fontSize: "2.6rem", color: "#182848" }}
            >
              Hi, I’m <span style={{ color: "#0396ff" }}>Dhruv Patel</span> 👋
            </h1>
            <p
              className="lead fw-semibold"
              style={{ color: "#34435e", fontSize: "1.15rem" }}
            >
              Full-Stack Developer | AI Enthusiast 🚀
            </p>
            <p
              className="mt-3"
              style={{ lineHeight: "1.8", color: "#42506a", fontSize: "1rem" }}
            >
              I turn <strong>ideas</strong> into <strong>scalable apps</strong>{" "}
              and <strong>cloud solutions</strong>. From building web platforms
              to automating workflows, I focus on clean code, reliable systems,
              and real-world impact.
            </p>
            <p className="text-muted mt-3 fw-semibold">
              Open to opportunities where I can{" "}
              <span className="text-primary">create web applications</span>,
              apply <span className="text-primary">AI-driven automation</span>,
              and design{" "}
              <span className="text-primary">cloud-native solutions</span>.
            </p>

            {/*  Highlighted CLI Button */}
            <motion.div
              className="mt-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/cli">
                <Button
                  className="cli-btn d-flex align-items-center gap-2 px-4 py-2"
                >
                  <Terminal size={20} /> 🚀 Interactive CLI Portfolio
                </Button>
              </Link>
            </motion.div>

            {/*  Social Buttons */}
            <motion.div
              className="d-flex gap-3 mt-4 justify-content-center justify-content-md-start"
              variants={socialVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
            >
              <Button
                variant="outline-primary"
                href="https://www.linkedin.com/in/dhruv-patel-7997aa24a"
                target="_blank"
                className="d-flex align-items-center gap-2"
              >
                <Linkedin size={18} /> LinkedIn
              </Button>
              <Button
                variant="outline-dark"
                href="https://github.com/dhruvpatel1403"
                target="_blank"
                className="d-flex align-items-center gap-2"
              >
                <Github size={18} /> GitHub
              </Button>
            </motion.div>

            <motion.div
              className="d-flex gap-3 mt-3 justify-content-center justify-content-md-start"
              variants={socialVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
            >
              <Button
                variant="outline-danger"
                href="https://instagram.com/dhruvpatel_1403"
                target="_blank"
                className="d-flex align-items-center gap-2"
              >
                <Instagram size={18} /> Instagram
              </Button>
              <Button
                variant="outline-secondary"
                href="https://discord.com/users/dhruv079442"
                target="_blank"
                className="d-flex align-items-center gap-2"
              >
                <MessageCircle size={18} /> Discord
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Stats with hover effect */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <div className="row g-4">
              {highlights.map((h, idx) => (
                <motion.div
                  className="col-12"
                  key={idx}
                  variants={statVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: "#eef6ff",
                      boxShadow: "0 8px 20px rgba(3, 150, 255, 0.25)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="p-4 rounded-4 text-center shadow-sm"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e6f0ff",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <h2 className="fw-bold mb-1" style={{ color: "#2179e0" }}>
                      {h.value}
                    </h2>
                    <p
                      className="mb-0"
                      style={{ fontSize: "1rem", color: "#42506a" }}
                    >
                      {h.label}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
