import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Avatar from "@/app/components/nav/Avatar";

interface ListingClientProps {
  location: any;
}

const LocationClient: React.FC<ListingClientProps> = ({ location }) => {
  const router = useRouter();
  const [dataPost, setDataPost] = useState<any>(location.data.post);
  const handleTotalStars = () => {
    let total = 0;
    for (let i = 0; i < location.data.post?.length; i++) {
      total += Number(location.data.post[i].post.rate);
    }
    return (total / location.data.post?.length).toFixed(1);
  };
  const formatTime = (time: any) => {
    const date = new Date(time);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  return (
    <div className="max-w-[2520px] m-10">
      <div
        className="flex flex-col 
  p-2
  py-4
  tablet:px-10
  mobile:px-4
  gap-4
  rounded-xl
  border-1
border-border_dark
bg-gray-100"
      >
        <div>
          <div className="flex flex-row w-full h-[100px]  rounded-xl">
            <div
              className="
            aspect-square 
            w-[100px] 
            relative 
            overflow-hidden 
            rounded-xl
          "
            >
              <Image
                fill
                className="
            object-cover 
            h-full  
            w-[100px]
            hover:scale-110 
            transition
            duration-500
            ease-in-out
            transform
            "
                src={location.data.location?.images[0]}
                alt="Listing"
              />
            </div>
            <div className="font-semibold text-h2 px-10 line-clamp-2">
              {location.data.location?.name}
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-star-filled"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="orange"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
                stroke-width="0"
                fill="orange"
              ></path>
            </svg>
            <div className="ml-2">
              <strong>{handleTotalStars()}</strong>/5{" ( "}
              <strong>{location.data.post?.length}</strong> reviews {")"}
            </div>
          </div>
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-map-pin-filled"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="orange"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
                stroke-width="0"
                fill="orange"
              ></path>
            </svg>
            <div className="ml-2">
              Address: {location.data.location?.address}
            </div>
          </div>
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-phone"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="orange"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
            </svg>
            <div className="ml-2">
              Phone Number: {location.data.location?.phonenumber}
            </div>
          </div>
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-cash"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="orange"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
              <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
              <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path>
            </svg>
            <div className="ml-2">
              Price: {location.data.location?.minvalue}k -{" "}
              {location.data.location?.maxvalue}k
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-row items-center justify-between">
        <div
          className="
        cursor-pointer
        text-gray-500
        hover:text-gray-900
        "
        >
          <strong>
            Reivew from customer {"( "}
            {location.data.post?.length}
            {" )"}
          </strong>
        </div>
        <div className="flex flex-row items-center">
          Filter:
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-filter ml-2 cursor-pointer"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"></path>
          </svg>
        </div>
      </div>

      {dataPost?.map((item: any) => (
        <div className="mt-5">
          <div
            onClick={() => router.push(`/posts/${item.post.id}`)}
            className="
        bg-gray-100
        rounded-xl
        hover:bg-white 
        shadow-md
        p-2
        tablet:p-4
        mobile:p-2
        cursor-pointer
        "
          >
            <div className="flex flex-row items-center">
              <Avatar src={item.user?.avatar} />
              <div className="ml-2">
                <strong>
                  {item.user?.firstName} {item.user?.lastName} {" - "}{" "}
                  {formatTime(item.post?.createdAt)}
                </strong>
              </div>
            </div>
            <div className="flex flex-row items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-star-filled"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="orange"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
                  stroke-width="0"
                  fill="orange"
                ></path>
              </svg>
              <div className="ml-2">
                <strong>{item.post?.rate}</strong> / 5 score
              </div>
            </div>
            <div className="ml-2">
              <strong> {item.post?.address}</strong>
            </div>
            <div className="ml-2">{item.post?.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationClient;
