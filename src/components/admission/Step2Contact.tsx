"use client";
import { useState } from "react";
import { useAdmissionStore, validateContactData } from "@/store/admissionStore";

const inputCls = (error?: string) =>
  `w-full bg-white border ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400" : "border-gray-200 focus:border-[#C9922A] focus:ring-[#C9922A]"} rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all`;

const labelCls = "block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1";

const Field = ({ label, children, required, error }: {
  label: string; children: React.ReactNode; required?: boolean; error?: string;
}) => (
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

export default function Step2Contact({ errors: propErrors }: { errors: Record<string, string> }) {
  const { contactData, updateContactData } = useAdmissionStore();
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const getError = (field: string) => {
    if (propErrors[field]) return propErrors[field];
    if (touched[field]) return localErrors[field];
    return undefined;
  };

  const touch = (field: string) => setTouched(prev => ({ ...prev, [field]: true }));

  const update = (field: string, value: string) => {
    const updated = { ...contactData, [field]: value };
    updateContactData({ [field]: value });
    touch(field);
    const errs = validateContactData(updated as typeof contactData);
    setLocalErrors(errs);
  };

  const handlePhone = (field: string, value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    update(field, cleaned);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 bg-[#0D1B35] rounded-xl px-5 py-4">
        <div className="w-10 h-10 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-lg">📞</div>
        <div>
          <h2 className="text-white font-bold text-base">Contact & Guardian Information</h2>
          <p className="text-gray-400 text-xs">Provide accurate contact details for correspondence</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Phone Number" required error={getError("phoneNumber")}>
          <input className={inputCls(getError("phoneNumber"))}
            placeholder="e.g. 08012345678"
            value={contactData.phoneNumber} maxLength={11}
            onBlur={() => touch("phoneNumber")}
            onChange={e => handlePhone("phoneNumber", e.target.value)} />
        </Field>
        <Field label="Alternate Phone Number" error={getError("alternatePhone")}>
          <input className={inputCls(getError("alternatePhone"))}
            placeholder="e.g. 08012345678"
            value={contactData.alternatePhone} maxLength={11}
            onBlur={() => touch("alternatePhone")}
            onChange={e => handlePhone("alternatePhone", e.target.value)} />
        </Field>
      </div>
      <p className="text-[10px] text-gray-400 -mt-3">Must start with 0 — exactly 11 digits</p>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Email Address" required error={getError("emailAddress")}>
          <input type="email" className={inputCls(getError("emailAddress"))}
            placeholder="example@email.com" value={contactData.emailAddress}
            onBlur={() => touch("emailAddress")}
            onChange={e => update("emailAddress", e.target.value)} />
        </Field>
        <Field label="Confirm Email" required error={getError("confirmEmail")}>
          <input type="email" className={inputCls(getError("confirmEmail"))}
            placeholder="Retype your email" value={contactData.confirmEmail}
            onBlur={() => touch("confirmEmail")}
            onChange={e => update("confirmEmail", e.target.value)} />
        </Field>
      </div>

      <Field label="Residential Address" required error={getError("residentialAddress")}>
        <textarea className={inputCls(getError("residentialAddress")) + " resize-none h-20"}
          placeholder="House No, Street, Area, City, State"
          value={contactData.residentialAddress}
          onBlur={() => touch("residentialAddress")}
          onChange={e => update("residentialAddress", e.target.value)} />
      </Field>

      <SectionTitle title="Parent / Guardian Information" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Guardian's Full Name" required error={getError("guardianFullName")}>
          <input className={inputCls(getError("guardianFullName"))}
            placeholder="Full name of parent/guardian" value={contactData.guardianFullName}
            onBlur={() => touch("guardianFullName")}
            onChange={e => update("guardianFullName", e.target.value)} />
        </Field>
        <Field label="Relationship" required error={getError("guardianRelationship")}>
          <select className={inputCls(getError("guardianRelationship"))}
            value={contactData.guardianRelationship}
            onBlur={() => touch("guardianRelationship")}
            onChange={e => update("guardianRelationship", e.target.value)}>
            <option value="">--- Select ---</option>
            <option>Father</option><option>Mother</option><option>Sibling</option>
            <option>Uncle</option><option>Aunt</option><option>Guardian</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Guardian's Phone" required error={getError("guardianPhone")}>
          <input className={inputCls(getError("guardianPhone"))}
            placeholder="e.g. 08012345678" value={contactData.guardianPhone} maxLength={11}
            onBlur={() => touch("guardianPhone")}
            onChange={e => handlePhone("guardianPhone", e.target.value)} />
        </Field>
        <Field label="Guardian's Email" error={getError("guardianEmail")}>
          <input type="email" className={inputCls(getError("guardianEmail"))}
            placeholder="guardian@email.com" value={contactData.guardianEmail}
            onBlur={() => touch("guardianEmail")}
            onChange={e => update("guardianEmail", e.target.value)} />
        </Field>
      </div>

      <Field label="Guardian's Address" required error={getError("guardianAddress")}>
        <textarea className={inputCls(getError("guardianAddress")) + " resize-none h-20"}
          placeholder="Guardian's full residential address"
          value={contactData.guardianAddress}
          onBlur={() => touch("guardianAddress")}
          onChange={e => update("guardianAddress", e.target.value)} />
      </Field>

      <SectionTitle title="Medical Information" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Blood Group" error={getError("bloodGroup")}>
          <select className={inputCls(getError("bloodGroup"))} value={contactData.bloodGroup}
            onBlur={() => touch("bloodGroup")}
            onChange={e => update("bloodGroup", e.target.value)}>
            <option value="">--- Select ---</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Genotype" error={getError("genotype")}>
          <select className={inputCls(getError("genotype"))} value={contactData.genotype}
            onBlur={() => touch("genotype")}
            onChange={e => update("genotype", e.target.value)}>
            <option value="">--- Select ---</option>
            {["AA","AS","SS","AC","SC"].map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Disability / Special Needs (if any)">
        <input className={inputCls()} placeholder="e.g. Visual Impairment — or leave blank if none"
          value={contactData.disability}
          onChange={e => update("disability", e.target.value)} />
      </Field>
    </div>
  );
}