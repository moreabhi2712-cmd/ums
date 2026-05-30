
"use client";
import { useAdmissionStore } from "@/store/admissionStore";
import Header from "@/components/admission/Header";
import StepIndicator from "@/components/admission/StepIndicator";
import Step1BioData from "@/components/admission/Step1BioData";
import Step2Contact from "@/components/admission/Step2Contact";
import Step3OLevel from "@/components/admission/Step3OLevel";
import Step4Programme from "@/components/admission/Step4Programme";
import Step5Declaration from "@/components/admission/Step5Declaration";
import SuccessScreen from "@/components/admission/SuccessScreen";

const STEP_TITLES: Record<number, string> = {
  1: "Personal Bio Data",
  2: "Contact & Guardian",
  3: "O-Level Results",
  4: "Programme of Study",
  5: "Declaration",
};

export default function Home() {
  const { currentStep, setStep } = useAdmissionStore();
  const isSuccess = currentStep === 6;

  const handleNext = () => setStep(currentStep + 1);
  const handleBack = () => setStep(currentStep - 1);

  return (
    <div className="min-h-screen bg-[#F5F6FA]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

      {/* Header */}
      <Header title={isSuccess ? "Successfully screen" : STEP_TITLES[currentStep]} />

      {/* Step Indicator */}
      {!isSuccess && <StepIndicator current={currentStep} />}

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {isSuccess ? (
          <SuccessScreen />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {currentStep === 1 && <Step1BioData />}
            {currentStep === 2 && <Step2Contact />}
            {currentStep === 3 && <Step3OLevel />}
            {currentStep === 4 && <Step4Programme />}
            {currentStep === 5 && <Step5Declaration />}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <span className="text-xs text-gray-400 font-medium">Step {currentStep} of 5</span>
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:border-[#C9922A] hover:text-[#C9922A] transition-all"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-8 py-2.5 bg-[#0E9F6E] text-white rounded-xl text-sm font-bold hover:bg-[#0a8a5e] transition-all shadow-md shadow-green-100"
                >
                  {currentStep === 5 ? "Submit Application" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}