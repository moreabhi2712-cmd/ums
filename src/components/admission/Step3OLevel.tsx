"use client";
import { useAdmissionStore } from "@/store/admissionStore";

const inputCls = "w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9922A] focus:ring-1 focus:ring-[#C9922A] transition-all";
const labelCls = "block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1";

const Field = ({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) => (
  <div className="flex flex-col gap-1">
    <label className={labelCls}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const GRADES = ["A1","B2","B3","C4","C5","C6","D7","E8","F9"];

const CATEGORIES = {
  Science: {
    icon: "🔬",
    color: "bg-blue-600",
    compulsory: ["English Language", "Mathematics", "Physics", "Chemistry", "Biology"],
    optional: ["Further Mathematics", "Agricultural Science", "Computer Science", "Geography"],
  },
  Arts: {
    icon: "🎨",
    color: "bg-purple-600",
    compulsory: ["English Language", "Literature in English", "Government", "History"],
    optional: ["Mathematics", "Economics", "French", "Christian Religious Studies", "Islamic Studies"],
  },
  "Social Sciences": {
    icon: "📊",
    color: "bg-amber-600",
    compulsory: ["English Language", "Mathematics", "Economics", "Government"],
    optional: ["Commerce", "Accounting", "Geography", "Biology", "History"],
  },
};

export default function Step3OLevel() {
  const { oLevelData, updateOLevelData } = useAdmissionStore();

  const selectedCategory = oLevelData.subjectCategory as keyof typeof CATEGORIES;
  const categoryData = CATEGORIES[selectedCategory];

  const getGrade = (subject: string) => {
    return oLevelData.subjects.find(s => s.name === subject)?.grade || "";
  };

  const setGrade = (subject: string, grade: string) => {
    const existing = oLevelData.subjects.filter(s => s.name !== subject);
    const updated = grade ? [...existing, { name: subject, grade }] : existing;
    updateOLevelData({ subjects: updated });
  };

  const validatedSubjects = oLevelData.subjects.filter(s => s.grade && s.grade !== "F9" && s.grade !== "E8" && s.grade !== "D7");

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center gap-3 bg-[#0D1B35] rounded-xl px-5 py-4">
        <div className="w-10 h-10 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-lg">
          📄
        </div>
        <div>
          <h2 className="text-white font-bold text-base">O-Level Result Validation</h2>
          <p className="text-gray-400 text-xs">Select your subject category and enter your WAEC/NECO grades</p>
        </div>
      </div>

      {/* Exam Details */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Examination Type" required>
          <select className={inputCls} value={oLevelData.examinationType}
            onChange={e => updateOLevelData({ examinationType: e.target.value })}>
            <option value="">--- Select ---</option>
            <option>WAEC</option>
            <option>NECO</option>
            <option>GCE</option>
            <option>NABTEB</option>
          </select>
        </Field>
        <Field label="Examination Year" required>
          <select className={inputCls} value={oLevelData.examinationYear}
            onChange={e => updateOLevelData({ examinationYear: e.target.value })}>
            <option value="">--- Select Year ---</option>
            {["2026","2025","2024","2023","2022","2021","2020"].map(y => <option key={y}>{y}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Examination Number" required>
          <input className={inputCls} placeholder="e.g. 421010101" value={oLevelData.examinationNumber}
            onChange={e => updateOLevelData({ examinationNumber: e.target.value })} />
        </Field>
        <Field label="Centre Number" required>
          <input className={inputCls} placeholder="e.g. 50001" value={oLevelData.centreNumber}
            onChange={e => updateOLevelData({ centreNumber: e.target.value })} />
        </Field>
      </div>

      {/* Subject Category */}
      <div>
        <label className={labelCls}>Select Subject Category <span className="text-red-500">*</span></label>
        <div className="flex gap-3 mt-1">
          {Object.entries(CATEGORIES).map(([cat, data]) => (
            <button key={cat} type="button"
              onClick={() => updateOLevelData({ subjectCategory: cat, subjects: [] })}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all
                ${selectedCategory === cat
                  ? `${data.color} border-transparent text-white shadow-md`
                  : "bg-white border-gray-200 text-gray-500 hover:border-[#C9922A]"}`}>
              <span>{data.icon}</span> {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects Grid */}
      {categoryData && (
        <div className="space-y-4">
          {/* Compulsory */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${categoryData.color}`}>
                COMPULSORY
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {categoryData.compulsory.map(subject => (
                <div key={subject} className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">{subject}</p>
                  <select className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-[#C9922A]"
                    value={getGrade(subject)}
                    onChange={e => setGrade(subject, e.target.value)}>
                    <option value="">Grade</option>
                    {GRADES.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Optional */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gray-400">
                OPTIONAL
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {categoryData.optional.map(subject => (
                <div key={subject} className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">{subject}</p>
                  <select className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-[#C9922A]"
                    value={getGrade(subject)}
                    onChange={e => setGrade(subject, e.target.value)}>
                    <option value="">Grade</option>
                    {GRADES.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Summary */}
          {validatedSubjects.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs font-bold text-green-700 mb-2">
                ✓ {validatedSubjects.length} Credit(s) Validated — {selectedCategory} Track
              </p>
              <div className="flex flex-wrap gap-2">
                {validatedSubjects.map(s => (
                  <span key={s.name} className="text-[11px] bg-white border border-green-200 text-green-700 px-2 py-1 rounded-full font-semibold">
                    {s.name}: {s.grade}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}