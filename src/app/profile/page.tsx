"use client";
import { useState } from "react";
import { useAdmissionStore, validateBioData, validateContactData, validateOLevelData, validateProgrammeData, validateDeclarationData } from "@/store/admissionStore";
import StepIndicator from "@/components/admission/StepIndicator";
import Step1BioData from "@/components/admission/Step1BioData";
import Step2Contact from "@/components/admission/Step2Contact";
import Step3OLevel from "@/components/admission/Step3OLevel";
import Step4Programme from "@/components/admission/Step4Programme";
import Step5Declaration from "@/components/admission/Step5Declaration";
import SuccessScreen from "@/components/admission/SuccessScreen";

export default function ProfilePage() {
  const { currentStep, setStep, bioData, contactData, oLevelData, programmeData, declarationData } = useAdmissionStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isSuccess = currentStep === 6;

  const validateCurrentStep = () => {
    let stepErrors: Record<string, string> = {};
    if (currentStep === 1) stepErrors = validateBioData(bioData);
    if (currentStep === 2) stepErrors = validateContactData(contactData);
    if (currentStep === 3) stepErrors = validateOLevelData(oLevelData);
    if (currentStep === 4) stepErrors = validateProgrammeData(programmeData);
    if (currentStep === 5) stepErrors = validateDeclarationData(declarationData);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setErrors({});
      setStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {isSuccess ? (
        <SuccessScreen />
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <StepIndicator current={currentStep} />
          </div>
          <div className="p-6 md:p-8">
            {currentStep === 1 && <Step1BioData errors={errors} />}
            {currentStep === 2 && <Step2Contact errors={errors} />}
            {currentStep === 3 && <Step3OLevel errors={errors} />}
            {currentStep === 4 && <Step4Programme errors={errors} />}
            {currentStep === 5 && <Step5Declaration errors={errors} />}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <span className="text-xs text-gray-400 font-medium">Step {currentStep} of 5</span>
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <button onClick={handleBack}
                    className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:border-[#C9922A] hover:text-[#C9922A] transition-all">
                    Back
                  </button>
                )}
                <button onClick={handleNext}
                  className="px-8 py-2.5 bg-[#0E9F6E] text-white rounded-xl text-sm font-bold hover:bg-[#0a8a5e] transition-all shadow-md shadow-green-100">
                  {currentStep === 5 ? "Submit Application" : "Continue →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}