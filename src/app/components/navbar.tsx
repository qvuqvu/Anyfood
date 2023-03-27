import React from "react";
import LinkButton from "./buttons/LinkButton";

function Navbar() {
  return (
    <div className="w-full flex justify-center mb-28 tablet:mb-36 relative z-40">
      <ul className="flex">
        <li>
          <LinkButton path="/">Home</LinkButton>
        </li>
        <li>
          <LinkButton path="/about">About us</LinkButton>
        </li>
        <li>
          <LinkButton path="/explore">Explore</LinkButton>
        </li>
        <li>
          <LinkButton path="/community">Community</LinkButton>
        </li>
      </ul>
      <div className="justify-center h-10 hidden tablet:flex">
        {/*categories*/}
      </div>
    </div>
  );
}

export default Navbar;
