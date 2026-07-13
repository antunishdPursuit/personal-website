export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  year: string;
  accent: "lime" | "cyan";
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "esme",
    index: "01",
    title: "Esme",
    tagline: "A 3D AI you talk to about music",
    description:
      "A talking 3D avatar that recommends music through natural conversation. Claude reads your genre and mood from chat, real tracks are pulled from Last.fm, and responses are voiced with amplitude-driven lip sync. Falls back gracefully to a local rule-based recommender when keys are missing.",
    tech: ["React", "Three.js", "FastAPI", "Claude", "Last.fm", "ElevenLabs"],
    year: "2026",
    accent: "lime",
    links: [
      { label: "GitHub", href: "https://github.com/antunishdPursuit/applied-ai-system-project" },
    ],
  },
  {
    id: "provenance-guard",
    index: "02",
    title: "Provenance Guard",
    tagline: "Responsible AI-content attribution",
    description:
      "A Flask API that estimates whether text is AI-written without falsely accusing people. Combines a Groq semantic pass with local stylometry, surfaces confidence and transparency labels, and gives creators an appeal path backed by an append-only audit log.",
    tech: ["Python", "Flask", "Groq", "Stylometry"],
    year: "2026",
    accent: "cyan",
    links: [
      { label: "GitHub", href: "https://github.com/antunishdPursuit/ai201-project4-provenance-guard" },
    ],
  },
];
