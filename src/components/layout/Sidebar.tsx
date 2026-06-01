"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { label: "Manage Profile", href: "/profile", icon: "👤" },
  { label: "Manage Hostel", href: "/hostel", icon: "🏠" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-[#0D1B35] border border-[#1e3a5f] rounded-lg flex flex-col items-center justify-center gap-1.5">
        <span className="w-4 h-0.5 bg-white rounded" />
        <span className="w-4 h-0.5 bg-white rounded" />
        <span className="w-4 h-0.5 bg-white rounded" />
      </button>

      {/* Overlay — mobile only */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-[#0D1B35] flex flex-col z-50 border-r border-[#1e3a5f]
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-[#1e3a5f]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#C9922A] flex items-center justify-center bg-gradient-to-br from-[#0D1B35] to-[#1a2f5e]">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C9922A] to-[#f0b84a] opacity-90" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">IUMS Portal</p>
                <p className="text-[#C9922A] text-[10px] tracking-wider">University of Offa</p>
              </div>
            </div>
            {/* Close button — mobile only */}
            <button
              onClick={() => setOpen(false)}
              className="md:hidden text-gray-400 hover:text-white text-xl leading-none">
              ✕
            </button>
          </div>
        </div>

        {/* Student Info */}
        <div className="px-6 py-4 border-b border-[#1e3a5f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-sm">👤</div>
            <div>
              <p className="text-white text-xs font-semibold">Student</p>
              <p className="text-[#4a6080] text-[10px]">UOO/2026/Student</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/profile" && pathname === "/");
            return (
              <Link key={item.href} href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${isActive
                    ? "bg-[#C9922A] text-white shadow-lg shadow-amber-900/20"
                    : "text-[#8eacc8] hover:bg-[#1e3a5f] hover:text-white"}`}>
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-6 py-4 border-t border-[#1e3a5f]">
          <p className="text-[#2a4060] text-[10px] text-center">2026/2027 Academic Session</p>
        </div>
      </aside>
    </>
  );
}