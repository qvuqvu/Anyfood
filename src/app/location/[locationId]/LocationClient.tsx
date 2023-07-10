import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListingClientProps {
  location: any;
}

const LocationClient: React.FC<ListingClientProps> = ({ location }) => {
  console.log("location", location);
  const router = useRouter();
  const handleTotalStars = () => {
    let total = 0;
    for (let i = 0; i < location.data.post?.length; i++) {
      total += Number(location.data.post[i].post.rate);
    }
    return total / location.data.post?.length;
  };
  return (
    <div
      className="flex flex-col max-w-[2520px]
  m-10
  tablet:px-14
  mobile:px-4
  p-2
  gap-4
  rounded-xl
  border-1
border-border_dark
  "
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
            object-fit 
            h-full  
            w-[100px]
            group-hover:scale-110 
            transition
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
          star
          <div className="ml-2">
            <strong>{handleTotalStars()}</strong>/5 rate based on{" "}
            <strong>{location.data.post?.length}</strong> reviews
          </div>
        </div>
        <div>location</div>
      </div>
    </div>
  );
};

export default LocationClient;
