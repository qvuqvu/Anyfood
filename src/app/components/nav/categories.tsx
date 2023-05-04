import Container from "../Container";
import { usePathname, useSearchParams } from 'next/navigation';
import CategoryBox from "./categoryBox";
export const categoriesList = [
  {
    label: "Ăn sáng",

    description: "This property is close to the beach!",
  },
  {
    label: "Ăn trưa",

    description: "This property is has windmills!",
  },
  {
    label: "Ăn vặt",

    description: "This property is modern!",
  },
  {
    label: "Cà phê",

    description: "This property is in the countryside!",
  },
  {
    label: "Làm đẹp",

    description: "This property is in the countryside!",
  },
];
const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
            pt-4
            flex 
            flex-row 
            items-center 
            justify-between
            overflow-x-auto
          "
      >
        {categoriesList.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
