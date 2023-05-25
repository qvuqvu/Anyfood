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
import UserStatus from "./components/UserStatus";
import { useSession } from "next-auth/react";
import EmptyUserStatus from "./components/EmptyUserStatus";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    axios
      .get("http://localhost:2002/api/v1/posts?page=1&limit=10")
      .then((response) => {
        setPosts(response.data.data);
        console.log(posts);
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
        <div className="flex px-20 pb-5">
          <div className="flex-auto">
            <div className="rounded-lg mt-5">
              <img src="/images/banner.png" alt="Moving Image" className="rounded-3xl w-11/12" />
            </div>
            {/* GREETING */}
            {!session ? null : (
              <div className="font-pops text-[25px] mt-5 text-primary">
                Hi there, <strong>{session.user.data.user.firstName}!</strong>
              </div>
            )}
            <div
              className=" 
            mt-9
            grid 
            grid-cols-1 
            mopile:grid-cols-1 
            tablet:grid-cols-2 
            laptop:grid-cols-3
            large:grid-cols-4
            huge:grid-cols-5
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
          </div>
          <div className="px-10">
            {!session ? (
              <EmptyUserStatus />
            ) : (
              <UserStatus
                firstName={session.user.data.user.firstName}
                lastName={session.user.data.user.lastName}
                totalPosts={session.user.data.totalPost}
                totalFollowers={session.user.data.user.followersCount}
                totalFollowing={session.user.data.user.followingCount}
              />
            )}

            <div className="rounded-lg py-9">
              <img src="/images/bannerside.png" alt="Get Token" className="rounded-3xl" />
            </div>
          </div>
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
