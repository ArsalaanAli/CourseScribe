import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Upload from "./upload";
import HeroSection from "~/components/HeroSection";
import AppHeader from "~/components/AppHeader";
import { useSession } from "next-auth/react";
const Home: NextPage = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AppHeader />
        <HeroSection />
      </main>
    </>
  );
};

export default Home;
