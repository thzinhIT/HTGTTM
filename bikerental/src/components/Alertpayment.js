import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import usePostData from "@/hooks/useFetchPostData";
import { Button } from "@/components/ui/button";

export function AlertPayment(props) {
  const { open, setOpen, name, url, data } = props;

  const { postData, loading, error, response } = usePostData();
  const handleClick = () => {
    postData(url, data);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn chắc chắn muốn thanh toán {name} chớ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Việc Thanh toán này sẽ được gửi về gmail của bạn . Bạn hãy chờ
            nhé!!!!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={"bg-blue-500"}
            onClick={() => {
              handleClick();
            }}
          >
            Thanh Toán
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
