"use client";
import getCurrentUser from "@/app/actions/getCurrentUser";
// import getListingById from "@/app/actions/getListingById";
// import getReservations from "@/app/actions/getReservations";
import axios from "axios";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import PostClient from "./UserClient";
import { useState, useEffect } from "react";
import UserClient from "./UserClient";
import { useSession } from "next-auth/react";
const UserPage = ({ params }: { params: any }) => {
  const [data, setData] = useState<any>(null);
  const [dataUser, setDataUser] = useState<any>(null);
  const [dataLocation, setDataLocation] = useState<any>(null);
  const getUserPost = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:2002/api/v1/posts/user/post/${id}?page=1&limit=5`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getUser = async (param: string) => {
    try {
      const response = await axios.get(
        `http://localhost:2002/api/v1/user/${param}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const { data: session } = useSession();
  const getAllLocationByUser = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:2002/api/v1/locations/user?page=1&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.data.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setDataUser(await getUser(params.userId));
      setData(await getUserPost(params.userId));
      setDataLocation(await getAllLocationByUser(params.userId));
    };
    getData();
  }, []);

  if (!data) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <UserClient listing={data} user={dataUser} id={params.userId} location={dataLocation} />
    </ClientOnly>
  );
};

export default UserPage;
