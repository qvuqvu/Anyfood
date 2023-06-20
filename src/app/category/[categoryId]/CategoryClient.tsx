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
import useCommentsStore from "@/app/components/hooks/useComment";

import ListingCard from "@/app/components/posts/ListingCard";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import useCategory from "@/app/components/hooks/useCategory";
interface ListingClientProps {
  listing: any;
  category: string;
}

const CategoryClient: React.FC<ListingClientProps> = ({
  listing,
  category,
}) => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  console.log(listing);
  const categoryName = useCategory();
  return (
    <>
      <div
        className="flex flex-col max-w-[2520px]
        mt-10
        mx-auto
        laptop:px-28
        tablet:px-14
        mobile:px-4
        p-4 
        gap-4
        "
      >
        <div className="flex flex-col gap-2">
          <div className="self-center  text-h1 font-bold border-secondary border-b-2 text-primary font-pops">
            {categoryName.categoryName}
          </div>
          <div className="self-center">
            Total posts: {listing.pagination.total}
          </div>
        </div>

        {listing.data.length === 0 ? (
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

export default CategoryClient;
