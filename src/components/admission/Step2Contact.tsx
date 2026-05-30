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

export default function Step2Contact({ errors }: { errors: Record<string, string> }) {
  const { contactData, updateContactData } = useAdmissionStore();

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
        <Field label="Phone Number" required error={errors.phoneNumber}>
          <input className={inputCls(errors.phoneNumber)} placeholder="08104847748" value={contactData.phoneNumber}
            onChange={e => updateContactData({ phoneNumber: e.target.value })} />
        </Field>
        <Field label="Alternate Phone Number" error={errors.alternatePhone}>
          <input className={inputCls(errors.alternatePhone)} placeholder="08087447748" value={contactData.alternatePhone}
            onChange={e => updateContactData({ alternatePhone: e.target.value })} />
        </Field>
      </div>
      <p className="text-[10px] text-gray-400 -mt-3">Must be a valid Nigerian mobile number</p>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Email Address" required error={errors.emailAddress}>
          <input type="email" className={inputCls(errors.emailAddress)} placeholder="example@email.com" value={contactData.emailAddress}
            onChange={e => updateContactData({ emailAddress: e.target.value })} />
        </Field>
        <Field label="Confirm Email" required error={errors.confirmEmail}>
          <input type="email" className={inputCls(errors.confirmEmail)} placeholder="Retype your email" value={contactData.confirmEmail}
            onChange={e => updateContactData({ confirmEmail: e.target.value })} />
        </Field>
      </div>

      <Field label="Residential Address" required error={errors.residentialAddress}>
        <textarea className={inputCls(errors.residentialAddress) + " resize-none h-20"}
          placeholder="House No, Street, Area, City, State" value={contactData.residentialAddress}
          onChange={e => updateContactData({ residentialAddress: e.target.value })} />
      </Field>

      <SectionTitle title="Parent / Guardian Information" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Guardian's Full Name" required error={errors.guardianFullName}>
          <input className={inputCls(errors.guardianFullName)} placeholder="Full name of parent/guardian" value={contactData.guardianFullName}
            onChange={e => updateContactData({ guardianFullName: e.target.value })} />
        </Field>
        <Field label="Relationship" required error={errors.guardianRelationship}>
          <select className={inputCls(errors.guardianRelationship)} value={contactData.guardianRelationship}
            onChange={e => updateContactData({ guardianRelationship: e.target.value })}>
            <option value="">--- Select ---</option>
            <option>Father</option>
            <option>Mother</option>
            <option>Sibling</option>
            <option>Uncle</option>
            <option>Aunt</option>
            <option>Guardian</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Guardian's Phone" required error={errors.guardianPhone}>
          <input className={inputCls(errors.guardianPhone)} placeholder="08104847748" value={contactData.guardianPhone}
            onChange={e => updateContactData({ guardianPhone: e.target.value })} />
        </Field>
        <Field label="Guardian's Email" error={errors.guardianEmail}>
          <input type="email" className={inputCls(errors.guardianEmail)} placeholder="guardian@email.com" value={contactData.guardianEmail}
            onChange={e => updateContactData({ guardianEmail: e.target.value })} />
        </Field>
      </div>

      <Field label="Guardian's Address" required error={errors.guardianAddress}>
        <textarea className={inputCls(errors.guardianAddress) + " resize-none h-20"}
          placeholder="Guardian's full residential address" value={contactData.guardianAddress}
          onChange={e => updateContactData({ guardianAddress: e.target.value })} />
      </Field>

      <SectionTitle title="Medical Information" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Blood Group" error={errors.bloodGroup}>
          <select className={inputCls(errors.bloodGroup)} value={contactData.bloodGroup}
            onChange={e => updateContactData({ bloodGroup: e.target.value })}>
            <option value="">--- Select ---</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Genotype" error={errors.genotype}>
          <select className={inputCls(errors.genotype)} value={contactData.genotype}
            onChange={e => updateContactData({ genotype: e.target.value })}>
            <option value="">--- Select ---</option>
            {["AA","AS","SS","AC","SC"].map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Disability / Special Needs (if any)" error={errors.disability}>
        <input className={inputCls(errors.disability)} placeholder="e.g. Visual Impairment — or leave blank if none"
          value={contactData.disability} onChange={e => updateContactData({ disability: e.target.value })} />
      </Field>
    </div>
  );
}