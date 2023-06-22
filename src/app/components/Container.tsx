"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
      flex
      flex-row
      items-center
      w-auto
        justify-around
        mx-auto
        xl:px-5 
        md:px-10
        sm:px-2
        px-4
      "
    >
      {children}
    </div>
  );
};

export default Container;
