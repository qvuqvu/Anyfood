"use client";
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
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import Container from "./components/Container";
import { useState, useEffect } from "react";
import ListingCard from "./components/posts/ListingCard";
import axios from "axios";
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2002/api/v1/posts?page=1&limit=10")
      .then((response) => {
        setPosts(response.data.data);
        console.log(posts)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (posts.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            px-24
            pt-24
            grid 
            grid-cols-1 
            mopile:grid-cols-2 
            tablet:grid-cols-3 
            laptop:grid-cols-4
            large:grid-cols-5
            huge:grid-cols-6
            gap-8
          "
        >
          {posts.map((post: any) => (
            <ListingCard
              // currentUser={currentUser}
              key={post.id}
              data={post}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
    // <div className=" overflow-hidden flex flex-col items-center">
    //   {/* <Head>
    //     <title>Anyfood | A blockchain-based review food</title>
    //   </Head> */}
    //   {/* <div className="z-0">
    //     <Navbar />
    //   </div> */}
    //   {/* <div className="">
    //     <Herosection />
    //   </div>
    //   <div className="py-12 mt-[100px]">
    //     <About />
    //   </div>
    //   <div >
    //     <Getstarted />
    //   </div> */}
    // </div>
  );
}
