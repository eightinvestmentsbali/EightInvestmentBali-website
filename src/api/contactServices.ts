import apiClient from "./lib/apiClient";

export interface ContactPayload {
  name: string;
  email: string;
  mobileNumber: string;
  interestedProject: string[];
  message: string;
}

interface ContactApiPayload {
  name: string;
  email: string;
  phone: string;
  interested_project: number[];
  message: string;
}

const PROJECT_ID_MAP: Record<string, number> = {
  "Lili Village": 1,
  "The Hive": 2,
  "Little Soho": 3,
  "Dynasty 8": 4,
  "Other": 5,
};

export const contactUs = {
  create: async (payload: ContactPayload) => {
    const interestedProjectIds = payload.interestedProject
      .map((project) => PROJECT_ID_MAP[project])
      .filter((id): id is number => Boolean(id));

    const apiPayload: ContactApiPayload = {
      name: payload.name,
      email: payload.email,
      phone: payload.mobileNumber,
      interested_project:
        interestedProjectIds.length > 0 ? interestedProjectIds : [1],
      message: payload.message,
    };

    const response = await apiClient.post("contact", apiPayload);
    return response.data;
  },
};
