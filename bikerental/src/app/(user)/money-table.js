import React from "react";
import { useState, useEffect } from "react";
import useFetchGetData from "@/hooks/useFecthGetData";
import { FaArrowAltCircleRight } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertPayment } from "@/components/Alertpayment";
import DialogCount from "@/components/dialog-count";
const MoneyTable = (props) => {
  const { token } = props;
  const [price, setPrice] = useState();
  const [open, setOpen] = useState(false);
  const [postUrl, setPostUrl] = useState(``);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const urlPrice = "http://localhost:3000/api/auth/price/getPrice";
  const {
    data: priceList,
    loading,
    error: priceError,
  } = useFetchGetData(urlPrice);
  useEffect(() => {
    if (priceList) {
      setPrice(priceList.price);
    }
  }, [priceList]);

  const handleOnClickId = (item) => {
    setOpen(true);
    setId(item.id);
    console.log("id", id);
    console.log("item", postUrl);
  };
  useEffect(() => {
    if (id) {
      setPostUrl(`http://localhost:3000/api/auth/update-points?id=${id}`);
    }
  }, [id]);

  return (
    <div className="p-10">
      <div className="w-[1320px] mx-auto px-10">
        <h2 className=" text-blue-700 text-4xl my-9 font-bold text-center">
          {" "}
          Bạn đang thiếu điểm đúng ko ?
        </h2>

        <div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">STT</TableHead>
                <TableHead className={"text-end"}>Số tiền</TableHead>
                <TableHead></TableHead>
                <TableHead className={"text-end"}>Điểm TNGO</TableHead>
                <TableHead className="text-end">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {price && price?.length > 0 ? (
                price?.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className={"text-end"}>
                      <img
                        src={item.imgMoney}
                        className="max-h-[100px] min-w-[230px] ml-auto"
                        alt="ảnh tiền"
                      />
                    </TableCell>
                    <TableCell className={""}>
                      <div className="">
                        <FaArrowAltCircleRight className=" block text-xl text-blue-500 ml-auto " />
                      </div>
                    </TableCell>

                    <TableCell className={"text-end"}>
                      {" "}
                      {item.diem_tngo}
                    </TableCell>
                    <TableCell className="text-end">
                      {token ? (
                        <button
                          className="py-3 px-3 bg-blue-500 rounded-xl text-white hover:bg-blue-800 transition duration-200 ease-in-out cursor-pointer"
                          onClick={() => {
                            handleOnClickId(item);
                          }}
                        >
                          Mua ngay!!!
                        </button>
                      ) : (
                        <button className="py-3 px-3 bg-blue-500 rounded-xl text-white hover:bg-blue-800 transition duration-200 ease-in-out cursor-pointer">
                          đăng nhập để mua
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="font-medium col-span-4 text-xl text-gray-300 text-center uppercase">
                    ko có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {id && (
        <DialogCount
          open={open}
          setOpen={setOpen}
          name={name}
          postUrl={postUrl}
        />
      )}
    </div>
  );
};

export default MoneyTable;
