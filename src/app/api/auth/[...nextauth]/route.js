import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db.js";
import * as bcrypt from "bcrypt";

async function findUser(findEmail) {
  try {
    const userFound = await db.user.findUnique({
      where: { email: findEmail },
    });
    if (!userFound) {
      console.log("No se encontró el usuario en la BD", userFound.email);
      return false;
    } else {
      console.log("El usuario encontrado en la BD es: ", userFound.email);
      return userFound;
    }
  } catch (error) {
    console.log("El error de encontrar al usuario en BD es:", { error });
    return false;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "mail@mail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },

      async authorize(credentials, req) {
        const userFound = await findUser(credentials.email);

        if (userFound) {
          const matchPass = await bcrypt.compare(
            credentials.password,
            userFound.password
          );

          if (!matchPass) throw new Error("Password is incorrect");

          return {
            id: userFound.id,
            name: userFound.username,
            email: userFound.email,
          };
        } else {
          //console.log("No se encontró usuario en BD authorize.");
          throw new Error("User not found!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
