"use client";
import getCurrentUser from "@/app/actions/getCurrentUser";
// import getListingById from "@/app/actions/getListingById";
// import getReservations from "@/app/actions/getReservations";
import axios from "axios";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PostClient from "./CategoryClient";
import { useState, useEffect } from "react";
import CategoryClient from "./CategoryClient";

const CategoryPage = ({ params }: { params: any }) => {
  const [data, setData] = useState<any>(null);
  const getPostByCategory = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:2002/api/v1/posts/${id}/categories?page=1&limit=5`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setData(await getPostByCategory(params.categoryId));
    };
    getData();
  }, []);

  console.log(params);

  if (!data) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <CategoryClient category={params.categoryId} listing={data} />
    </ClientOnly>
  );
};

export default CategoryPage;
