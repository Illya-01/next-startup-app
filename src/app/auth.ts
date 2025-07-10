import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          id: profile?.sub,
        });

      if (!existingUser) {
        // Google does not provide a username
        const emailUsername =
          email?.split("@")[0].replace(/[^a-zA-Z0-9]/g, "") || "";

        await writeClient.create({
          _type: "author",
          id: profile?.sub,
          name,
          username: emailUsername,
          email,
          image,
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            id: profile?.sub,
          });

        token.sub = user?._id;
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.sub });
      return session;
    },
  },
});
