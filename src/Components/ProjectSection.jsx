import React from "react";
import { motion } from "framer-motion";
import { Card, Button } from "react-bootstrap";
import { Github } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProjectSection.css"; 

export default function ProjectSection() {
  const projects = [
    {
      title: "HelloDoc | Telehealth Platform",
      github: "https://github.com/dhruvpatel1403/HelloDoc.git",
      bullets: [
        "A full-stack telehealth platform built on the MERN stack that enables patients to book appointments, join secure video consultations, manage digital health records, and communicate through encrypted chat."

      ],
    },
    {
      title: "AI-Powered Resume Builder",
      github: "https://github.com/dhruvpatel1403/ATS-Friendly-resume-builder.git",
      bullets: [
      "A cloud-based SaaS tool that helps users generate ATS-friendly resumes using GPT-4 and LangChain. Includes customizable templates and real-time resume scoring for job applications."
      ],
    },
    {
      title: "DALScooter | Serverless Multi-Cloud Platform",
      github: "https://github.com/jay24prajapati/S25-5410-DALScooter-Project_Team_09.git",
      bullets: [
        "A serverless e-bike rental application built with AWS and GCP services. Features include role-based access for customers and franchise operators, secure multi-factor authentication, booking/reservations, chatbot navigation, and real-time customer–franchise messaging."

      ],
    },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

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
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(3, 150, 255, 0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                className="w-100"
              >
                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  {/* ✅ Image Placeholder */}
                  <div
                    className="project-img-placeholder d-flex align-items-center justify-content-center"
                    style={{
                      height: "180px",
                      background: "linear-gradient(135deg, #e0f2ff, #f5faff)",
                      color: "#2179e0",
                      fontWeight: "bold",
                    }}
                  >
                    [ Project Image ]
                  </div>

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
