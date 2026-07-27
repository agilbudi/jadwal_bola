import { useState, useMemo } from "react";
import JadwalWC from "./jadwal.jsx";
import JadwalAFF from "./jadwal_aff.jsx";

export default function App() {
  const [competition, setCompetition] = useState("wc"); // "wc" | "aff"
  const icAFF = "https://upload.wikimedia.org/wikipedia/id/thumb/2/2c/Logo_Piala_Asean_2026.svg/250px-Logo_Piala_Asean_2026.svg.png";
  const icWC = "https://upload.wikimedia.org/wikipedia/id/thumb/1/17/2026_FIFA_World_Cup_emblem.svg/250px-2026_FIFA_World_Cup_emblem.svg.png";

  // Ganti kompetisi & reset semua filter
  const switchCompetition = (comp) => {
    setCompetition(comp);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", margin: 0, minHeight: "100vh", background: "#0a0e1a", color: "#e2e8f0" }}>
      {/* === COMPETITION SWITCH === */}
      <div style={{position: "sticky", top: 0, zIndex: 10, background: "#083d08", borderBottom: "2px solid #1e293b", padding: "10px 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 8 }}>
          <button onClick={() => switchCompetition("wc")}
            style={{
              flex: 1, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
              border: competition === "wc" ? "2px solid #fde163" : "1px solid #136113",
              background: competition === "wc" ? "linear-gradient(135deg,#fda06355,#fde16333)" : "#052c05",
              color: competition === "wc" ? "#fde163" : "#64748b",
              fontSize: 13, fontWeight: 800, textAlign: "center"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={icWC} alt="Piala Dunia 2026" style={{ width: 17, height: 20, marginRight: 8 }} />
                 Piala Dunia 2026
              </div>
            </button>
            <button onClick={() => switchCompetition("aff")}
              style={{
                flex: 1, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
              border: competition === "aff" ? "2px solid #ef4444" : "1px solid #136113",
              background: competition === "aff" ? "linear-gradient(135deg,#ef444433,#ef444455)" : "#052c05",
              color: competition === "aff" ? "#fca5a5" : "#64748b",
              fontSize: 13, fontWeight: 800, textAlign: "center"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={icAFF} alt="Piala AFF" style={{ width: 17, height: 20, marginRight: 8 }} />
                 Piala AFF 2026
              </div>
          </button>
        </div>
      </div>
      {/* Competition Content */}
      {competition === "wc" && (
        <JadwalWC />
      )}
      {competition === "aff" && (
        <JadwalAFF />
      )}
    </div>
  );
}
