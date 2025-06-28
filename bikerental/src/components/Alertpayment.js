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
import { useState, useEffect } from "react";
import usePostData from "@/hooks/useFetchPostData";
import { Button } from "@/components/ui/button";

export function AlertPayment(props) {
  const { open, setOpen, name, url, data } = props;

  const { postData, loading, error, response } = usePostData();

  useEffect(() => {
    // Close dialog on successful response or error
    if (response || error) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [response, error, setOpen]);

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
          <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            className={"bg-blue-500"}
            onClick={() => {
              handleClick();
            }}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang xử lý...</span>
              </div>
            ) : (
              "Thanh Toán"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
