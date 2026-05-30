const STEPS = [
  { id: 1, label: "BIO DATA" },
  { id: 2, label: "CONTACT" },
  { id: 3, label: "O-LEVEL" },
  { id: 4, label: "PROGRAMME" },
  { id: 5, label: "DECLARATION" },
];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="w-full bg-[#0D1B35] px-6 py-4 border-b border-[#1a2f5e]">
      <div className="flex items-center justify-center gap-0">
        {STEPS.map((step, i) => {
          const done = step.id < current;
          const active = step.id === current;
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
                    ${active
                      ? "bg-[#C9922A] border-[#C9922A] text-white scale-110 shadow-lg shadow-amber-500/30"
                      : done
                      ? "bg-[#0E9F6E] border-[#0E9F6E] text-white"
                      : "bg-transparent border-[#2a4060] text-[#4a6080]"
                    }`}
                >
                  {done ? "✓" : step.id}
                </div>
                <span
                  className={`text-[9px] tracking-widest mt-1.5 font-bold
                    ${active
                      ? "text-[#C9922A]"
                      : done
                      ? "text-[#0E9F6E]"
                      : "text-[#2a4060]"
                    }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-12 h-[2px] mb-4 mx-1 transition-all duration-300 ${
                    done ? "bg-[#0E9F6E]" : "bg-[#1e3a5f]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}