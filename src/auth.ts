import axios from "axios";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: `Basic ${Buffer.from(
    `${process.env.APP_ID}:${process.env.APP_SECRET}`
  ).toString("base64")}`,
};
let refreshToken: string;

export async function getToken() {
  try {
    const resp = await axios.get(process.env.TOKEN_ENDPOINT ?? "", {
      headers,
    });
    const { access_token, refresh_token } = resp.data;
    refreshToken = refresh_token;
    console.log("getToken ", access_token, refresh_token);
    return { access_token, refresh_token };
  } catch (e) {
    new Error("Error getting token");
  }
}

export async function getRefreshToken() {
  try {
    const resp = await axios.post(
      `${process.env.TOKEN_ENDPOINT}/refresh`,
      {
        refreshToken,
      },
      {
        headers,
      }
    );
    const { refresh_token } = resp.data;
    console.log("getRefreshToken ", refresh_token);
    return refresh_token;
  } catch (error) {
    throw new Error("Error getting refresh token");
  }
}
