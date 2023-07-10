"use client";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "@/app/components/hooks/useRegisterModal";
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
import useLocationModal from "../hooks/useLocationModal";
import { useSession } from "next-auth/react";
import { response } from "express";
const LocationModal = () => {
  const locationModal = useLocationModal();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      city: "",
      address: "",
      minvalue: "",
      maxvalue: "",
      phoneNumber: "",
      images: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // data.append("images", image);
    // console.log(data.images);
    // const imageFile = data.image?.[0];
    // console.log(imageFile);
    // if (!imageFile) {
    //   toast.error("Missing fields");
    //   return;
    // }
    setIsLoading(true);
    axios
      .post("http://localhost:2002/api/v1/locations", data, {
        headers: {
          Authorization: `Bearer ${session?.user?.data.accessToken}`,
        },
      })
      .then(() => {
        locationModal.onClose();
        toast.success("Added a new location!");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleImageChange = (e) => {
    // upload multiple images
    const file = e.target.files[0];

    // upload avatar
    // const file = e.target.files[0];
    setImage(file);
    console.log(image);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Let's add your location"
        subtitle="The information of the location you have been to!"
      />
      <Input
        id="name"
        label="Name of the place"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="address"
        label="Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="city"
        label="City"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="minvalue"
        label="Lowest price (VND)"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="maxvalue"
        label="Hightest price (VND)"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="timestart"
        label="Open time"
        type="time"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="timeend"
        label="Close time"
        type="time"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="phonenumber"
        label="Phone number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="images"
        label="Image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {/* <input type="file" multiple id="image" onChange={handleImageChange} /> */}

      {/* <Input
        id="phoneNumber"
        label="Phone number"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="birthDay"
        label="Day of birth"
        type="date"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> */}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={locationModal.isOpen}
      title="Add a location"
      actionLabel="Create"
      onClose={locationModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default LocationModal;
