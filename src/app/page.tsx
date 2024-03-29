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
import { useRouter } from "next/navigation";
import EmptyUserStatus from "./components/EmptyUserStatus";
import CategoryCard from "./components/categories/CategoryCard";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    axios
      .get("http://localhost:2002/api/v1/posts?page=1&limit=20")
      .then((response) => {
        setPosts(response.data.data);
        console.log(posts);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:2002/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data);
        console.log(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const router = useRouter();
  const locationId = "1";
  const handleTest = () => {
    router.push(`/location/${locationId}`);
  };
  return (
    <ClientOnly>
      <Container>
        <div className="flex px-20 pb-5">
          <div className="flex-auto ">
            <div className="hover:scale-105 transition">
              <img
                src="/images/banner.png"
                alt="Moving Image"
                className="rounded-3xl w-full"
              />
            </div>
            <div className="flex gap-3 mt-5">
              {categories.map((category: any) => (
                <CategoryCard key={category.id} data={category} />
              ))}
            </div>

            {/* GREETING */}
            {!session ? null : (
              <div onClick={()=>{
                handleTest()
              }} className="font-pops text-[25px] mt-5 text-primary">
                Hi there, <strong>{session.user.data.user.firstName}!</strong>
              </div>
            )}

            {posts.length === 0 ? (
              <ClientOnly>
                <EmptyState showReset />
              </ClientOnly>
            ) : (
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
            )}
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
                userId={session.user.data.user.id}
              />
            )}

            <div className="rounded-lg py-9">
              <img
                src="/images/bannerside.png"
                alt="Get Token"
                className="rounded-3xl"
              />
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
