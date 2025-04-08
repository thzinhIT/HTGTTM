"use client";
import React, { useEffect } from "react";
import TableTicket from "./table-ticket";
import { useState } from "react";
import useFetchGetData from "@/hooks/useFecthGetData";
import { set } from "react-hook-form";
const ListTickets = () => {
  const [bike, setBike] = useState();
  const [tram, setTram] = useState();

  const { data, loading, error } = useFetchGetData(
    "http://localhost:3000/api/auth/tickets/getTickets?page=1"
  );

  useEffect(() => {
    if (data) {
      setBike(data.veXeDap);
      setTram(data.veXeDien);
    }
    console.log(data);
  }, [data]);
  return (
    <>
      <div>Quản lý vé thuê xe</div>

      <TableTicket bike={bike} tram={tram} />
    </>
  );
};

export default ListTickets;
