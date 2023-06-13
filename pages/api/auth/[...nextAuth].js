import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "162472437137-a6lmosggct31h1dud6anq74kd5qlq2hd.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: "asdfasdfasfasdfhjskdhfsfjsdjfssidf",
};
export default NextAuth(authOptions);
