"use client";
import { useAdmissionStore } from "@/store/admissionStore";

const inputCls = (error?: string) =>
  `w-full bg-white border ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400" : "border-gray-200 focus:border-[#C9922A] focus:ring-[#C9922A]"} rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all`;

const labelCls = "block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1";

const Field = ({ label, children, required, error }: { label: string; children: React.ReactNode; required?: boolean; error?: string }) => (
  <div className="flex flex-col gap-1">
    <label className={labelCls}>{label} {required && <span className="text-red-500">*</span>}</label>
    {children}
    {error && <p className="text-[11px] text-red-500 mt-0.5">⚠ {error}</p>}
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mt-2">
    <div className="h-[2px] w-4 bg-[#C9922A] rounded" />
    <h3 className="text-xs font-bold tracking-widest text-[#0D1B35] uppercase">{title}</h3>
    <div className="h-[2px] flex-1 bg-gray-100 rounded" />
  </div>
);

const FACULTIES: Record<string, string[]> = {
  Sciences: ["Computer Science","Mathematics","Physics","Chemistry","Biology","Biochemistry"],
  Engineering: ["Electrical Engineering","Civil Engineering","Mechanical Engineering","Chemical Engineering"],
  Law: ["Law"],
  Arts: ["English","History","Philosophy","Religious Studies","French"],
  "Social Sciences": ["Economics","Political Science","Sociology","Psychology","Geography"],
  Education: ["Education Mathematics","Education English","Education Biology","Education Chemistry"],
  Agriculture: ["Agriculture","Forestry","Animal Science","Food Science"],
  Medicine: ["Medicine & Surgery","Nursing","Medical Laboratory Science","Pharmacy"],
  "Management Sciences": ["Accounting","Business Administration","Finance","Marketing","Banking & Finance"],
};

const YEARS = ["2026","2025","2024","2023","2022","2021","2020","2019","2018"];

export default function Step4Programme({ errors }: { errors: Record<string, string> }) {
  const { programmeData, updateProgrammeData } = useAdmissionStore();
  const departments = programmeData.faculty ? FACULTIES[programmeData.faculty] || [] : [];
  const jambScore = parseInt(programmeData.jambScore) || 0;
  const jambPercent = Math.min((jambScore / 400) * 100, 100);
  const scoreColor = jambScore >= 280 ? "bg-green-500" : jambScore >= 200 ? "bg-amber-500" : "bg-red-400";

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 bg-[#0D1B35] rounded-xl px-5 py-4">
        <div className="w-10 h-10 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-lg">🎓</div>
        <div>
          <h2 className="text-white font-bold text-base">Programme of Study</h2>
          <p className="text-gray-400 text-xs">Select your preferred course and JAMB information</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Faculty" required error={errors.faculty}>
          <select className={inputCls(errors.faculty)} value={programmeData.faculty}
            onChange={e => updateProgrammeData({ faculty: e.target.value, department: "" })}>
            <option value="">--- Select Faculty ---</option>
            {Object.keys(FACULTIES).map(f => <option key={f}>{f}</option>)}
          </select>
        </Field>
        <Field label="Department / Course" required error={errors.department}>
          <select className={inputCls(errors.department)} value={programmeData.department}
            onChange={e => updateProgrammeData({ department: e.target.value })} disabled={!programmeData.faculty}>
            <option value="">--- Select Department ---</option>
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Mode of Entry" required error={errors.modeOfEntry}>
          <select className={inputCls(errors.modeOfEntry)} value={programmeData.modeOfEntry}
            onChange={e => updateProgrammeData({ modeOfEntry: e.target.value })}>
            <option value="">--- Select ---</option>
            <option>UTME</option><option>Direct Entry</option>
          </select>
        </Field>
        <Field label="Programme Type" required error={errors.programmeType}>
          <select className={inputCls(errors.programmeType)} value={programmeData.programmeType}
            onChange={e => updateProgrammeData({ programmeType: e.target.value })}>
            <option value="">--- Select ---</option>
            <option>Full Time</option><option>Part Time</option><option>Distance Learning</option>
          </select>
        </Field>
      </div>

      <SectionTitle title="JAMB / UTME Details" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="JAMB Registration Number" required error={errors.jambRegNumber}>
          <input className={inputCls(errors.jambRegNumber)} placeholder="e.g. 20261234567AB"
            value={programmeData.jambRegNumber} onChange={e => updateProgrammeData({ jambRegNumber: e.target.value })} />
        </Field>
        <Field label="JAMB Score" required error={errors.jambScore}>
          <input type="number" className={inputCls(errors.jambScore)} placeholder="e.g. 280" max={400}
            value={programmeData.jambScore} onChange={e => updateProgrammeData({ jambScore: e.target.value })} />
        </Field>
      </div>

      {programmeData.jambScore && (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-500 font-semibold">JAMB Score</span>
            <span className={`font-bold ${jambScore >= 280 ? "text-green-600" : jambScore >= 200 ? "text-amber-600" : "text-red-500"}`}>
              {jambScore} / 400
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div className={`h-2.5 rounded-full transition-all duration-500 ${scoreColor}`} style={{ width: `${jambPercent}%` }} />
          </div>
          <p className="text-[10px] text-gray-400 mt-1">
            {jambScore >= 280 ? "✓ Excellent score!" : jambScore >= 200 ? "⚠ Meets minimum requirement" : "✗ Below minimum requirement"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field label="JAMB Year" required error={errors.jambYear}>
          <select className={inputCls(errors.jambYear)} value={programmeData.jambYear}
            onChange={e => updateProgrammeData({ jambYear: e.target.value })}>
            <option value="">--- Select ---</option>
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
        </Field>
        <Field label="Second Choice Programme" required error={errors.secondChoice}>
          <select className={inputCls(errors.secondChoice)} value={programmeData.secondChoice}
            onChange={e => updateProgrammeData({ secondChoice: e.target.value })}>
            <option value="">--- Select ---</option>
            {Object.values(FACULTIES).flat().map(d => <option key={d}>{d}</option>)}
          </select>
        </Field>
      </div>

      <SectionTitle title="Education Background" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Secondary School Name" required error={errors.secondarySchoolName}>
          <input className={inputCls(errors.secondarySchoolName)} placeholder="Name of secondary school attended"
            value={programmeData.secondarySchoolName} onChange={e => updateProgrammeData({ secondarySchoolName: e.target.value })} />
        </Field>
        <Field label="Year of Graduation" required error={errors.yearOfGraduation}>
          <select className={inputCls(errors.yearOfGraduation)} value={programmeData.yearOfGraduation}
            onChange={e => updateProgrammeData({ yearOfGraduation: e.target.value })}>
            <option value="">--- Select ---</option>
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
        </Field>
      </div>

      <Field label="School Address" required error={errors.schoolAddress}>
        <input className={inputCls(errors.schoolAddress)} placeholder="City, State"
          value={programmeData.schoolAddress} onChange={e => updateProgrammeData({ schoolAddress: e.target.value })} />
      </Field>

      <SectionTitle title="Cisco Tech Programme (Optional)" />

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-3">
        <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Are you interested in the Cisco Certified Technology Programme?</p>
        <select className={inputCls()} value={programmeData.ciscoInterest}
          onChange={e => updateProgrammeData({ ciscoInterest: e.target.value })}>
          <option value="">--- Select ---</option>
          <option>Yes, I am interested</option>
          <option>No, I am not interested</option>
        </select>
        <p className="text-[10px] text-blue-500">This is a fee-based programme (₦100,000/year). Registration is separate from general admission.</p>
      </div>
    </div>
  );
}