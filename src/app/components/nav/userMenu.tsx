"use client";

import { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
// import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/components/hooks/useLoginModal";
import useRegisterModal from "@/app/components/hooks/useRegisterModal";

import MenuItem from "./menuItem";
import Avatar from "./Avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import usePostModal from "../hooks/usePostModal";
import useWithdrawModal from "../hooks/useWithdrawModal";
import { ethers } from "ethers";
import tokenAbi from "../../contract/token.json";
interface UserMenuProps {
  currentUser?: SafeUser | null;
}

function UserMenu() {
  const router = useRouter();

  /**Init contract */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const addressToken = "0x3A54a26f812A163113C298090aa35Ef084aE5ad7";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contractToken = new ethers.Contract(addressToken, tokenAbi, provider);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const postModal = usePostModal();
  const withdrawModal = useWithdrawModal();
  const [accounts, setAddress] = useState("");
  const [amountToken, setAmountToken] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onPost = useCallback(() => {
    if (!session?.user) {
      return loginModal.onOpen();
    }

    postModal.onOpen();
  }, [loginModal, postModal, session?.user]);

  /**connect metamask */
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAmountToken(ethers.utils.formatEther(await contractToken.balanceOf(accounts[0])));
      setAddress(accounts[0]);
      withdrawModal.address = accounts[0];
    } else {
      console.log("Metamask is not installed.");
    }
  };

  /**get account when reload app */
  useEffect(() => {
    const reload = async () => {
      if (window.ethereum) {
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setAmountToken(ethers.utils.formatEther(await contractToken.balanceOf(accounts[0])));
          setAddress(accounts[0]);
          withdrawModal.address = accounts[0];
        }
      } else {
        console.log("MetaMask don't install.");
      }
    };
    reload();
  }, []);

  /**Get account when change account */
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (accounts: any) => {
        setAmountToken(ethers.utils.formatEther(await contractToken.balanceOf(accounts[0])));
        setAddress(accounts[0]);
        setAddress(accounts[0]);
        withdrawModal.address = accounts[0];
      });
    } else {
      console.log("MetaMask don't install.");
    }
  }, []);

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
        {!accounts ? (
          <div
            onClick={connectWallet}
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
              cursor-pointer"
          >
            Connect Metamask
          </div>
        ) : (
          <div>
            Connected to {accounts.slice(0, 6)}...
            {accounts.slice(accounts.length - 4)}
          </div>
        )}

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

        <div>Token: {amountToken}</div>
      </div>
      {isOpen && (
        <div
          className="
          z-60
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
                <MenuItem label="My profile" onClick={() => router.push("/trips")} />
                <MenuItem label="Settings" onClick={() => router.push("/favorites")} />
                {/* <MenuItem label={formatAddress(accounts) || "Connect wallet"} onClick={() => connectWallet()} /> */}
                {accounts && <MenuItem label={"Withdraw token"} onClick={withdrawModal.onOpen} />}
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
                <div className="flex flex-col rounded-lg shadow-lg ">
                  <div className="text-pumpkin">
                    <div className="font-pops font-bold ">Reward:</div>
                    <div>{session?.user.data.user.reward}</div>
                  </div>
                  <div className=" text-rose-60">
                    <div className="font-pops font-bold">Token:</div>
                    <div>{withdrawModal.token}</div>
                  </div>
                </div>
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
