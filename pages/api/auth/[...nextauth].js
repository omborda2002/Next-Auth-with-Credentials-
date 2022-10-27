import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../utils/dbConnect";
import Users from "../../../models/users";
import { verifyPassword } from "../../../utils/auth";
import jwt from "jsonwebtoken";

export default NextAuth({
  //Configure JWT
  session: {
    jwt: true,
  },
  //Specify Provider
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "signin",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        await dbConnect();

        const user = await Users.findOne({ email });
        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Email or password is not valid");
        }
        return {
          message: "You are now logged in!",
          email: user.email,
          id: user._id,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const encodedToken = jwt.sign(token, process.env.NEXTAUTH_SECRET, {
        algorithm: "HS256",
      });
      session.user.id = token.id || token.sub;
      session.token = encodedToken;
      return Promise.resolve(session);
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const isUserSignedIn = user ? true : false;

      if (isUserSignedIn) {
        token.id = user.id.toString();
      }
      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: "/signin",
    signup: "/signup",
  },
});
