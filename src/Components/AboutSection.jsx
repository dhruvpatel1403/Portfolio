import React from "react";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const highlights = [
  {
    title: "Builder Mindset",
    text: "I focus on designing systems that are reliable, scalable, and simple to maintain.",
  },
  {
    title: "Clean Code",
    text: "My development philosophy is rooted in clarity, modularity, and long-term maintainability.",
  },
  {
    title: "Continuous Growth",
    text: "Every project is a chance to learn, improve workflows, and adopt better practices.",
  },
];

const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 },
  },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
};
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 70, damping: 18 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

export default function AboutSection() {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 px-3"
      style={{ minHeight: "100vh", background: "#f5f7fa" }}
    >
      <Card
        className="shadow-lg border-0 rounded-4 p-4 w-100"
        style={{
          maxWidth: "1000px",
          background: "linear-gradient(135deg, #ffffff 85%, #f0f7ff 100%)",
        }}
      >
        <Card.Body>
          {/* Title */}
          <motion.h2
            className="fw-bold mb-4 text-center fs-2 fs-md-1"
            style={{ letterSpacing: "1px", color: "#182848" }}
            variants={fadeDown}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            About <span style={{ color: "#0396ff" }}>Me</span>
          </motion.h2>

          {/* Summary */}
          <motion.p
            className="lead mb-4 text-center px-2 fs-6 fs-md-5"
            style={{ lineHeight: "1.8", color: "#34435e" }}
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            Every line of code I write begins with a{" "}
            <span className="fw-semibold text-primary">bigger vision</span>.  
            My work lives at the intersection of <strong>software</strong> and{" "}
            <strong>systems</strong> — building products that not only work but also scale and endure.
          </motion.p>

          <motion.p
            className="mb-4 text-center px-2 fs-6 fs-md-5"
            style={{ lineHeight: "1.8", color: "#42506a" }}
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            From shaping deployment pipelines to delivering end-to-end features,
            I thrive on turning ideas into practical solutions. My approach is
            rooted in <span className="text-primary fw-semibold">clean code</span>,{" "}
            <span className="text-primary fw-semibold">clear communication</span>, and{" "}
            <span className="text-primary fw-semibold">continuous improvement</span>.
          </motion.p>

          {/* Highlights */}
          <div className="row g-4 mt-3 text-center">
            {highlights.map((box, idx) => (
              <motion.div
                className="col-12 col-sm-6 col-lg-4"
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: false }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.06,
                    backgroundColor: "#eef6ff",
                    boxShadow: "0 6px 18px rgba(3, 150, 255, 0.25)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="p-3 rounded-3 h-100"
                  style={{
                    transition: "all 0.35s ease",
                    cursor: "pointer",
                    willChange: "transform, background-color, box-shadow",
                  }}
                >
                  <h6
                    className="fw-bold mb-2"
                    style={{ color: "#2179e0", letterSpacing: "0.5px" }}
                  >
                    {box.title}
                  </h6>
                  <p
                    className="mb-0"
                    style={{ fontSize: "0.95rem", color: "#42506a" }}
                  >
                    {box.text}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Closing Statement */}
          <motion.p
            className="mt-4 text-center fw-semibold px-2 fs-6 fs-md-5"
            style={{
              lineHeight: "1.75",
              color: "#42506a",
            }}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            I see software as more than code — it’s a way to{" "}
            <span className="text-primary">simplify work</span>,{" "}
            <span className="text-primary">solve problems</span>, and{" "}
            <span className="text-primary">create experiences</span> that last.
          </motion.p>
        </Card.Body>
      </Card>
    </div>
  );
}
