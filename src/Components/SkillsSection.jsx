import {
  Code,
  Cpu,
  Database,
  Cloud,
  ServerCog,
  Box,
  Activity,
  CheckSquare,
  Zap,
  ClipboardList,
  Monitor,
} from "lucide-react";
import { motion } from "framer-motion";

const skillsData = [
  {
    role: "Full-Stack Development",
    skills: [
      { name: "JavaScript (ES6+)", icon: <Code size={18} /> },
      { name: "ReactJS", icon: <Code size={18} /> },
      { name: "Angular", icon: <Code size={18} /> },
      { name: "Node.js & Express.js", icon: <ServerCog size={18} /> },
      { name: "Django", icon: <ServerCog size={18} /> },
      { name: "Java & Spring Boot", icon: <Code size={18} /> },
      { name: "MongoDB / PostgreSQL", icon: <Database size={18} /> },
      { name: "WebSockets, Redis", icon: <Activity size={18} /> },
      { name: "TypeScript & GraphQL", icon: <Code size={18} /> },
    ],
  },
  {
    role: "Cloud & DevOps",
    skills: [
      { name: "AWS (Lambda, ECS, S3, SageMaker)", icon: <Cloud size={18} /> },
      { name: "Azure ML & Cognitive Services", icon: <Cloud size={18} /> },
      { name: "Google Cloud Platform (GCP)", icon: <Cloud size={18} /> },
      { name: "Terraform & CloudFormation", icon: <ServerCog size={18} /> },
      { name: "Docker & Kubernetes", icon: <Box size={18} /> },
      { name: "Prometheus & Grafana", icon: <Activity size={18} /> },
      { name: "CI/CD (GitHub Actions, Jenkins)", icon: <Zap size={18} /> },
    ],
  },
  {
    role: "Machine Learning & NLP",
    skills: [
      { name: "PyTorch & TensorFlow", icon: <Cpu size={18} /> },
      { name: "Scikit-learn & BERT", icon: <Cpu size={18} /> },
      { name: "Hugging Face / OpenAI API", icon: <Cpu size={18} /> },
      { name: "Azure ML", icon: <Cloud size={18} /> },
      { name: "Privacy ML (FL, DP)", icon: <Cpu size={18} /> },
    ],
  },
  {
    role: "Testing & Automation",
    skills: [
      { name: "Unit & Integration Testing", icon: <CheckSquare size={18} /> },
      { name: "Automation Pipelines", icon: <Zap size={18} /> },
      { name: "Monitoring & Logging", icon: <Activity size={18} /> },
    ],
  },
  {
    role: "Tools & Platforms",
    skills: [
      { name: "Git / GitHub Actions", icon: <ClipboardList size={18} /> },
      { name: "JIRA & Agile Tools", icon: <ClipboardList size={18} /> },
      { name: "Excel, Word, Visio", icon: <ClipboardList size={18} /> },
    ],
  },
  {
    role: "Operating Systems",
    skills: [
      { name: "Linux (Ubuntu, Amazon Linux)", icon: <Monitor size={18} /> },
      { name: "Windows", icon: <Monitor size={18} /> },
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }, 
  },
};

const motionVariants = [
  { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 14 } } },
  { hidden: { opacity: 0, x: 50 },  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 14 } } },
  { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 12 } } },
  { hidden: { opacity: 0, y: 40 },  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 12 } } },
  { hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 10 } } },
];

export default function SkillsSection() {
  return (
    <div className="container py-5">
      <h2
        className="fw-bold mb-5 text-center"
        style={{ color: "#182848", letterSpacing: "1px" }}
      >
        My <span style={{ color: "#0396ff" }}>Skills</span>
      </h2>

      <div className="row g-4">
        {skillsData.map((group, idx) => (
          <div key={idx} className="col-md-6 col-lg-4 d-flex">
            <motion.div
              className="card shadow-sm border-0 rounded-4 p-3 flex-fill"
              style={{
                backgroundColor: "#ffffff",
                cursor: "pointer",
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              variants={container}
            >
              <div className="card-body">
                {/* Role Title */}
                <h5
                  className="fw-bold mb-3 pb-2"
                  style={{
                    color: "#2179e0",
                    fontSize: "1.15rem",
                    borderBottom: "2px solid #eef6ff",
                  }}
                >
                  {group.role}
                </h5>

                {/* Animated Badges with Fly-in */}
                <motion.div
                  className="d-flex flex-wrap gap-2"
                  variants={container}
                >
                  {group.skills.map((skill, i) => {
                    const variant = motionVariants[i % motionVariants.length];
                    return (
                      <motion.span
                        key={i}
                        className="badge d-flex align-items-center"
                        style={{
                          backgroundColor: "#eef6ff",
                          color: "#182848",
                          fontWeight: "500",
                          fontSize: "0.85rem",
                          padding: "8px 12px",
                          borderRadius: "12px",
                          gap: "6px",
                          cursor: "default",
                        }}
                        variants={variant}
                        whileHover={{
                          scale: 1.15,
                          backgroundColor: "#0396ff",
                          color: "#fff",
                          boxShadow: "0 4px 14px rgba(3,150,255,0.4)",
                          transition: { type: "spring", stiffness: 300, damping: 10 },
                        }}
                      >
                        <span style={{ color: "inherit" }}>{skill.icon}</span>
                        {skill.name}
                      </motion.span>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
