import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  // Configure one or more authentication providers
  /* 
  TODO:
    Find out what providers to use
    Get client ID's for each provider
    Setup redirect link for deployment
    Change redirect URI in discord dev portal
  */
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
