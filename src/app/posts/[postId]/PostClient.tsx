"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
// import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import useLoginModal from "@/app/components/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categoriesList } from "@/app/components/nav/categories";

import ListingHead from "@/app/components/posts/ListingHead";
import ListingInfo from "@/app/components/posts/ListingInfo";
import UserStatus from "@/app/components/UserStatus";
import useDate from "@/app/components/hooks/useDate";
import { useSession } from "next-auth/react";
import Avatar from "@/app/components/nav/Avatar";
import useCommentsStore from "@/app/components/hooks/useComment";

import tokenAbi from "../../contract/token.json";
import { ethers } from "ethers";

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const PostClient: React.FC<ListingClientProps> = ({ listing, reservations = [], currentUser }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const formattedDate = useDate(listing.data.post.createdAt, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  /**Init contract */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addressToken = "0x3A54a26f812A163113C298090aa35Ef084aE5ad7";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const signer = provider.getSigner();
  const contractToken = new ethers.Contract(addressToken, tokenAbi, signer);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  console.log(listing.data.user);
  useEffect(() => {
    axios
      .get(
        `http://localhost:2002/api/v1/posts/${listing.data.post.id}/commentPost?direction=DESC&page=1&limit=5&sortBy=createdAt`
      )
      .then((response) => {
        setComments(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [listing.data.post.id]);

  const deleteComment = async (commentId: string) => {
    try {
      const response = await axios.delete(`http://localhost:2002/api/v1/posts/${commentId}/commentPost`, {
        headers: {
          Authorization: `Bearer ${session?.user?.data.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:2002/api/v1/posts/${listing.data.post.id}/commentPost`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.data.accessToken}`,
          },
        }
      )
      .then(() => {
        setComment("");
        setComments([...comments, response.data.comment]);
      })
      .catch((error) => console.log(error));
  };

  const donate = async () => {
    const amount = ethers.utils.parseUnits("0.1", 18);
    const transaction = await contractToken.transfer(listing.data.user.account, amount);
    // console.log("Giao dịch đang được gửi:", transaction.hash);
    // // Đợi giao dịch được xác nhận
    // await transaction.wait();
    // console.log("Giao dịch thành công:", transaction.hash);
  };

  return (
    <>
      <div
        className="flex max-w-[2520px]
        mt-10
        mx-auto
        laptop:px-28
        tablet:px-14
        mobile:px-4
        px-4 
        gap-4
        "
      >
        {/* POST */}
        <div>
          <div className="">
            <div className="max-w-screen-lg mb-8 mx-auto shadow-lg p-5 border-gray-200 border-[1px] rounded-2xl">
              <div className="flex flex-col gap-6">
                <ListingHead
                  rate={listing.data.post.rate}
                  title={listing.data.post.title}
                  imageSrc={listing.data.post.images[0]}
                  locationValue={listing.data.location[0].name}
                  timePosted={formattedDate}
                  id={listing.id}
                  userName={listing.data.user.lastName + " " + listing.data.user.firstName}
                  currentUser={currentUser}
                />
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                  <ListingInfo tags={listing.data.post.tags} description={listing.data.post.content} />
                </div>
                <div
                  onClick={donate}
                  className="w-28 text-primary bg-secondary border-primary text-sm  font-semibold py-3 px-4 rounded-full hover:bg-pumpkin hover:text-white transition cursor-pointer"
                >
                  Donate
                </div>
                {/* ADD COMMENT */}
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button type="submit" className="bg-primary ml-3 text-white p-4 rounded-xl font-pops">
                    Comment
                  </button>
                </form>

                {/* DONATE */}

                {/* GET COMMENTS */}

                {comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="shadow-lg p-3 border-[1px] border-gray-300 rounded-lg gap-3 flex flex-col w-[50%]">
                      <div className="flex items-center p-4 rounded-t justify-center relative border-b-[1px]">
                        <button className="p-1 border-0 hover:opacity-70 transition absolute right-3">
                          <IoMdClose size={24} onClick={deleteComment} />
                        </button>
                      </div>
                      {/* <div className="text-lg font-pops">{title}</div> */}
                      <div className="flex items-center gap-2">
                        <Avatar />
                        <p className="font-pops font-bold">
                          {comment.user.lastName} {comment.user.firstName}{" "}
                        </p>
                      </div>
                      <p className="">{comment.comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* SIDEBAR */}
        <div className="flex flex-col">
          <UserStatus
            firstName={listing.data.user.firstName}
            lastName={listing.data.user.lastName}
            totalFollowers={listing.data.user.followersCount}
            totalFollowing={listing.data.user.followingCount}
            totalPosts={listing.data.postCountUser}
          />
        </div>
      </div>
    </>
  );
};

export default PostClient;
