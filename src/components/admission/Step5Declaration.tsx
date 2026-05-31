"use client";
import { useState } from "react";
import { useAdmissionStore, validateDeclarationData } from "@/store/admissionStore";

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

export default function Step5Declaration({ errors: propErrors }: { errors: Record<string, string> }) {
  const { declarationData, updateDeclarationData, bioData, contactData, programmeData } = useAdmissionStore();
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const getError = (field: string): string | undefined => {
    if (touched[field]) return localErrors[field];
    return propErrors[field];
  };

  const touch = (field: string) => setTouched(prev => ({ ...prev, [field]: true }));

  const updateField = (field: string, value: string | boolean) => {
    const updated = { ...declarationData, [field]: value };
    updateDeclarationData({ [field]: value });
    touch(field);
    setLocalErrors(validateDeclarationData(updated as typeof declarationData));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 bg-[#0D1B35] rounded-xl px-5 py-4">
        <div className="w-10 h-10 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-lg">📋</div>
        <div>
          <h2 className="text-white font-bold text-base">Declaration</h2>
          <p className="text-gray-400 text-xs">Review and confirm the accuracy of your information</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-[#0D1B35] px-5 py-3">
          <h3 className="text-[11px] font-bold tracking-widest text-[#C9922A] uppercase">Application Summary</h3>
        </div>
        <div className="p-5 grid grid-cols-2 gap-y-3 text-xs">
          {[
            { label: "Full Name", value: [bioData.surname, bioData.firstName, bioData.otherName].filter(Boolean).join(" ") || "—" },
            { label: "Date of Birth", value: bioData.dateOfBirth || "—" },
            { label: "Gender", value: bioData.gender || "—" },
            { label: "State of Origin", value: bioData.stateOfOrigin || "—" },
            { label: "NIN", value: bioData.nin || "—" },
            { label: "Email", value: contactData.emailAddress || "—" },
            { label: "Phone", value: contactData.phoneNumber || "—" },
            { label: "Faculty", value: programmeData.faculty || "—" },
            { label: "Department", value: programmeData.department || "—" },
            { label: "JAMB Score", value: programmeData.jambScore || "—" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-gray-400 text-[10px] uppercase tracking-wider">{label}</span>
              <span className="text-gray-800 font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 text-xs text-gray-600 leading-relaxed space-y-2">
        <p className="font-bold text-[#0D1B35] text-sm mb-3">Declaration Statement</p>
        <p>1. All information provided in this application form is true, accurate, and complete to the best of my knowledge.</p>
        <p>2. I understand that any false or misleading information will result in the cancellation of my admission.</p>
        <p>3. I agree to abide by the rules, regulations, and code of conduct of this institution.</p>
        <p>4. I consent to the processing of my personal data for academic and administrative purposes.</p>
        <p>5. I understand that admission is subject to meeting the minimum entry requirements.</p>
      </div>

      {/* Checkbox */}
      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            onClick={() => updateField("agreed", !declarationData.agreed)}
            className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all
              ${declarationData.agreed
                ? "bg-[#C9922A] border-[#C9922A]"
                : getError("agreed")
                  ? "border-red-400"
                  : "bg-white border-gray-300 group-hover:border-[#C9922A]"}`}
          >
            {declarationData.agreed && <span className="text-white text-xs font-bold">✓</span>}
          </div>
          <span className="text-xs text-gray-600 leading-relaxed">
            I have read, understood, and agree to the declaration above. I confirm that all information provided is accurate and complete.
          </span>
        </label>
        {getError("agreed") && <p className="text-[11px] text-red-500 ml-8">⚠ {getError("agreed")}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Signature (Full Name)" required error={getError("signature")}>
          <input className={inputCls(getError("signature"))} placeholder="Type your full name as signature"
            value={declarationData.signature}
            onBlur={() => touch("signature")}
            onChange={e => updateField("signature", e.target.value)} />
        </Field>
        <Field label="Date" required error={getError("date")}>
          <input type="date" className={inputCls(getError("date"))}
            value={declarationData.date}
            onBlur={() => touch("date")}
            onChange={e => updateField("date", e.target.value)} />
        </Field>
      </div>
    </div>
  );
}