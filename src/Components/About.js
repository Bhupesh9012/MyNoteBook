import React from 'react';

const About = () => {
  return (
    <div className="about-section" style={{
      maxWidth: "700px",
      margin: "40px auto",
      padding: "32px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
    }}>
      <h1 style={{ color: "#2d6cdf", fontWeight: 700, marginBottom: "16px" }}>About MyNoteBook</h1>
      <p style={{ fontSize: "1.15rem", color: "#444", marginBottom: "24px" }}>
        <strong>MyNoteBook</strong> is your personal, secure, and cloud-powered note-taking companion. Whether you’re a student, professional, or creative thinker, MyNoteBook helps you organize your thoughts, ideas, and to-dos with ease and style.
      </p>
      <ul style={{ fontSize: "1.05rem", color: "#333", marginBottom: "24px", paddingLeft: "20px" }}>
        <li>📝 <strong>Easy Note Management:</strong> Create, edit, and delete notes instantly.</li>
        <li>🔒 <strong>Secure & Private:</strong> Your notes are protected and accessible only to you.</li>
        <li>☁️ <strong>Cloud Sync:</strong> Access your notes from anywhere, on any device.</li>
        <li>🎨 <strong>Clean & Modern UI:</strong> Enjoy a distraction-free, beautiful interface.</li>
        <li>🔍 <strong>Search & Organize:</strong> Quickly find notes and categorize them with tags.</li>
      </ul>
      <div style={{
        background: "#f5faff",
        borderRadius: "8px",
        padding: "18px 20px",
        marginBottom: "16px",
        borderLeft: "4px solid #2d6cdf"
      }}>
        <h3 style={{ margin: 0, color: "#2d6cdf" }}>Why Choose MyNoteBook?</h3>
        <p style={{ margin: "8px 0 0 0", color: "#444" }}>
          MyNoteBook is built for speed, simplicity, and security. Your ideas matter—capture them effortlessly and never lose track of what’s important.
        </p>
      </div>
      <p style={{ color: "#666", fontSize: "1rem", textAlign: "center", marginTop: "32px" }}>
        🚀 <strong>Start organizing your life with MyNoteBook today!</strong>
      </p>
    </div>
  );
};

export default About;