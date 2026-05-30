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

export default function Step1BioData() {
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
      {/* Section Header */}
      <div className="flex items-center gap-3 bg-[#0D1B35] rounded-xl px-5 py-4">
        <div className="w-10 h-10 rounded-full bg-[#C9922A]/20 border border-[#C9922A]/40 flex items-center justify-center text-lg">
          👤
        </div>
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
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#C9922A] transition-all bg-white shrink-0"
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
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
      </div>

      <hr className="border-gray-100" />

      {/* Name Row */}
      <div className="grid grid-cols-3 gap-4">
        <Field label="Surname" required>
          <input className={inputCls} placeholder="e.g. IBRAHIM" value={bioData.surname}
            onChange={e => updateBioData({ surname: e.target.value })} />
        </Field>
        <Field label="First Name" required>
          <input className={inputCls} placeholder="e.g. FATIMAH" value={bioData.firstName}
            onChange={e => updateBioData({ firstName: e.target.value })} />
        </Field>
        <Field label="Other Name(s)">
          <input className={inputCls} placeholder="e.g. KEMI" value={bioData.otherName}
            onChange={e => updateBioData({ otherName: e.target.value })} />
        </Field>
      </div>

      {/* DOB & Gender */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Date of Birth" required>
          <input type="date" className={inputCls} value={bioData.dateOfBirth}
            onChange={e => updateBioData({ dateOfBirth: e.target.value })} />
        </Field>
        <Field label="Gender" required>
          <select className={inputCls} value={bioData.gender}
            onChange={e => updateBioData({ gender: e.target.value })}>
            <option value="">--- Select Gender ---</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </Field>
      </div>

      {/* Marital & Religion */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Marital Status" required>
          <select className={inputCls} value={bioData.maritalStatus}
            onChange={e => updateBioData({ maritalStatus: e.target.value })}>
            <option value="">--- Select ---</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </Field>
        <Field label="Religion">
          <select className={inputCls} value={bioData.religion}
            onChange={e => updateBioData({ religion: e.target.value })}>
            <option value="">--- Select ---</option>
            <option>Islam</option>
            <option>Christianity</option>
            <option>Traditional</option>
            <option>Other</option>
          </select>
        </Field>
      </div>

      {/* Nationality & State */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Nationality" required>
          <input className={inputCls} value={bioData.nationality}
            onChange={e => updateBioData({ nationality: e.target.value })} />
        </Field>
        <Field label="State of Origin" required>
          <select className={inputCls} value={bioData.stateOfOrigin}
            onChange={e => updateBioData({ stateOfOrigin: e.target.value })}>
            <option value="">--- Select State ---</option>
            {NIGERIAN_STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      {/* LGA & NIN */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Local Government Area" required>
          <input className={inputCls} placeholder="e.g. Ilorin West" value={bioData.localGovtArea}
            onChange={e => updateBioData({ localGovtArea: e.target.value })} />
        </Field>
        <Field label="NIN (National Identity Number)" required>
          <input className={inputCls} placeholder="00000000000" maxLength={11} value={bioData.nin}
            onChange={e => updateBioData({ nin: e.target.value })} />
        </Field>
      </div>
      <p className="text-[10px] text-gray-400 -mt-3">Your 11-digit National Identity Number</p>
    </div>
  );
}