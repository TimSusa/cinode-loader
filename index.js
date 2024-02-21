import axios from "axios";
import { getToken } from "./auth.js";

// https://api.cinode.com/v0.1/companies/456/absence/types
async function getCompanyCandidates() {
    try {
        const { data } = await axios.get(`${process.env.API_ENDPOINT}/companies/${process.env.COMPANY_ID}`,
            {
                headers: {
                    'Authorization': `Bearer ${(await getToken()).access_token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        console.log('getCompanyCandidates ', data);
    } catch (error) {
        throw new Error('Error getting company candidates ', error)
    }
}
await getCompanyCandidates();
