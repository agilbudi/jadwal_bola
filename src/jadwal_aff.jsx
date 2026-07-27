import { useState, useMemo } from "react";

const matches = [
  // PEKAN 1: 24–25 Jul (Matchday 1)
  { id: 1, date: "Jumat, 24 Jul", wib: "19:00", grup: "A", home: 4, away: 3, venue: 2, stage: 1, week: 1 },
  { id: 2, date: "Jumat, 24 Jul", wib: "20:30", grup: "A", home: 5, away: 2, venue: 3, stage: 1, week: 1 },
  { id: 3, date: "Sabtu, 25 Jul", wib: "17:00", grup: "B", home: 9, away: 7, venue: 6, stage: 1, week: 1 },
  { id: 4, date: "Sabtu, 25 Jul", wib: "20:00", grup: "B", home: 10, away: 6, venue: 8, stage: 1, week: 1 },
  // PEKAN 2: 27–28 Jul (Matchday 2)
  { id: 5, date: "Senin, 27 Jul", wib: "18:00", grup: "A", home: 3, away: 5, venue: 4, stage: 1, week: 2 },
  { id: 6, date: "Senin, 27 Jul", wib: "20:30", grup: "A", home: 1, away: 4, venue: 1, stage: 1, week: 2 },
  { id: 7, date: "Selasa, 28 Jul", wib: "17:00", grup: "B", home: 8, away: 9, venue: 10, stage: 1, week: 2 },
  { id: 8, date: "Selasa, 28 Jul", wib: "20:00", grup: "B", home: 7, away: 10, venue: 7, stage: 1, week: 2 },
  // PEKAN 3: 31 Jul–1 Ags (Matchday 3)
  { id: 9, date: "Jumat, 31 Jul", wib: "17:00", grup: "A", home: 5, away: 1, venue: 3, stage: 1, week: 3 },
  { id: 10, date: "Jumat, 31 Jul", wib: "20:00", grup: "A", home: 2, away: 3, venue: 5, stage: 1, week: 3 },
  { id: 11, date: "Sabtu, 1 Ags", wib: "17:00", grup: "B", home: 10, away: 8, venue: 8, stage: 1, week: 3 },
  { id: 12, date: "Sabtu, 1 Ags", wib: "20:00", grup: "B", home: 6, away: 7, venue: 9, stage: 1, week: 3 },
  // PEKAN 4: 3–4 Ags (Matchday 4)
  { id: 13, date: "Senin, 3 Ags", wib: "17:30", grup: "A", home: 4, away: 5, venue: 2, stage: 1, week: 4 },
  { id: 14, date: "Senin, 3 Ags", wib: "20:30", grup: "A", home: 1, away: 2, venue: 1, stage: 1, week: 4 },
  { id: 15, date: "Selasa, 4 Ags", wib: "17:00", grup: "B", home: 9, away: 10, venue: 6, stage: 1, week: 4 },
  { id: 16, date: "Selasa, 4 Ags", wib: "20:00", grup: "B", home: 8, away: 6, venue: 10, stage: 1, week: 4 },
  // PEKAN 5: 7–8 Ags (Matchday 5)
  { id: 17, date: "Jumat, 7 Ags", wib: "20:00", grup: "A", home: 3, away: 1, venue: 4, stage: 1, week: 5 },
  { id: 18, date: "Jumat, 7 Ags", wib: "20:00", grup: "A", home: 2, away: 4, venue: 5, stage: 1, week: 5 },
  { id: 19, date: "Sabtu, 8 Ags", wib: "20:00", grup: "B", home: 7, away: 8, venue: 7, stage: 1, week: 5 },
  { id: 20, date: "Sabtu, 8 Ags", wib: "20:00", grup: "B", home: 6, away: 9, venue: 9, stage: 1, week: 5 },
  // PEKAN 6: 15–19 Ags (Semifinal, kandang-tandang)
  { id: 21, date: "15–19 Ags", wib: "TBD", grup: "-", home: "Juara A", away: "Runner-up B", venue: "TBD", stage: 2, week: 6, note: "Leg 1" },
  { id: 22, date: "15–19 Ags", wib: "TBD", grup: "-", home: "Runner-up B", away: "Juara A", venue: "TBD", stage: 2, week: 6, note: "Leg 2" },
  { id: 23, date: "15–19 Ags", wib: "TBD", grup: "-", home: "Juara B", away: "Runner-up A", venue: "TBD", stage: 2, week: 6, note: "Leg 1" },
  { id: 24, date: "15–19 Ags", wib: "TBD", grup: "-", home: "Runner-up A", away: "Juara B", venue: "TBD", stage: 2, week: 6, note: "Leg 2" },
  // PEKAN 7: Final (22 & 26 Ags, kandang-tandang)
  { id: 25, date: "Sabtu, 22 Ags", wib: "TBD", grup: "-", home: "Pemenang SF1", away: "Pemenang SF2", venue: "TBD", stage: 3, week: 7, note: "Final Leg 1" },
  { id: 26, date: "Rabu, 26 Ags", wib: "TBD", grup: "-", home: "Pemenang SF2", away: "Pemenang SF1", venue: "TBD", stage: 3, week: 7, note: "Final Leg 2" },
];

