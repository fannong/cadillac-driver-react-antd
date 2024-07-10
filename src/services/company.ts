import instance from "./axios";
import { myResponse } from "./axios";

export type CompanyProjectType = {
  id: string;
  companyId: string;
  projectName: string;
  usedSkill: string[];
  projectDesc: string;
  jobs: string;
};
export type CompanyDetailType = {
  company: string;
  position: string[];
  appointmentTime: string[];
  projects: CompanyProjectType[];
};
type CreateCompanyParamsType = {
  item: CompanyDetailType[];
};
export const createCompany = (data: CreateCompanyParamsType): Promise<myResponse> => {
  return instance.post("/company/create", data);
};

export const getCompanyList = (): Promise<myResponse> => {
  return instance.get("/company/list");
};

export const getCompanyDetailById = (id: string | number): Promise<myResponse> => {
  return instance.get(`/company/detail/${id}`);
};
