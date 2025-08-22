import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProjectSection.css";

// Import HelloDoc images
import img1 from "../assets/hellodoc/hellodoc1.png";
import img2 from "../assets/hellodoc/hellodoc2.png";
import img3 from "../assets/hellodoc/hellodoc3.png";
import img4 from "../assets/hellodoc/hellodoc4.png";
import img5 from "../assets/hellodoc/hellodoc5.png";
import img6 from "../assets/hellodoc/hellodoc6.png";
import img7 from "../assets/hellodoc/hellodoc7.png";

// Import DALScooter images
import ds1 from "../assets/dalscooter/ds1.png";
import ds2 from "../assets/dalscooter/ds2.png";
import ds3 from "../assets/dalscooter/ds3.png";
import ds4 from "../assets/dalscooter/ds4.png";
import ds5 from "../assets/dalscooter/ds5.png";
import ds6 from "../assets/dalscooter/ds6.png";
import ds7 from "../assets/dalscooter/ds7.png";

// Import Resume Builder images
import r1 from "../assets/resume/r1.png";
import r2 from "../assets/resume/r2.png";
import r3 from "../assets/resume/r3.png";
import r4 from "../assets/resume/r4.png";

export default function ProjectSection() {
  const hellodocImages = [img1, img2, img3, img4, img5, img6, img7];
  const dalscooterImages = [ds1, ds2, ds3, ds4, ds5, ds6, ds7];
  const resumeImages = [r1, r2, r3, r4];

  // independent indexes
  const [helloIndex, setHelloIndex] = useState(0);
  const [dalIndex, setDalIndex] = useState(0);
  const [resumeIndex, setResumeIndex] = useState(0);

  // HelloDoc rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setHelloIndex((prev) => (prev + 1) % hellodocImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // DALScooter rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setDalIndex((prev) => (prev + 1) % dalscooterImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Resume Builder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setResumeIndex((prev) => (prev + 1) % resumeImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      title: "HelloDoc | Telehealth Platform",
      github: "https://github.com/dhruvpatel1403/HelloDoc.git",
      bullets: [
        "A full-stack telehealth platform built on the MERN stack that enables patients to book appointments, join secure video consultations, manage digital health records, and communicate through encrypted chat.",
      ],
      images: hellodocImages,
      index: helloIndex,
    },
    {
      title: "AI-Powered Resume Builder",
      github: "https://github.com/dhruvpatel1403/ATS-Friendly-resume-builder.git",
      bullets: [
        "A cloud-based SaaS tool that helps users generate ATS-friendly resumes using GPT-4 and LangChain. Includes customizable templates and real-time resume scoring for job applications.",
      ],
      images: resumeImages,
      index: resumeIndex,
    },
    {
      title: "DALScooter | Serverless Multi-Cloud Platform",
      github: "https://github.com/jay24prajapati/S25-5410-DALScooter-Project_Team_09.git",
      bullets: [
        "A serverless e-bike rental application built with AWS and GCP services. Features include role-based access for customers and franchise operators, secure multi-factor authentication, booking/reservations, chatbot navigation, and real-time customer–franchise messaging.",
      ],
      images: dalscooterImages,
      index: dalIndex,
    },
  ];

  return (
    <section id="portfolio" className="py-5" style={{ background: "#f8faff" }}>
      <div className="container text-center mb-5">
        <h2 className="fw-bold" style={{ fontSize: "2.2rem", color: "#182848" }}>
          🚀 Projects
        </h2>
        <p className="text-muted">
          A selection of my professional, academic, and freelance projects
        </p>
      </div>

      <div className="container">
        <div className="row g-4">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 d-flex"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              {/* Hover wrapper */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 30px rgba(3,150,255,0.25)",
                  y: -6,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
                className="w-100"
              >
                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  {/* ✅ Image Rotator */}
                  {proj.images ? (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        height: "200px",
                        background: "#000",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <AnimatePresence>
                        <motion.img
                          key={proj.index}
                          src={proj.images[proj.index]}
                          alt={`${proj.title} Screenshot`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div
                      className="project-img-placeholder d-flex align-items-center justify-content-center"
                      style={{
                        height: "200px",
                        background: "linear-gradient(135deg, #e0f2ff, #f5faff)",
                        color: "#2179e0",
                        fontWeight: "bold",
                      }}
                    >
                      [ Project Image ]
                    </div>
                  )}

                  <Card.Body className="d-flex flex-column">
                    <h5 className="fw-bold mb-3" style={{ color: "#182848" }}>
                      {proj.title}
                    </h5>
                    <ul
                      className="text-start"
                      style={{ fontSize: "0.95rem", color: "#42506a" }}
                    >
                      {proj.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>

                    <div className="mt-auto d-flex justify-content-center">
                      <Button
                        variant="outline-dark"
                        href={proj.github}
                        target="_blank"
                        className="d-flex align-items-center gap-2"
                      >
                        <Github size={18} /> GitHub
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
