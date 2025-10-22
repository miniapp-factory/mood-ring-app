import { cn } from "@/lib/utils";

export default function MoodRing({ mood }: { mood: string }) {
  const colors = {
    happy: "var(--mood-happy)",
    sad: "var(--mood-sad)",
    excited: "var(--mood-excited)",
    relaxed: "var(--mood-relaxed)",
    unknown: "var(--mood-unknown)",
  };

  const ringColor = colors[mood as keyof typeof colors] ?? colors.unknown;

  return (
    <div
      className="w-48 h-48 rounded-full border-8 border-white flex items-center justify-center"
      style={{
        background: `conic-gradient(
          ${ringColor} 0deg 72deg,
          #fff 72deg 144deg,
          ${ringColor} 144deg 216deg,
          #fff 216deg 288deg,
          ${ringColor} 288deg 360deg
        )`,
      }}
    >
      <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
        <span className="text-2xl font-bold">{mood}</span>
      </div>
    </div>
  );
}
