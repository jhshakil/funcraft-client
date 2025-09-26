import HomeProductSection from "@/components/home/HomeProductSection";
import { getAllProduct } from "@/services/ProductService";

type Props = {
  title: string;
  link: string;
  type: "featured" | "recent" | "topRated";
};

const HomeProductSectionWrapper = async ({ title, link, type }: Props) => {
  let query: any = { limit: "10" };

  if (type === "recent") {
    query = { ...query, sortBy: "createdAt", sortOrder: "desc" };
  }
  if (type === "topRated") {
    query = { ...query, sortBy: "rating", sortOrder: "desc" };
  }

  const res = await getAllProduct(query);

  return <HomeProductSection products={res.data} title={title} link={link} />;
};

export default HomeProductSectionWrapper;
