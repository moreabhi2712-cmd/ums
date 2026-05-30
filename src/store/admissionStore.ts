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
  updateBioData: (data) =>
    set((state) => ({ bioData: { ...state.bioData, ...data } })),
  updateContactData: (data) =>
    set((state) => ({ contactData: { ...state.contactData, ...data } })),
  updateOLevelData: (data) =>
    set((state) => ({ oLevelData: { ...state.oLevelData, ...data } })),
  updateProgrammeData: (data) =>
    set((state) => ({ programmeData: { ...state.programmeData, ...data } })),
  updateDeclarationData: (data) =>
    set((state) => ({
      declarationData: { ...state.declarationData, ...data },
    })),
}));