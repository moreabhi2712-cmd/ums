import Image from "next/image";

export default function Header({ title }: { title: string }) {
  return (
    <header className="w-full bg-[#0D1B35] px-6 py-4 flex items-center justify-between border-b-2 border-[#C9922A]">
      {/* Logo + Title */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#C9922A] flex items-center justify-center bg-gradient-to-br from-[#0D1B35] to-[#1a2f5e]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9922A] to-[#f0b84a] opacity-80" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">{title}</h1>
          <p className="text-[#C9922A] text-xs font-semibold tracking-widest uppercase">
            Kwara State, Nigeria — Undergraduate Admission Portal
          </p>
        </div>
      </div>

      {/* Session Badge */}
      <div className="border border-[#C9922A] text-[#C9922A] text-xs font-bold px-4 py-2 rounded-full tracking-wider">
        2026/2027 SESSION
      </div>
    </header>
  );
}