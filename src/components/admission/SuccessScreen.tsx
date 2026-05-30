"use client";
import { useAdmissionStore } from "@/store/admissionStore";
import { useEffect, useState } from "react";

const generateRef = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export default function SuccessScreen() {
  const { bioData } = useAdmissionStore();
  const [refNumber] = useState(`UOO/2026/${generateRef()}`);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(refNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 text-center space-y-6">
      {/* Success Icon */}
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center shadow-lg shadow-green-100">
        <div className="w-16 h-16 rounded-full bg-[#0E9F6E] flex items-center justify-center">
          <span className="text-white text-3xl">✓</span>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-[#0D1B35]">Application Submitted!</h2>
        <p className="text-gray-500 text-sm max-w-md">
          Your application to the <span className="font-semibold text-[#0D1B35]">University of Offa</span> has been received successfully.
          Please save your reference number and check your email for confirmation.
        </p>
      </div>

      {/* Reference Number */}
      <div className="w-full max-w-sm">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Your Reference Number</p>
        <div className="bg-[#0D1B35] border-2 border-[#C9922A] rounded-xl px-6 py-4 flex items-center justify-between gap-4">
          <span className="text-[#C9922A] font-bold text-lg tracking-widest">{refNumber}</span>
          <button
            onClick={handleCopy}
            className="text-xs bg-[#C9922A] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#b07d20] transition-all"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm text-left">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-xs font-bold text-blue-800 mb-1">📧 Email Confirmation</p>
          <p className="text-[11px] text-blue-600">A confirmation message will be sent within 24 hours</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <p className="text-xs font-bold text-amber-800 mb-1">📱 SMS Alert</p>
          <p className="text-[11px] text-amber-600">Check your phone for application status updates</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 max-w-sm">
        Keep this reference number safe — you will need it to track your application status and complete your admission process.
      </p>

      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="flex items-center gap-2 px-6 py-3 border-2 border-[#0D1B35] text-[#0D1B35] rounded-xl text-sm font-bold hover:bg-[#0D1B35] hover:text-white transition-all"
      >
        🖨️ Print Confirmation Slip
      </button>
    </div>
  );
}