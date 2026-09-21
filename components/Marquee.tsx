const label =
  "CHARACTER DESIGN ✦ CREATURE DESIGN ✦ SCENE NARRATIVE ✦ RITRATTI ✦ COVER & EDITORIA ✦ ";

export default function Marquee() {
  return (
    <div className="bg-marquee border-y border-white/10 py-5 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-taupe text-sm tracking-[0.3em] uppercase px-4">
          {label.repeat(4)}
        </span>
        <span className="text-taupe text-sm tracking-[0.3em] uppercase px-4">
          {label.repeat(4)}
        </span>
      </div>
    </div>
  );
}
