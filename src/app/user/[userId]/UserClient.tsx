"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
// import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import useLoginModal from "@/app/components/hooks/useLoginModal";

import Container from "@/app/components/Container";
import { categoriesList } from "@/app/components/nav/categories";

import ListingHead from "@/app/components/posts/ListingHead";
import ListingInfo from "@/app/components/posts/ListingInfo";
import UserStatus from "@/app/components/UserStatus";
import useDate from "@/app/components/hooks/useDate";
import { useSession } from "next-auth/react";
import Avatar from "@/app/components/nav/Avatar";
// import useCommentsStore from "@/app/components/hooks/useComment";
import { BsPersonPlus } from "react-icons/bs";
import { BsPersonDashFill } from "react-icons/bs";
import ListingCard from "@/app/components/posts/ListingCard";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import useCategory from "@/app/components/hooks/useCategory";
import Button from "@/app/components/buttons/Button1";
import ListingLocation from "@/app/components/location/ListingLocation";
interface ListingClientProps {
  listing: any;
  location: any;
  user: any;
  id: string;
}

const UserClient: React.FC<ListingClientProps> = ({
  listing,
  location,
  user,
  id,
}) => {
  const { data: session } = useSession();
  const [followed, setFollow] = useState(false);
  const [currentTab, setCurrentTab] = useState("posts");
  const onSubmit = () => {
    handleFollow(id);
  };
  const handleFollow = async (id: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:2002/api/v1/user/${id}/follow`,
        id,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.data.accessToken}`,
          },
        }
      );
      return response.data && setFollow(!followed);
    } catch (error) {
      console.error(error);
      toast.success("Something went wrong.");
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center max-w-[2520px]
        mt-10
        mx-auto
        tablet:px-14
        mobile:px-4
        p-4 
        gap-4
        "
      >
        <div className="flex flex-col gap-5  ">
          <div className="self-center  text-h1 font-bold border-secondary border-b-2 text-primary font-pops">
            {user?.data?.data?.firstName} {user?.data?.data?.lastName}
          </div>
          {followed ? (
            <Button
              label="Unfollow"
              icon={BsPersonDashFill}
              onClick={onSubmit}
              outline
            />
          ) : (
            <Button label="Follow" icon={BsPersonPlus} onClick={onSubmit} />
          )}

          <div className="self-center flex gap-4">
            <div className="flex flex-col items-center">
              <div className="text-bold font-pops">{user?.data?.totalPost}</div>
              <div className="text-normal text-gray-500"> Posts</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-bold font-pops">
                {user?.data?.data?.followersCount}
              </div>
              <div className="text-normal text-gray-500"> Followers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-bold font-pops">
                {user?.data?.data?.followingCount}
              </div>
              <div className="text-normal text-gray-500"> Following</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div
            onClick={() => setCurrentTab("posts")}
            className={`text-h5 font-bold ${
              currentTab === "posts" ? "border-secondary" : ""
            } border-b-2 text-primary font-pops cursor-pointer`}
          >
            Posts
          </div>
          <div
            onClick={() => setCurrentTab("address")}
            className={`text-h5 font-bold ${
              currentTab === "address" ? "border-secondary" : ""
            } border-b-2 text-primary font-pops cursor-pointer`}
          >
            Address
          </div>
        </div>
        {currentTab === "posts" ? (
          listing.data.length === 0 ? (
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
              {listing.data.map((post: any) => (
                <ListingCard
                  // currentUser={currentUser}
                  key={post.id}
                  data={post}
                />
              ))}
            </div>
          )
        ) : (
          location.data.length === 0 ? (
            <ClientOnly>
              <EmptyState showReset />
            </ClientOnly>
          ) : (<div
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
            {location.data.map((location: any) => (
              <ListingLocation
                // currentUser={currentUser}
                key={location.id}
                data={location}
              />
            ))}
          </div>
        )
        )}
        {/* SIDEBAR */}
        {/* <div className="flex flex-col">
          <UserStatus
            firstName={listing.user.firstName}
            lastName={listing.user.lastName}
            totalFollowers={listing.user.followersCount}
            totalFollowing={listing.user.followingCount}
            totalPosts={listing.user.postCountUser}
          />
        </div> */}
      </div>
    </>
  );
};

export default UserClient;
