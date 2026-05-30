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

const SectionTitle = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 mt-2">
    <div className="h-[2px] w-4 bg-[#C9922A] rounded" />
    <h3 className="text-xs font-bold tracking-widest text-[#0D1B35] uppercase">{title}</h3>
    <div className="h-[2px] flex-1 bg-gray-100 rounded" />
  </div>
);

export default function Step2Contact() {
  const { contactData, updateContactData } = useAdmissionStore();

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center gap-3 bg-[#0D1B35] rounded-xl px-5 py-4">
        <div className="w-10 h-10 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-lg">
          📞
        </div>
        <div>
          <h2 className="text-white font-bold text-base">Contact & Guardian Information</h2>
          <p className="text-gray-400 text-xs">Provide accurate contact details for correspondence</p>
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Phone Number" required>
          <input className={inputCls} placeholder="08104847748" value={contactData.phoneNumber}
            onChange={e => updateContactData({ phoneNumber: e.target.value })} />
        </Field>
        <Field label="Alternate Phone Number">
          <input className={inputCls} placeholder="08087447748" value={contactData.alternatePhone}
            onChange={e => updateContactData({ alternatePhone: e.target.value })} />
        </Field>
      </div>
      <p className="text-[10px] text-gray-400 -mt-3">Must be a valid Nigerian mobile number</p>

      {/* Email */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Email Address" required>
          <input type="email" className={inputCls} placeholder="example@email.com" value={contactData.emailAddress}
            onChange={e => updateContactData({ emailAddress: e.target.value })} />
        </Field>
        <Field label="Confirm Email" required>
          <input type="email" className={inputCls} placeholder="Retype your email" value={contactData.confirmEmail}
            onChange={e => updateContactData({ confirmEmail: e.target.value })} />
        </Field>
      </div>

      {/* Address */}
      <Field label="Residential Address" required>
        <textarea className={inputCls + " resize-none h-20"} placeholder="House No, Street, Area, City, State"
          value={contactData.residentialAddress}
          onChange={e => updateContactData({ residentialAddress: e.target.value })} />
      </Field>

      <SectionTitle title="Parent / Guardian Information" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Guardian's Full Name" required>
          <input className={inputCls} placeholder="Full name of parent/guardian" value={contactData.guardianFullName}
            onChange={e => updateContactData({ guardianFullName: e.target.value })} />
        </Field>
        <Field label="Relationship" required>
          <select className={inputCls} value={contactData.guardianRelationship}
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
        <Field label="Guardian's Phone" required>
          <input className={inputCls} placeholder="08104847748" value={contactData.guardianPhone}
            onChange={e => updateContactData({ guardianPhone: e.target.value })} />
        </Field>
        <Field label="Guardian's Email">
          <input type="email" className={inputCls} placeholder="guardian@email.com" value={contactData.guardianEmail}
            onChange={e => updateContactData({ guardianEmail: e.target.value })} />
        </Field>
      </div>

      <Field label="Guardian's Address" required>
        <textarea className={inputCls + " resize-none h-20"} placeholder="Guardian's full residential address"
          value={contactData.guardianAddress}
          onChange={e => updateContactData({ guardianAddress: e.target.value })} />
      </Field>

      <SectionTitle title="Medical Information" />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Blood Group">
          <select className={inputCls} value={contactData.bloodGroup}
            onChange={e => updateContactData({ bloodGroup: e.target.value })}>
            <option value="">--- Select ---</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Genotype">
          <select className={inputCls} value={contactData.genotype}
            onChange={e => updateContactData({ genotype: e.target.value })}>
            <option value="">--- Select ---</option>
            {["AA","AS","SS","AC","SC"].map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Disability / Special Needs (if any)">
        <input className={inputCls} placeholder="e.g. Visual Impairment — or leave blank if none"
          value={contactData.disability}
          onChange={e => updateContactData({ disability: e.target.value })} />
      </Field>
    </div>
  );
}