"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className="flex flex-row items-center"
      onClick={() => router.push("/")}
    >
      <Image
        className="cursor-pointer"
        src="/images/logo.png"
        height="50"
        width="50"
        alt="Logo"
      />
      <div className="ml-2 font-pops h5 text-primary font-bold">Any . Food</div>
    </div>
  );
};

export default Logo;
