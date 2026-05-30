"use client";
import { useRef } from "react";
import { useAdmissionStore } from "@/store/admissionStore";

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
  "Yobe","Zamfara",
];

const inputCls = (error?: string) =>
  `w-full bg-white border ${error ? "border-red-400 focus:border-red-400 focus:ring-red-400" : "border-gray-200 focus:border-[#C9922A] focus:ring-[#C9922A]"} rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all`;

const labelCls = "block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1";

const Field = ({ label, children, required, error }: { label: string; children: React.ReactNode; required?: boolean; error?: string }) => (
  <div className="flex flex-col gap-1">
    <label className={labelCls}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-[11px] text-red-500 mt-0.5">⚠ {error}</p>}
  </div>
);

export default function Step1BioData({ errors }: { errors: Record<string, string> }) {
  const { bioData, updateBioData } = useAdmissionStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateBioData({ passportPhoto: url });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 bg-[#0D1B35] rounded-xl px-5 py-4">
        <div className="w-10 h-10 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-lg">👤</div>
        <div>
          <h2 className="text-white font-bold text-base">Personal Bio Data</h2>
          <p className="text-gray-400 text-xs">Enter your personal details exactly as on official documents</p>
        </div>
      </div>

      {/* Passport Photo */}
      <div>
        <label className={labelCls}>Passport Photograph <span className="text-red-500">*</span></label>
        <div className="flex gap-5 items-start">
          <div
            onClick={() => fileRef.current?.click()}
            className={`w-32 h-32 border-2 border-dashed ${errors.passportPhoto ? "border-red-400" : "border-gray-300 hover:border-[#C9922A]"} rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all bg-white shrink-0`}
          >
            {bioData.passportPhoto ? (
              <img src={bioData.passportPhoto} className="w-full h-full object-cover rounded-xl" alt="passport" />
            ) : (
              <>
                <span className="text-3xl mb-1">📷</span>
                <span className="text-[11px] text-[#C9922A] font-semibold">Click to Upload</span>
                <span className="text-[10px] text-gray-400">JPG / PNG only</span>
              </>
            )}
          </div>
          <div className="text-[11px] text-gray-400 space-y-1.5 pt-2">
            <p>• White or light-blue background</p>
            <p>• Full face, no glasses or head covering</p>
            <p>• Recent photo (within 6 months)</p>
            <p>• Minimum resolution: 200 × 200px</p>
            <p>• File size: max 2MB</p>
          </div>
        </div>
        {errors.passportPhoto && <p className="text-[11px] text-red-500 mt-1">⚠ {errors.passportPhoto}</p>}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
      </div>

      <hr className="border-gray-100" />

      <div className="grid grid-cols-3 gap-4">
        <Field label="Surname" required error={errors.surname}>
          <input className={inputCls(errors.surname)} placeholder="e.g. IBRAHIM" value={bioData.surname}
            onChange={e => updateBioData({ surname: e.target.value })} />
        </Field>
        <Field label="First Name" required error={errors.firstName}>
          <input className={inputCls(errors.firstName)} placeholder="e.g. FATIMAH" value={bioData.firstName}
            onChange={e => updateBioData({ firstName: e.target.value })} />
        </Field>
        <Field label="Other Name(s)" error={errors.otherName}>
          <input className={inputCls(errors.otherName)} placeholder="e.g. KEMI" value={bioData.otherName}
            onChange={e => updateBioData({ otherName: e.target.value })} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Date of Birth" required error={errors.dateOfBirth}>
          <input type="date" className={inputCls(errors.dateOfBirth)} value={bioData.dateOfBirth}
            onChange={e => updateBioData({ dateOfBirth: e.target.value })} />
        </Field>
        <Field label="Gender" required error={errors.gender}>
          <select className={inputCls(errors.gender)} value={bioData.gender}
            onChange={e => updateBioData({ gender: e.target.value })}>
            <option value="">--- Select Gender ---</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Marital Status" required error={errors.maritalStatus}>
          <select className={inputCls(errors.maritalStatus)} value={bioData.maritalStatus}
            onChange={e => updateBioData({ maritalStatus: e.target.value })}>
            <option value="">--- Select ---</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </Field>
        <Field label="Religion" error={errors.religion}>
          <select className={inputCls(errors.religion)} value={bioData.religion}
            onChange={e => updateBioData({ religion: e.target.value })}>
            <option value="">--- Select ---</option>
            <option>Islam</option>
            <option>Christianity</option>
            <option>Traditional</option>
            <option>Other</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Nationality" required error={errors.nationality}>
          <input className={inputCls(errors.nationality)} value={bioData.nationality}
            onChange={e => updateBioData({ nationality: e.target.value })} />
        </Field>
        <Field label="State of Origin" required error={errors.stateOfOrigin}>
          <select className={inputCls(errors.stateOfOrigin)} value={bioData.stateOfOrigin}
            onChange={e => updateBioData({ stateOfOrigin: e.target.value })}>
            <option value="">--- Select State ---</option>
            {NIGERIAN_STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Local Government Area" required error={errors.localGovtArea}>
          <input className={inputCls(errors.localGovtArea)} placeholder="e.g. Ilorin West" value={bioData.localGovtArea}
            onChange={e => updateBioData({ localGovtArea: e.target.value })} />
        </Field>
        <Field label="NIN (National Identity Number)" required error={errors.nin}>
          <input className={inputCls(errors.nin)} placeholder="00000000000" maxLength={11} value={bioData.nin}
            onChange={e => updateBioData({ nin: e.target.value })} />
        </Field>
      </div>
      <p className="text-[10px] text-gray-400 -mt-3">Your 11-digit National Identity Number</p>
    </div>
  );
}