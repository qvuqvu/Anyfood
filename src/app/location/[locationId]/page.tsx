"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import LocationClient from "./LocationClient";
const LocationPage = ({ params }: { params: any }) => {
  const [data, setData] = useState<any>(null);

  const getLocation = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:2002/api/v1/locations/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setData(await getLocation(params.locationId));
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
      <LocationClient location={data} />
    </ClientOnly>
  );
};

export default LocationPage;
