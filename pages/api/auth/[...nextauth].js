import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "162472437137-a6lmosggct31h1dud6anq74kd5qlq2hd.apps.googleusercontent.com",
      clientSecret: "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",
      callbackUrl:"https://staging.aranya.com.bd/api/auth/callback/google"
    }),
    FacebookProvider({
      clientId: "640097878150658",
      clientSecret: "9c000f545dd51181be200180bf0e408e",
      callbackUrl:"https://staging.aranya.com.bd/api/auth/callback/facebook"
    }),
  ],
  secret: "asdfasdfasfasdfhjskdhfsfjsdjfssidf",
};
export default NextAuth(authOptions);
