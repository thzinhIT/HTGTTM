"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/skeleton-loader";
import { TableSkeleton } from "@/components/skeleton-loader";
import LoadingButton from "@/components/loading-button";
import Loadingform from "@/components/loading-form";

export default function LoadingDemo() {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const triggerPageLoader = () => {
    setIsPageLoading(true);
    setTimeout(() => setIsPageLoading(false), 3000);
  };

  const triggerButtonLoader = () => {
    setIsButtonLoading(true);
    setTimeout(() => setIsButtonLoading(false), 2000);
  };

  const triggerTableLoader = () => {
    setIsTableLoading(true);
    setTimeout(() => setIsTableLoading(false), 2500);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Các loại Loading hiệu ứng
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* PageLoader Demo */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Trang đang tải toàn màn hình
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Hiệu ứng tải trang khi chuyển đổi giữa các trang hoặc xử lý dữ liệu
            lớn
          </p>
          <Button
            onClick={triggerPageLoader}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Xem demo
          </Button>
          {isPageLoading && <PageLoader />}
        </div>

        {/* Button loader demo */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Nút bấm đang tải</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sử dụng cho các nút bấm khi đang xử lý form hoặc gửi dữ liệu
          </p>
          <div className="flex flex-col gap-4">
            <LoadingButton
              isLoading={isButtonLoading}
              onClick={triggerButtonLoader}
              loadingText="Đang xử lý..."
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Bấm để xem demo
            </LoadingButton>

            <div className="flex gap-3 mt-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <Loadingform text="Đang tải" size="sm" />
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <Loadingform text="Đang tải" size="md" />
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <Loadingform text="Đang tải" size="lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Table loader demo */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Skeleton cho bảng dữ liệu
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Hiển thị khung dữ liệu khi đang tải bảng giá hoặc dữ liệu
          </p>
          <Button
            onClick={triggerTableLoader}
            className="w-full bg-blue-600 hover:bg-blue-700 mb-6"
          >
            Xem demo
          </Button>
          {isTableLoading && (
            <div className="scale-[0.4] origin-top-left -ml-20 -mt-10">
              <TableSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
