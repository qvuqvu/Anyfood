"use client";
import useLoginModal from "../hooks/useLoginModal";
import useWithdrawModal from "@/app/components/hooks/useWithdrawModal";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Input from "../inputs/inputs";
import Heading from "../Heading";
import Button from "../buttons/Button1";
import { useSession } from "next-auth/react";
import { response } from "express";
const WithdrawModal = () => {
  const withdrawModal = useWithdrawModal();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      amount: "",
      address: "0x732dDAEB58e292de16A3e1515C0908E76A578415",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("hi");
    setIsLoading(true);

    axios
      .patch(
        "http://localhost:2002/api/v1/token",
        { account: withdrawModal.address },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.data.accessToken}`,
          },
        }
      )
      .then(() => {})
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axios
      .post("http://localhost:2002/api/v1/token/withdraw", data, {
        headers: {
          Authorization: `Bearer ${session?.user?.data.accessToken}`,
        },
      })
      .then(() => {
        toast.success("Registered!");
        withdrawModal.onClose();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    axios
      .post(
        "http://localhost:2002/api/v1/token",
        { address: withdrawModal.address },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.data.accessToken}`,
          },
        }
      )
      .then(() => {
        // withdrawModal.token = response.data;
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Your adddress" subtitle="Defaut wallet address" />
      <Input id="address" label="address" disabled register={register} errors={errors} required />
      <Heading title="Withdraw token" subtitle="Please enter the exact amount to withdraw" />
      <Input id="amount" label="Amount" disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        // onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        // onClick={() => signIn("github")}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={withdrawModal.isOpen}
      title="withdraw"
      actionLabel="Withdraw"
      onClose={withdrawModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default WithdrawModal;
