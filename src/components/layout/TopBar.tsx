"use client";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Personal Bio Data", subtitle: "Undergraduate Admission Portal" },
  "/profile": { title: "Personal Bio Data", subtitle: "Undergraduate Admission Portal" },
  "/hostel": { title: "Manage Hostel", subtitle: "Book and manage your campus accommodation" },
};

export default function TopBar() {
  const pathname = usePathname();
  const page = pageTitles[pathname] || pageTitles["/"];

  return (
    <header className="w-full bg-[#0D1B35] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between border-b-2 border-[#C9922A] md:pl-6 pl-16">
      <div>
        <h1 className="text-white font-bold text-base md:text-lg leading-tight">{page.title}</h1>
        <p className="text-[#C9922A] text-[10px] md:text-xs font-semibold tracking-widest uppercase">{page.subtitle}</p>
      </div>
      <div className="border border-[#C9922A] text-[#C9922A] text-[10px] md:text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full tracking-wider">
        2026/2027
      </div>
    </header>
  );
}