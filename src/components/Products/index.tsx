"use client";

import { useState } from "react";
import { Grid, List } from "react-feather";
import FilterSidebar from "./FilterSidebar";
import CommonHeader from "../common/CommonHeader";
import {
  filterBrandItems,
  filterCateogryItems,
  filterPriceItems,
} from "@/data/ProductData";

import Image from "next/image";

export default function AllProducts() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <section>
      <CommonHeader
        title="All"
        subtitle="Products"
        componentTitle="All Products"
      />
      <div className="py-16 px-4 md:px-12 bg-[#F2F4F8]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 shrink-0">
              <FilterSidebar options={filterCateogryItems} label="Categories" />
              <FilterSidebar
                options={filterBrandItems}
                label="Brand"
                customClasses="mt-4"
              />
              <FilterSidebar
                options={filterPriceItems}
                label="Price"
                customClasses="mt-4"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-gray-600">
                    Show
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-start justify-start md:justify-center md:items-center gap-2">
                  <div className="flex justify-center items-center gap-2 mr-4">
                    <p className="text-base font-semibold text-gray-600">
                      Sort by
                    </p>
                  </div>

                  <div className="flex flex-row justify-between items-center gap-2">
                    <p className="text-base font-semibold text-gray-600">
                      View as
                    </p>
                    <div className="flex border border-gray-200 rounded-md">
                      <button
                        role="button"
                        tabIndex={0}
                        className={`p-3 cursor-pointer ${
                          viewMode === "grid" ? "bg-gray-100" : ""
                        }`}
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid
                          size={18}
                          className={
                            viewMode === "grid" ? "text-brand" : undefined
                          } // error solve rendering undefined local string or boolean
                        />
                      </button>
                      <button
                        role="button"
                        tabIndex={0}
                        className={`p-1.5 cursor-pointer ${
                          viewMode === "list" ? "bg-gray-100" : ""
                        }`}
                        onClick={() => setViewMode("list")}
                      >
                        <List
                          size={18}
                          className={
                            viewMode === "list" ? "text-brand" : undefined
                          }
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                } gap-4 `}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <>
        <div className="grid grid-cols-8 gap-4">
          <div>
            <Image
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
              alt="image"
              width={50}
              height={50}
              className="w-28 h-28"
            />
          </div>
        </div>
      </>
    </section>
  );
}
