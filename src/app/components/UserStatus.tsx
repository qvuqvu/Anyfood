import React from "react";
import Avatar from "./nav/Avatar";
import { useRouter } from "next/navigation";
interface UserStatusProps {
  lastName: string;
  firstName: string;
  avatar?: string;
  totalPosts?: number;
  totalFollowers?: number;
  totalFollowing?: number;
  userId: string;
}

const UserStatus: React.FC<UserStatusProps> = ({
  lastName,
  firstName,
  avatar,
  totalPosts,
  totalFollowers,
  totalFollowing,
  userId,
}) => {
  const router = useRouter();
  const handleAction = () => {
    router.push(`/user/${userId}`);
  };
  return (
    <div className="flex flex-col gap-3 shadow-lg border-gray-200 border-[1px] px-6 py-8 rounded-xl">
      <div onClick={handleAction} className="flex gap-4 cursor-pointer">
        <Avatar />
        <div className="text-bold font-pops text-primary h1">
          {lastName} {firstName}{" "}
        </div>
      </div>
      <hr />
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="text-bold font-pops">{totalPosts}</div>
          <div className="text-normal text-gray-500"> Posts</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-bold font-pops">{totalFollowers}</div>
          <div className="text-normal text-gray-500"> Followers</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-bold font-pops">{totalFollowing}</div>
          <div className="text-normal text-gray-500"> Following</div>
        </div>
      </div>
    </div>
  );
};

export default UserStatus;
