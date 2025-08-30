import React from "react";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CertificationSection.css";

// Import your certification images
import ai900 from "../assets/ai900.png"
import ai102 from "../assets/ai102.png";
import dp100 from "../assets/dp100.png";

export default function CertificationSection() {
  const certifications = [
    {
      title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
      image: ai900,
      link: "https://learn.microsoft.com/en-us/certifications/exams/ai-900/", 
    },
    {
      title: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
      image: ai102,
      link: "https://learn.microsoft.com/en-us/certifications/exams/ai-102/",
    },
    {
      title: "Microsoft Certified: Azure Data Scientist Associate (DP-100)",
      image: dp100,
      link: "https://learn.microsoft.com/en-us/certifications/exams/dp-100/",
    },
  ];

  return (
    <section id="certifications" className="py-5" style={{ background: "#ffffff" }}>
      <div className="container text-center mb-5">
        <h2 className="fw-bold" style={{ fontSize: "2.2rem", color: "#182848" }}>
          🎓 Certifications
        </h2>
        <p className="text-muted">
          Professional certifications showcasing my expertise in AI, Cloud, and Data Science
        </p>
      </div>

      <div className="container">
        <div className="row g-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              className="col-md-4 d-flex"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              viewport={{ once: false, amount: 0.2 }}
            >
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
                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden text-center">
                  <div
                    style={{
                      height: "200px",
                      background: "#f5faff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      style={{ maxHeight: "180px", maxWidth: "100%", objectFit: "contain" }}
                    />
                  </div>

                  <Card.Body>
                    <h6 className="fw-bold mb-3" style={{ color: "#182848" }}>
                      {cert.title}
                    </h6>
                    {cert.link && (
                      <Button
                        variant="outline-dark"
                        href={cert.link}
                        target="_blank"
                        className="d-flex align-items-center justify-content-center mx-auto"
                      >
                        View Credential
                      </Button>
                    )}
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