const venues = [
  { id: 1, name: "Stadion Pakansari, Bogor" },
  { id: 2, name: "Stadion Morodok Techo, Phnom Penh" },
  { id: 3, name: "Stadion Chonburi, Chonburi" },
  { id: 4, name: "Stadion Jalan Besar, Kallang" },
  { id: 5, name: "Stadion My Dinh, Hanoi" },
  { id: 6, name: "Stadion Thuwunna, Yangon" },
  { id: 7, name: "Stadion Kuala Lumpur, Kuala Lumpur" },
  { id: 8, name: "Stadion New Laos National, Vientiane" },
  { id: 9, name: "Stadion Rajamangala, Bangkok" },
  { id: 10, name: "Stadion New Clark City, Capas" },
];

const stages = [
  { id: 0, name: "Semua" },
  { id: 1, name: "Fase Grup" },
  { id: 2, name: "Semifinal" },
  { id: 3, name: "Final 🏆" },
];

const groups = ["Semua", "A", "B"];

var countries = [
  { id: 1, name: "Indonesia" },
  { id: 2, name: "Vietnam" },
  { id: 3, name: "Singapura" },
  { id: 4, name: "Kamboja" },
  { id: 5, name: "Timor Leste" },
  { id: 6, name: "Thailand" },
  { id: 7, name: "Malaysia" },
  { id: 8, name: "Filipina" },
  { id: 9, name: "Myanmar" },
  { id: 10, name: "Laos" },
];

const weekLabels = {
  0: "Semua Pekan",
  1: "Pekan 1 · 24–25 Jul",
  2: "Pekan 2 · 27–28 Jul",
  3: "Pekan 3 · 31 Jul–1 Ags",
  4: "Pekan 4 · 3–4 Ags",
  5: "Pekan 5 · 7–8 Ags",
  6: "Pekan 6 · 15–19 Ags (Semifinal)",
  7: "Pekan 7 · 22 & 26 Ags (Final)",
};

const weekColors = {
  1: "#3b82f6",
  2: "#10b981",
  3: "#f59e0b",
  4: "#ef4444",
  5: "#8b5cf6",
  6: "#ec4899",
  7: "#fbbf24",
};

const stageColors = {
  "Fase Grup": { left: "#334155" },
  "Semifinal": { left: "#ef4444" },
  "Final 🏆": { left: "#fbbf24" },
};

