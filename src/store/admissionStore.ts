import { create } from "zustand";

export interface BioData {
  passportPhoto: string | null;
  surname: string;
  firstName: string;
  otherName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  religion: string;
  nationality: string;
  stateOfOrigin: string;
  localGovtArea: string;
  nin: string;
}

export interface ContactData {
  phoneNumber: string;
  alternatePhone: string;
  emailAddress: string;
  confirmEmail: string;
  residentialAddress: string;
  guardianFullName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianAddress: string;
  bloodGroup: string;
  genotype: string;
  disability: string;
}

export interface OLevelData {
  examinationType: string;
  examinationYear: string;
  examinationNumber: string;
  centreNumber: string;
  subjectCategory: string;
  subjects: { name: string; grade: string }[];
}

export interface ProgrammeData {
  faculty: string;
  department: string;
  modeOfEntry: string;
  programmeType: string;
  jambRegNumber: string;
  jambScore: string;
  jambYear: string;
  secondChoice: string;
  secondarySchoolName: string;
  yearOfGraduation: string;
  schoolAddress: string;
  ciscoInterest: string;
}

export interface DeclarationData {
  agreed: boolean;
  signature: string;
  date: string;
}

// ─── Validation Functions ─────────────────────────────────────────────────────
export const validateBioData = (data: BioData): Record<string, string> => {
  const errors: Record<string, string> = {};
  const nameRegex = /^[a-zA-Z\s'-]+$/;

  if (!data.passportPhoto) errors.passportPhoto = "Passport photograph is required";
  if (!data.surname.trim()) errors.surname = "Surname is required";
  else if (!nameRegex.test(data.surname)) errors.surname = "Surname must contain letters only";

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  else if (!nameRegex.test(data.firstName)) errors.firstName = "First name must contain letters only";

  if (data.otherName && !nameRegex.test(data.otherName)) errors.otherName = "Other name must contain letters only";

  if (!data.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
  else {
    const dob = new Date(data.dateOfBirth);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 16) errors.dateOfBirth = "Applicant must be at least 16 years old";
    if (age > 50) errors.dateOfBirth = "Please enter a valid date of birth";
  }

  if (!data.gender) errors.gender = "Gender is required";
  if (!data.maritalStatus) errors.maritalStatus = "Marital status is required";
  if (!data.nationality.trim()) errors.nationality = "Nationality is required";
  if (!data.stateOfOrigin) errors.stateOfOrigin = "State of origin is required";
  if (!data.localGovtArea.trim()) errors.localGovtArea = "Local government area is required";

  if (!data.nin.trim()) errors.nin = "NIN is required";
  else if (!/^\d{11}$/.test(data.nin)) errors.nin = "NIN must be exactly 11 digits";

  return errors;
};

export const validateContactData = (data: ContactData): Record<string, string> => {
  const errors: Record<string, string> = {};
  const nigerianPhone = /^0\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
  else if (!nigerianPhone.test(data.phoneNumber)) errors.phoneNumber = "Enter a valid Nigerian mobile number (e.g. 08012345678)";

  if (data.alternatePhone && !nigerianPhone.test(data.alternatePhone)) errors.alternatePhone = "Enter a valid Nigerian mobile number";

  if (!data.emailAddress.trim()) errors.emailAddress = "Email address is required";
  else if (!emailRegex.test(data.emailAddress)) errors.emailAddress = "Enter a valid email address";

  if (!data.confirmEmail.trim()) errors.confirmEmail = "Please confirm your email";
  else if (data.emailAddress !== data.confirmEmail) errors.confirmEmail = "Email addresses do not match";

  if (!data.residentialAddress.trim()) errors.residentialAddress = "Residential address is required";
  else if (data.residentialAddress.trim().length < 10) errors.residentialAddress = "Please enter a complete address";

  if (!data.guardianFullName.trim()) errors.guardianFullName = "Guardian name is required";
  if (!data.guardianRelationship) errors.guardianRelationship = "Relationship is required";

  if (!data.guardianPhone.trim()) errors.guardianPhone = "Guardian phone is required";
  else if (!nigerianPhone.test(data.guardianPhone)) errors.guardianPhone = "Enter a valid Nigerian mobile number";

  if (data.guardianEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.guardianEmail)) errors.guardianEmail = "Enter a valid email address";

  if (!data.guardianAddress.trim()) errors.guardianAddress = "Guardian address is required";

  return errors;
};

