"use client";
import getCurrentUser from "@/app/actions/getCurrentUser";
// import getListingById from "@/app/actions/getListingById";
// import getReservations from "@/app/actions/getReservations";
import axios from "axios";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PostClient from "./PostClient"
import { useState, useEffect } from "react";
interface IParams {
  listingId?: string;
}

const PostPage = ({ params }: { params: any }) => {
  const [data, setData] = useState<any>(null);
  const getPostById = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:2002/api/v1/posts/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    const getData=async()=>{
      setData(await getPostById(params.postId));
    }
    getData();
  },[])

  if (!data) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PostClient listing={data}  />
    </ClientOnly>
  );
};

export default PostPage;
