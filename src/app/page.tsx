import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import LinkButton from "./components/buttons/LinkButton";
import Navbar from "./sections/navbar";
import Herosection from "./sections/herosection/herosection";
import About from "./sections/aboutsection/About";
import Getstarted from "./sections/stepssection/Getstarted";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className=" overflow-hidden flex flex-col items-center">
      {/* <Head>
        <title>Anyfood | A blockchain-based review food</title>
      </Head> */}
      {/* <div className="z-0">
        <Navbar />
      </div> */}
      <div className="">
        <Herosection />
      </div>
      <div className="py-12 mt-[100px]">
        <About />
      </div>
      <div >
        <Getstarted />
      </div>
    </div>
  );
}
