"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../components/buttons/button";
import LinkButton from "../components/buttons/LinkButton";
import useScrollPosition from "../components/hooks/useScrollPosition";
import UserMenu from "../components/nav/userMenu";
import Container from "../components/Container";
import Categories from "../components/nav/categories";
import Image from "next/image";
import Logo from "../components/nav/Logo";

function Navbar() {
  const scrollY = useScrollPosition();
  const router = useRouter();

  return (
    <div className="z-50 w-full bg-white shadow-sm overflow-hidden">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <Logo />

          <div className="hidden tablet:block">
            {/* <ul className=" flex gap-2">
              <li>
                <LinkButton path="/about">About us</LinkButton>
              </li>
              <li>
                <LinkButton path="/explore">Explore</LinkButton>
              </li>
              <li>
                <LinkButton path="/community">Community</LinkButton>
              </li>
            </ul> */}
          </div>
          <div
            className=" flex 
            flex-row 
            items-center 
            justify-between
            gap-2
            md:gap-0"
          >
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
      <div
        className="w-screen
      "
      >
        <img src="/images/bg.png" alt="Moving Image" className="w-full" />
      </div>
    </div>
  );
}

export default Navbar;
