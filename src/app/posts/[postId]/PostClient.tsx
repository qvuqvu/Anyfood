"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
// import { Range } from "react-date-range";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/components/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categoriesList } from "@/app/components/nav/categories";

import ListingHead from "@/app/components/posts/ListingHead";
import ListingInfo from "@/app/components/posts/ListingInfo";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const PostClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  console.log("listing:", listing);
  const [isLoading, setIsLoading] = useState(false);
  console.log(listing.data.location[0].name);
  return (
    <>
      <div
        className="max-w-[2520px]
        mx-auto
        laptop:px-20 
        tablet:px-10
        mobile:px-2
        px-4
      "
      >
        <div
          className="
          max-w-screen-lg 
          mx-auto
        "
        >
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.data.post.title}
              imageSrc={listing.data.post.images[0]}
              locationValue={listing.data.location[0].name}
              id={listing.id}
              currentUser={currentUser}
            />
            <div
              className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
            >
              <ListingInfo
                userName={
                  listing.data.user.lastName + " " + listing.data.user.firstName
                }
                category={listing}
                description={listing.data.post.content}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
              {/* <div 
              className="
                order-first   
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
          
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostClient;
