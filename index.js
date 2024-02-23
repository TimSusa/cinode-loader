import axios from "axios";
import { getToken } from "./auth.js";

const headers = {
    'Authorization': `Bearer ${(await getToken()).access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export async function getUsers() {
    try {
        const { data } = await axios.get(`${process.env.API_ENDPOINT}/companies/${process.env.COMPANY_ID}/users`,
            {
                headers
            });
        console.log('getUsers ', data);
    } catch (error) {
        throw new Error('Error getting company candidates ', error)
    }
}



export async function getResumes() {
    try {
        const { data } = await axios.get(`${process.env.API_ENDPOINT}/companies/${process.env.COMPANY_ID}/resumes`,
            {
                headers
            });
        console.log('getResumes ', JSON.stringify(data, null, 2));
    } catch (error) {
        throw new Error('Error getting company candidates ', error)
    }
}



export async function getUserResume(userId = 161192, resumeId = 276675) {
    try {
        const { data } = await axios.get(`${process.env.API_ENDPOINT}/companies/${process.env.COMPANY_ID}/users/${userId}/resumes/${resumeId}`,
            {
                headers
            });
        console.log('getUserResume ', JSON.stringify(data, null, 2));
    } catch (error) {
        throw new Error('Error getting company candidates ', error)
    }
}


await getUserResume();
