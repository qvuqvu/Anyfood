"use client";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Rating from "@mui/material/Rating";
import usePostModal from "../hooks/usePostModal";
import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryBox from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
// import { categoriesList } from "../nav/categories";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/inputs";
import Heading from "../Heading";
import React from "react";
import { useEffect } from "react";
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
}

const PostModal = () => {
  useEffect(() => {
    axios
      .get("http://localhost:2002/api/v1/locations?page=1&limit=5")
      .then((response) => {
        setLocations(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:2002/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const router = useRouter();
  const postModal = usePostModal();
  const [star, setStar] = React.useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      rate: star?.toString(),
      categoryId: "",
      address: "",
      locationId: "",
      images: [],
      title: "",
      content: "",
      tags: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const category = watch("categoryId");
  const location = watch("locationId");
  const images = watch("image");
  // const rate = watch("rate");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  //  const handleLocation = (value: any, address: string) => {
  //     setCustomValue("locationId", value);
  //     setValue("address", item.location.address);
  //   };
  const onBack = () => {
    console.log(step);
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(star);
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("http://localhost:2002/api/v1/posts", data, {
        headers: {
          Authorization: `Bearer ${session?.user?.data.accessToken}`,
        },
      })
      .then(() => {
        toast.success("Post created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        postModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    console.log(step);
    if (step === STEPS.DESCRIPTION) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item: any) => (
          <div key={item.name} className="col-span-1">
            <CategoryBox
              onClick={(category) => setCustomValue("categoryId", category)}
              selected={category === item.id}
              id={item.id}
              label={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        {locations.map((item: any) => (
          <div key={item.location.id} className="col-span-1">
            <CategoryBox
              onClick={(location) => setCustomValue("locationId", location)}
              selected={location === item.location.id}
              id={item.location.id}
              label={item.location.name + item.location.address}
            />
          </div>
        ))}
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Rate the taste of the food"
          subtitle="How good was it"
        />
        <Rating
          className="self-center"
          size="large"
          name="simple-controlled"
          value={star}
          onChange={(event, newValue) => {
            setStar(newValue);
          }}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <Input
          id="images"
          label="Image"
          type="file"
          accept="image/*"
          // onChange={handleImageChange}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="content"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        {fields.map((field, index) => (
          <div key={field.id}>
            <input type="text" {...register(`tags`, { required: true })} />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append("")}>
          Add Tag
        </button>
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={postModal.isOpen}
      title="Post a review"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      SecondActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      onClose={postModal.onClose}
      body={bodyContent}
    />
  );
};

export default PostModal;
