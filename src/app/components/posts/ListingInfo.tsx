"use client";

interface ListingInfoProps {
  description: string;
  tags: string[];
}

const ListingInfo: React.FC<ListingInfoProps> = ({ description, tags }) => {
  return (
    <div className="col-span-2 flex flex-col gap-8">
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="px-2 py-1 bg-pumpkin rounded-full text-sm font-medium text-white"
          >
            #{tag}
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default ListingInfo;
