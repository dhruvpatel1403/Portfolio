import React from "react";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion"; 
import "bootstrap/dist/css/bootstrap.min.css";

const timelineData = [
  {
    period: "2020 – 2024",
    title: "Bachelor of Engineering - BE",
    institution: "LDRP Institute of Technology & Research, Gandhinagar, India",
    type: "Education",
  },
  {
    period: "Sep 2023 – Dec 2023",
    title: "Cloud & ML Developer Intern",
    institution: "Edunet Foundation",
    type: "Experience",
    highlights: [
      "Built and deployed ML pipelines on AWS SageMaker and Azure ML automating document processing.",
      "Secured microservices on ECS Fargate and Azure Container Apps; created reusable IaC with Terraform & CloudFormation.",
      "Worked in CI/CD Agile team using GitHub Actions, CodePipeline, and Docker; monitored workflows with CloudWatch, Azure Monitor, Prometheus/Grafana.",
    ],
  },
  {
    period: "Jan 2024 – Dec 2024",
    title: "Full-Stack Developer (Contract)",
    institution: "Logistic Solutions Pvt Ltd",
    type: "Experience",
    highlights: [
      "Developed scalable web applications and RESTful APIs using React.js, Node.js, and MongoDB.",
      "Collaborated in Agile teams troubleshooting production issues and ensuring system reliability.",
      "Implemented CI/CD pipelines with GitHub Actions and Docker for automated deployments.",
    ],
  },
  {
    period: "Jan 2025 – Present",
    title: "Master in Applied Computer Science",
    institution: "Dalhousie University, Canada",
    type: "Education",
  },
];

const leftVariant = {
  hidden: { opacity: 0, x: -120, scale: 0.9 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

const rightVariant = {
  hidden: { opacity: 0, x: 120, scale: 0.9 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

export default function Resume() {
  return (
    <div
      className="container py-5"
      style={{
        backgroundColor: "#f9fbfd",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        className="fw-bold text-center mb-5"
        style={{ color: "#182848", letterSpacing: "1.2px", fontWeight: "700" }}
      >
        Education & Experience
      </h2>

      <Card
        className="shadow-lg border-0 rounded-4 p-4"
        style={{ maxWidth: "780px", margin: "0 auto" }}
      >
        <Card.Body>
          <div
            className="position-relative"
            style={{
              borderLeft: "3px solid #0396ff",
              paddingLeft: "40px",
            }}
          >
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className="mb-5 position-relative p-3 rounded-3"
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                variants={index % 2 === 0 ? leftVariant : rightVariant} 
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#eef6ff";
                  e.currentTarget.style.boxShadow =
                    "0 6px 18px rgba(3, 150, 255, 0.2)";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {/* Dot */}
                <span
                  className="position-absolute translate-middle rounded-circle border"
                  style={{
                    width: "16px",
                    height: "16px",
                    left: "-27px",
                    top: "28px",
                    backgroundColor: "#2179e0",
                    borderColor: "#ffffff",
                    borderWidth: "3px",
                    boxShadow: "0 0 6px rgba(33, 121, 224, 0.6)",
                  }}
                ></span>

                {/* Period */}
                <time
                  className="d-block mb-1"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#677489",
                  }}
                >
                  {item.period}
                </time>

                {/* Title + Institution */}
                <h5
                  className={`mb-1 ${
                    item.type === "Education" ? "text-primary" : "text-success"
                  }`}
                  style={{ fontWeight: "700", fontSize: "1.25rem" }}
                >
                  {item.title}
                </h5>
                <p
                  className="mb-2"
                  style={{
                    color: "#42506a",
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  {item.institution}
                </p>

                {/* Only Experience has highlights */}
                {item.highlights && (
                  <ul
                    style={{
                      paddingLeft: "20px",
                      marginTop: "0",
                      color: "#34435e",
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.highlights.map((point, i) => (
                      <li
                        key={i}
                        style={{ marginBottom: "6px", lineHeight: "1.4" }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
