"use client";
import React, { useEffect, useState } from "react";
import TableCard from "./table-card";
import { useSearchParams } from "next/navigation";
import { IoAddCircleSharp } from "react-icons/io5";
import { ModalCreateCard } from "./modal-create-card";
import { ModalDeleteCard } from "./modal-delete-card";
import { ModalUpdateCard } from "./modal-update-user";
const ListCard = () => {
  const [cards, setCards] = useState();
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [dataDelete, setDataDelete] = useState();
  const [dataUpdate, setDataUpdate] = useState();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const fecthCard = async () => {
    const res = await fetch(
      `http://localhost:3000/api/auth/card/getCards?page=${currentPage}`
    );
    const data = await res.json();
    setCards(data.cards);
  };
  useEffect(() => console.log(console.log(cards)), [cards]);

  useEffect(() => {
    fecthCard();
  }, [currentPage]);
  const handleOnClickCreateCard = () => {
    setIsOpenModalCreate(true);
  };
  const handleOnClickDeleteCard = (item) => {
    setDataDelete(item);
    setIsOpenModalDelete(true);
  };
  const handleOnClickUpdateCard = (item) => {
    setDataUpdate(item);
    setIsOpenModalUpdate(true);
  };
  return (
    <>
      <div className="text-center text-2xl">Bảng quản lý Thẻ xe</div>
      <button
        className=" ml-auto mr-2 cursor-pointer bg-blue-600 block flex items-center justify-between gap-2 mb-4 py-3 px-2 rounded-md text-white hover:bg-blue-700 transition duration-200 ease-in-out"
        onClick={() => handleOnClickCreateCard()}
      >
        <IoAddCircleSharp className="text-green-500 text-xl" />
        <h4>Thêm thẻ mới</h4>
      </button>
      <TableCard
        cards={cards}
        handleOnClickDeleteCard={handleOnClickDeleteCard}
        handleOnClickUpdateCard={handleOnClickUpdateCard}
      />
      <ModalCreateCard
        open={isOpenModalCreate}
        setIsOpenModalCreate={setIsOpenModalCreate}
        fecthCard={fecthCard}
      />
      {isOpenModalDelete && (
        <ModalDeleteCard
          open={isOpenModalDelete}
          setIsOpenModalDelete={setIsOpenModalDelete}
          dataDelete={dataDelete}
          fecthCard={fecthCard}
        />
      )}
      {isOpenModalUpdate && (
        <ModalUpdateCard
          open={isOpenModalUpdate}
          setIsOpenModalUpdate={setIsOpenModalUpdate}
          dataUpdate={dataUpdate}
          fecthCard={fecthCard}
        />
      )}
    </>
  );
};

export default ListCard;
