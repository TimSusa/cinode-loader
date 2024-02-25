import axios from "axios";
import { getToken } from "./auth.js";

const headers = {
  Authorization: `Bearer ${(await getToken())?.access_token}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function getUsers() {
  try {
    const { data } = await axios.get(
      `${process.env.API_ENDPOINT}/companies/${process.env.COMPANY_ID}/users`,
      {
        headers: {
          Authorization: `Bearer ${(await getToken())?.access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error("Error getting users ");
  }
}

export async function getResumes() {
  try {
    const { data } = await axios.get(
      `${process.env.API_ENDPOINT}/companies/${process.env.COMPANY_ID}/resumes`,
      {
        headers,
      }
    );
    return data;
  } catch (error: any) {
    console.error("Error getting resumes ", error?.message);
    throw new Error("Error getting resumes ");
  }
}

export async function getResumesFlat() {
  const allUserResumes = await getResumes();
  return Promise.all(
    allUserResumes.map(async (user: any) => {
      if (user) {
        const { id, companyUserId } = user;
        const resume = await getUserResume(companyUserId ?? 0, id ?? 0);
        if (resume) {
          return resume;
        }
      }
    })
  );
}

console.log(JSON.stringify(await getResumesFlat()), null, 2);

export async function getUserResume(userId = 161192, resumeId = 276675) {
  try {
    const { data } = await axios.get(
      `${process.env.API_ENDPOINT}/companies/${process.env.COMPANY_ID}/users/${userId}/resumes/${resumeId}`,
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    return null;
  }
}

export async function getUserProfile(userId = 161192) {
  try {
    const { data } = await axios.get(
      `${process.env.API_ENDPOINT}/companies/${process.env.COMPANY_ID}/users/${userId}/profile`,
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    throw new Error("Error getting getUserProfile ");
  }
}

export async function getUserSkills(userId = 161192) {
  try {
    const { data } = await axios.get(
      `${process.env.API_ENDPOINT}/companies/${process.env.COMPANY_ID}/users/${userId}/skills`,
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    throw new Error("Error getting getUserProfile ");
  }
}
