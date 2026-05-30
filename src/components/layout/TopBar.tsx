"use client";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Personal Bio Data", subtitle: "Kwara State, Nigeria — Undergraduate Admission Portal" },
  "/profile": { title: "Personal Bio Data", subtitle: "Kwara State, Nigeria — Undergraduate Admission Portal" },
  "/hostel": { title: "Manage Hostel", subtitle: "Book and manage your campus accommodation" },
};

export default function TopBar() {
  const pathname = usePathname();
  const page = pageTitles[pathname] || pageTitles["/"];

  return (
    <header className="w-full bg-[#0D1B35] px-6 py-4 flex items-center justify-between border-b-2 border-[#C9922A]">
      <div>
        <h1 className="text-white font-bold text-lg leading-tight">{page.title}</h1>
        <p className="text-[#C9922A] text-xs font-semibold tracking-widest uppercase">{page.subtitle}</p>
      </div>
      <div className="border border-[#C9922A] text-[#C9922A] text-xs font-bold px-4 py-2 rounded-full tracking-wider">
        2026/2027 SESSION
      </div>
    </header>
  );
}