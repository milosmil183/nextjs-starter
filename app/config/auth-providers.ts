import CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";
import Axios from "../lib/axios";

const providers: Provider[] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      if (!credentials) return null;
      const { data } = await Axios.post("/auth/login", credentials);
      if (data?.accessToken) {
        return { access_token: data.accessToken };
      }
      return null;
    }
  }),
  {
    id: "veteran",
    name: "Veteran",
    type: "oauth",
    wellKnown: process.env.VA_OPENID_CONNECT,
    authorization: { params: { scope: "openid email profile disability_rating.read claim.read claim.write service_history.read veteran_status.read" } },
    idToken: true,
    clientId: process.env.VA_CLIENT_ID,
    clientSecret: process.env.VA_CLIENT_SECRET,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture
      };
    }
  }
];

export default providers;