export default function App() {
  const [weekFilter, setWeekFilter] = useState(0);
  const [stageFilter, setStageFilter] = useState("Semua");
  const [groupFilter, setGroupFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [competition, setCompetition] = useState("wc"); // "wc" | "aff"
  const icAFF = "https://upload.wikimedia.org/wikipedia/id/thumb/2/2c/Logo_Piala_Asean_2026.svg/250px-Logo_Piala_Asean_2026.svg.png";

  // Helper function to get country name by ID
  const getCountryName = (id) => {
    if (typeof id === "string") return id;
    const country = countries.find(c => c.id === id);
    return country ? country.name : String(id);
  };

  // Helper function to get stage name by ID
  const getStageName = (stageId) => {
    const stage = stages.find(s => s.id === stageId);
    return stage ? stage.name : String(stageId);
  };

  // Helper function to get venue name by ID
  const getVenueName = (id) => {
    if (typeof id === "string") return id;
    const venue = venues.find(v => v.id === id);
    return venue ? venue.name : String(id);
  };

  const filtered = useMemo(() => {
    return matches.filter(m => {
      const weekOk = weekFilter === 0 || m.week === weekFilter;
      const stageOk = stageFilter === "Semua" || getStageName(m.stage) === stageFilter;
      const groupOk = groupFilter === "Semua" || m.grup === groupFilter;
      const q = search.toLowerCase();
      const homeName = getCountryName(m.home);
      const awayName = getCountryName(m.away);
      const venueName = getVenueName(m.venue);
      const searchOk = !q || homeName.toLowerCase().includes(q) || awayName.toLowerCase().includes(q) || venueName.toLowerCase().includes(q) || m.date.toLowerCase().includes(q);
      return weekOk && stageOk && groupOk && searchOk;
    });
  }, [weekFilter, stageFilter, groupFilter, search]);

  const weekCount = (w) => matches.filter(m => m.week === w).length;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", margin: 0, minHeight: "100vh", background: "#0a0e1a", color: "#e2e8f0" }}>

      {/* HERO BANNER */}
      <div style={{ background: "linear-gradient(135deg,#7f1d1d,#991b1b,#7f1d1d)", borderBottom: "2px solid #ef4444", padding: "16px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 28 }}>
          <img src={icAFF} alt="Piala AFF" style={{ width: 50, height: 58, margin: "10px 0", verticalAlign: "middle" }} />
        </div>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#fca5a5", letterSpacing: 1 }}>PIALA AFF 2026 SEDANG BERLANGSUNG</div>
        <div style={{ fontSize: 13, color: "#fecaca", marginTop: 2 }}>Fase Grup: 24 Jul–8 Ags · Semifinal: 15–19 Ags · Final: 22 & 26 Ags 2026</div>
      </div>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 40%, #0d2244 100%)", borderBottom: "1px solid #1e3a6e", padding: "28px 20px 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 34 }}>⚽</span>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#60a5fa", textTransform: "uppercase" }}>ASEAN Championship</div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#f1f5f9", lineHeight: 1.1 }}>Piala AFF 2026</h1>
            </div>
          </div>
          <p style={{ margin: "0 0 2px", color: "#94a3b8", fontSize: 12 }}>
            26 pertandingan · 10 tim · 2 grup · Asia Tenggara
          </p>
          <p style={{ margin: 0, fontSize: 11, color: "#475569" }}>
            Semua waktu dalam <strong style={{ color: "#60a5fa" }}>WIB (UTC+7)</strong> · Grup A: Indonesia, Vietnam, Singapura, Kamboja, Timor Leste · Grup B: Thailand, Malaysia, Filipina, Myanmar, Laos
          </p>
        </div>
      </div>

      <div style={{background: `linear-gradient(90deg, ${weekColors[weekFilter]}22 0%, transparent 80%)`, borderBottom: `1px solid ${weekColors[weekFilter]}33`,position: "sticky", top: 58, zIndex: 9}}>
        {/* === WEEKLY TABS === */}
        <div style={{ background: "#070c18", borderBottom: "2px solid #0f172a", overflowX: "auto" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", padding: "0 12px" }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map(w => {
              const active = weekFilter === w;
              const col = weekColors[w] || "#3b82f6";
              return (
                <button key={w} onClick={() => setWeekFilter(w)}
                  style={{
                    flexShrink: 0, padding: "12px 14px", border: "none", cursor: "pointer",
                    background: "transparent", fontSize: 12, fontWeight: active ? 800 : 500,
                    color: active ? col : "#475569",
                    borderBottom: active ? `3px solid ${col}` : "3px solid transparent",
                    transition: "all 0.15s", lineHeight: 1.3, textAlign: "center"
                  }}>
                  {w === 0 ? (
                    <span>Semua<br /><span style={{ fontSize: 10, opacity: 0.7 }}>{matches.length} laga</span></span>
                  ) : (
                    <span>Pekan {w}<br /><span style={{ fontSize: 10, opacity: 0.7 }}>{weekCount(w)} laga</span></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active week banner */}
        {weekFilter !== 0 && (
          <div style={{ background: `linear-gradient(90deg, ${weekColors[weekFilter]}22 0%, transparent 100%)`, borderBottom: `1px solid ${weekColors[weekFilter]}33`, padding: "8px 20px" }}>
            <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: weekColors[weekFilter], display: "inline-block", flexShrink: 0 }}></span>
              <span style={{ fontSize: 13, fontWeight: 700, color: weekColors[weekFilter] }}>{weekLabels[weekFilter]}</span>
              <span style={{ fontSize: 12, color: "#475569" }}>— {filtered.length} pertandingan</span>
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{ background: "#0f1628", borderBottom: "1px solid #1e293b", padding: "12px 20px", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              placeholder="🔍  Cari tim, venue, tanggal..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "7px 12px", color: "#e2e8f0", fontSize: 13, width: "100%", boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {stages.map(s => (
                <button key={s.id} onClick={() => setStageFilter(s.name)}
                  style={{
                    padding: "3px 10px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600,
                    background: stageFilter === s.name ? "#3b82f6" : "#1e293b",
                    color: stageFilter === s.name ? "#fff" : "#94a3b8"
                  }}>
                  {s.name}
                </button>
              ))}
            </div>
            {(stageFilter === "Semua" || stageFilter === "Fase Grup") && (
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {groups.map(g => (
                  <button key={g} onClick={() => setGroupFilter(g)}
                    style={{
                      padding: "3px 9px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700,
                      background: groupFilter === g ? "#ef4444" : "#1e293b",
                      color: groupFilter === g ? "#fff" : "#64748b"
                    }}>
                    {g === "Semua" ? "Semua Grup" : `Grup ${g}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Table */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 12px 40px" }}>
        <p style={{ fontSize: 12, color: "#475569", marginBottom: 10 }}>{filtered.length} pertandingan ditampilkan</p>

        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #1e293b" }}>
          {/* Column header */}
          <div style={{ display: "grid", gridTemplateColumns: "38px 108px 66px 1fr 24px 1fr 180px", background: "#1e293b", padding: "9px 12px", fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <div>#</div><div>Tanggal</div><div>WIB</div><div style={{ textAlign: "right", paddingRight: 6 }}>Tuan Rumah</div><div></div><div>Tamu</div><div>Venue</div>
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: "32px", textAlign: "center", color: "#475569", fontSize: 14 }}>
              Tidak ada pertandingan yang sesuai filter.
            </div>
          )}

          {filtered.map((m, i) => {
            const stageName = getStageName(m.stage);
            const isSpecial = stageName !== "Fase Grup";
            const leftColor = stageColors[stageName]?.left || "#334155";
            const prevM = filtered[i - 1];
            const showStage = i === 0 || getStageName(prevM?.stage) !== stageName;
            const showWeek = weekFilter === 0 && (i === 0 || prevM?.week !== m.week);

            return (
              <div key={m.id}>
                {/* Weekly divider */}
                {showWeek && (
                  <div style={{ background: "#050a14", borderTop: i > 0 ? `3px solid ${weekColors[m.week]}44` : "none", padding: "10px 12px 4px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 20, background: `${weekColors[m.week]}22`, border: `1px solid ${weekColors[m.week]}55` }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: weekColors[m.week], display: "inline-block" }}></span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: weekColors[m.week], letterSpacing: "0.05em" }}>
                        PEKAN {m.week}
                      </span>
                    </span>
                    <span style={{ fontSize: 11, color: "#334155" }}>{weekLabels[m.week]?.split("·")[1]?.trim()}</span>
                  </div>
                )}

                {/* Stage sub-header */}
                {showStage && (
                  <div style={{ background: "#0c1424", padding: "6px 12px", borderTop: i > 0 && !showWeek ? "1px solid #1e293b" : "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 3, height: 14, borderRadius: 2, background: leftColor, display: "inline-block" }}></span>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: isSpecial ? leftColor : "#60a5fa" }}>
                      {stageName}
                    </span>
                  </div>
                )}

                {/* Match row */}
                <div style={{
                  display: "grid", gridTemplateColumns: "38px 108px 66px 1fr 24px 1fr 180px",
                  padding: "9px 12px", alignItems: "center",
                  background: i % 2 === 0 ? "#0d1526" : "#0a1020",
                  borderTop: "1px solid #0f172a",
                  borderLeft: `3px solid ${isSpecial ? leftColor : "transparent"}`,
                }}>
                  <div style={{ fontSize: 10, color: "#334155", fontWeight: 600 }}>{m.id}</div>
                  <div>
                    <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500, lineHeight: 1.2 }}>{m.date}</div>
                    {m.grup !== "-" && (
                      <span style={{ display: "inline-block", marginTop: 2, padding: "1px 5px", borderRadius: 4, fontSize: 9, fontWeight: 800, background: "#1e3a5f", color: "#93c5fd" }}>
                        GRP {m.grup}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: m.wib === "TBD" ? "#64748b" : "#38bdf8" }}>{m.wib}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", textAlign: "right", paddingRight: 6 }}>{getCountryName(m.home)}</div>
                  <div style={{ fontSize: 10, color: "#334155", textAlign: "center", fontWeight: 700 }}>vs</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", paddingLeft: 0 }}>{getCountryName(m.away)}</div>
                  <div style={{ fontSize: 10, color: "#334155", lineHeight: 1.3 }}>
                    {getVenueName(m.venue)}
                    {m.note && <div style={{ color: "#64748b", marginTop: 1 }}>{m.note}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: 14, fontSize: 10, color: "#1e293b", textAlign: "center" }}>
          Babak Semifinal & Final masih placeholder ("Juara A", dst.) hingga fase grup selesai · Sumber: AFF / Tirto 2026
        </p>
      </div>
    </div>
  );
}
