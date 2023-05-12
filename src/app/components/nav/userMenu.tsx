"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
// import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/components/hooks/useLoginModal";
import useRegisterModal from "@/app/components/hooks/useRegisterModal";

import MenuItem from "./menuItem";
import Avatar from "./Avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import usePostModal from "../hooks/usePostModal";
interface UserMenuProps {
  currentUser?: SafeUser | null;
}

function UserMenu() {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const postModal = usePostModal();

  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  console.log({ session });
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onPost = useCallback(() => {
    if (!session?.user) {
      return loginModal.onOpen();
    }

    postModal.onOpen();
  }, [loginModal, postModal, session?.user]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      // setAddress(accounts[0]);
      // setAccounts(accounts[0]);
    } else {
      console.log("Metamask is not installed.");
    }
  };
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onPost}
          className="
           text-primary
           bg-secondary
           border-primary
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-pumpkin
            hover:text-white
            transition 
            cursor-pointer
          "
        >
          Post a review
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu color="#1D3E9C" />
          {/* <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div> */}
        </div>
      </div>
      {isOpen && (
        <div
          className="
          z-50
            absolute 
            rounded-xl 
            shadow-md
            w-[10vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {session?.user ? (
              <>
                <MenuItem
                  label="My profile"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="Settings"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="Connect wallet"
                  onClick={() => connectWallet()}
                />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Log in" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
