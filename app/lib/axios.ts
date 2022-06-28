import axios from "axios";
import getConfig from "next/config";
import { signOut } from "next-auth/react";

const { publicRuntimeConfig } = getConfig();

/**
 * The top-level axios instance
 *
 */
const Axios = axios.create({
  baseURL: publicRuntimeConfig.veteranHost,
  headers: {
    "Accept": "application/json"
  }
});

Axios.interceptors.request.use(async (config) => {
  const { data } = await axios.get(`${publicRuntimeConfig.nextAuthUrl}/api/auth/session`);
  if (data && config.headers && data.accessToken) {
    config.headers.Authorization = `Bearer ${data.accessToken}`;
  }
  return config;
}, undefined, { synchronous: false });

Axios.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  if (401 === error.response.status) {
    await signOut();
  } else {
    return Promise.reject(error);
  }
});

export default Axios;