export const validateOLevelData = (data: OLevelData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.examinationType) errors.examinationType = "Examination type is required";
  if (!data.examinationYear) errors.examinationYear = "Examination year is required";
  if (!data.examinationNumber.trim()) errors.examinationNumber = "Examination number is required";
  if (!data.centreNumber.trim()) errors.centreNumber = "Centre number is required";
  if (!data.subjectCategory) errors.subjectCategory = "Please select a subject category";

  const gradedSubjects = data.subjects.filter(s => s.grade);
  if (gradedSubjects.length < 5) errors.subjects = "Please enter grades for at least 5 subjects";

  return errors;
};

export const validateProgrammeData = (data: ProgrammeData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.faculty) errors.faculty = "Faculty is required";
  if (!data.department) errors.department = "Department is required";
  if (!data.modeOfEntry) errors.modeOfEntry = "Mode of entry is required";
  if (!data.programmeType) errors.programmeType = "Programme type is required";

  if (!data.jambRegNumber.trim()) errors.jambRegNumber = "JAMB registration number is required";
  else if (!/^\d{11}[A-Z]{2}$/.test(data.jambRegNumber.toUpperCase())) errors.jambRegNumber = "Enter valid JAMB reg number (e.g. 20261234567AB)";

  if (!data.jambScore.trim()) errors.jambScore = "JAMB score is required";
  else if (isNaN(Number(data.jambScore)) || Number(data.jambScore) < 0 || Number(data.jambScore) > 400) errors.jambScore = "JAMB score must be between 0 and 400";

  if (!data.jambYear) errors.jambYear = "JAMB year is required";
  if (!data.secondChoice) errors.secondChoice = "Second choice programme is required";
  if (!data.secondarySchoolName.trim()) errors.secondarySchoolName = "Secondary school name is required";
  if (!data.yearOfGraduation) errors.yearOfGraduation = "Year of graduation is required";
  if (!data.schoolAddress.trim()) errors.schoolAddress = "School address is required";

  return errors;
};

export const validateDeclarationData = (data: DeclarationData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.agreed) errors.agreed = "You must agree to the declaration";
  if (!data.signature.trim()) errors.signature = "Signature is required";
  if (!data.date) errors.date = "Date is required";

  return errors;
};

// ─── Store ────────────────────────────────────────────────────────────────────
interface AdmissionState {
  currentStep: number;
  bioData: BioData;
  contactData: ContactData;
  oLevelData: OLevelData;
  programmeData: ProgrammeData;
  declarationData: DeclarationData;
  setStep: (step: number) => void;
  updateBioData: (data: Partial<BioData>) => void;
  updateContactData: (data: Partial<ContactData>) => void;
  updateOLevelData: (data: Partial<OLevelData>) => void;
  updateProgrammeData: (data: Partial<ProgrammeData>) => void;
  updateDeclarationData: (data: Partial<DeclarationData>) => void;
}

export const useAdmissionStore = create<AdmissionState>((set) => ({
  currentStep: 1,
  bioData: {
    passportPhoto: null,
    surname: "",
    firstName: "",
    otherName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    religion: "",
    nationality: "Nigerian",
    stateOfOrigin: "",
    localGovtArea: "",
    nin: "",
  },
  contactData: {
    phoneNumber: "",
    alternatePhone: "",
    emailAddress: "",
    confirmEmail: "",
    residentialAddress: "",
    guardianFullName: "",
    guardianRelationship: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianAddress: "",
    bloodGroup: "",
    genotype: "",
    disability: "",
  },
  oLevelData: {
    examinationType: "",
    examinationYear: "",
    examinationNumber: "",
    centreNumber: "",
    subjectCategory: "",
    subjects: [],
  },
  programmeData: {
    faculty: "",
    department: "",
    modeOfEntry: "",
    programmeType: "",
    jambRegNumber: "",
    jambScore: "",
    jambYear: "",
    secondChoice: "",
    secondarySchoolName: "",
    yearOfGraduation: "",
    schoolAddress: "",
    ciscoInterest: "",
  },
  declarationData: {
    agreed: false,
    signature: "",
    date: "",
  },
  setStep: (step) => set({ currentStep: step }),
  updateBioData: (data) => set((state) => ({ bioData: { ...state.bioData, ...data } })),
  updateContactData: (data) => set((state) => ({ contactData: { ...state.contactData, ...data } })),
  updateOLevelData: (data) => set((state) => ({ oLevelData: { ...state.oLevelData, ...data } })),
  updateProgrammeData: (data) => set((state) => ({ programmeData: { ...state.programmeData, ...data } })),
  updateDeclarationData: (data) => set((state) => ({ declarationData: { ...state.declarationData, ...data } })),
}));