import { connectDB } from '@/utils/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GithubProvider from 'next-auth/providers/github';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRETS!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.JWT_PASSWORD,
  adapter: MongoDBAdapter(connectDB), // mongodb에 user 정보를 저장하기 위해 연결
  // pages: {
  //   signIn: "/auth/signin",
  // },
  // callbacks: {
  //   async session({ session, token }: { session: Session; token: JWT }) {
  //     session.user.username = session.user
  //       ?.name!.split(" ")
  //       .join("")
  //       .toLocaleLowerCase();
  //     session.user.uid = token.sub;
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
