import React, { useState, useEffect, useRef } from "react";
import "./CLITerminal.css";

export default function CLITerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      command: "",
      output:
        "🖥️ Welcome to Dhruv Interactive CLI 🚀\nType 'help' to see available commands.\n",
    },
  ]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const inputRef = useRef(null);

  const commands = {
    help: [
      "Available commands:",
      "clear - Clear the terminal",
      "socials - Show social media links",
      "welcome - Show intro message",
      "projects - Show list of projects",
      "email - Open your email client",
      "history - Show entered commands",
      "about - About me",
      `echo "<text>"" - Print back text`,
      "education - Show education",
      "experience - Show experience",
    ],
   welcome: `
 ____   _   _   ___ _  _   _   _     _
|  _ \\ | | | ||  _  \\ | | | | \\ \\   / /
| | | || |_| || |_| / | | | |  \\ \\ / / 
| |_| || | | ||  _ <  | |_| |   \\ V /  
|____/ |_| |_|| | \\_\\  \\___/     \\_/     

👋 Welcome to Dhruv Patel's CLI Portfolio!

user: dhruv@portfolio
os: Linux x86_64
shell: bash 5.2.21
editor: VS Code
languages: JavaScript, Python, Java
frameworks: React, Node.js, Express, AWS

Type 'help' to see available commands.
`,
    socials:
      "🌐 [GitHub](https://github.com/YOURUSERNAME) | 🔗 [LinkedIn](https://linkedin.com/in/YOURUSERNAME)",
    projects: "📂 Projects are listed in the portfolio section above.",
    email: "📧 Opening email client...",
    about: `
💡 I’m Dhruv Patel — a developer who turns ideas into scalable, reliable, and maintainable systems.  
I believe in clean code, clear communication, and continuous improvement.  
For me, software isn’t just code — it’s about simplifying work, solving problems, and creating lasting experiences. 🚀
`,
    education: "🎓 BSc in Computer Science - Dalhousie University",
    experience: "💼 1+ years in Full-Stack Development, Cloud, and AI.",
  };

  const handleCommand = (cmd) => {
    let output = "";
    const args = cmd.split(" ");
    const baseCmd = args[0].toLowerCase();

    switch (baseCmd) {
      case "help":
        output = commands.help.join("\n");
        break;
      case "clear":
        setHistory([]);
        return;
      case "socials":
        output = commands.socials;
        break;
      case "welcome":
        output = commands.welcome;
        break;
      case "projects":
        output = commands.projects;
        break;
      case "email":
        output = commands.email;
        window.open("mailto:yourmail@example.com");
        break;
      case "history":
        output = history.map((h) => h.command).join("\n");
        break;
      case "about":
        output = commands.about;
        break;
      case "echo":
        output = args.slice(1).join(" ") || "Usage: echo <text>";
        break;
      case "education":
        output = commands.education;
        break;
      case "experience":
        output = commands.experience;
        break;
      default:
        output = `❌ Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (input.trim() !== "") {
        handleCommand(input.trim());
        setCommandIndex(-1);
        setInput("");
      }
    } else if (e.key === "ArrowUp") {
      if (history.length > 0 && commandIndex < history.length - 1) {
        const newIndex = commandIndex + 1;
        setCommandIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].command);
      }
    } else if (e.key === "ArrowDown") {
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].command);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const suggestions = Object.keys(commands).filter((c) =>
        c.startsWith(input.toLowerCase())
      );
      if (suggestions.length === 1) {
        setInput(suggestions[0]);
      }
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="cli-page" onClick={() => inputRef.current.focus()}>
      <div className="cli-header">💻 Dhruv's Interactive CLI</div>

      <div className="cli-container">
        <div className="cli-output">
          {history.map((item, idx) => (
            <div key={idx}>
              {item.command && (
                <div className="cli-command">
                  ➜ <span className="cli-path">dhruv/</span> {item.command}
                </div>
              )}
              <pre className="cli-response">{item.output}</pre>
            </div>
          ))}
        </div>

        {/* Input line */}
        <div className="cli-input-line">
          <span className="cli-prompt">➜</span>
          <span className="cli-path">dhruv/</span>
          <input
            ref={inputRef}
            className="cli-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}
