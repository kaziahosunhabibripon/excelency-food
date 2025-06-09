/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable */
// @ts-nocheck

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
export default function RestaurantDashboard() {
  const customers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "555-1234",
    },
    { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "555-5678" },
    {
      id: 3,
      name: "Charlie Davis",
      email: "charlie@example.com",
      phone: "555-8765",
    },
  ];
  const tableHeaders = [
    "Code",
    "Name",
    "Category",
    "Image",
    "Price",
    "Sales QTY",
    "Sales Amount",
    "Return QTY",
    "Refund Amount",
    "Total",
  ];

  const topProducts = [
    {
      code: "10075",
      name: "Bombay Biriyani",
      category: "Rice Dishes",
      salesQty: 33,
      salesAmount: 32967.0,
      returnQty: 0,
      refundAmount: 0.0,
      total: 32967,
      id: 101,
      image:
        "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: 12.99,
    },
    {
      code: "10066",
      category: "Pizza",
      salesQty: 9,
      salesAmount: 8991.0,
      returnQty: 0,
      refundAmount: 0.0,
      total: 8991,
      id: 102,
      name: "Caesar Salad",
      image:
        "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: 8.5,
    },
    {
      code: "10066",
      category: "Pizza",
      salesQty: 9,
      salesAmount: 8991.0,
      returnQty: 0,
      refundAmount: 0.0,
      total: 8991,
      id: 103,
      name: "Grilled Salmon",
      image:
        "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: 18.75,
    },
  ];

  const formatCurrency = (value) =>
    value.toLocaleString("en-US", { style: "currency", currency: "USD" });
  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(topProducts.length / itemsPerPage);
  const paginationItems = topProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full   p-6 font-sans bg-gray-50 text-gray-800">
      <div className="container mx-auto">
        <div className="bg-slate-950 text-white text-2xl font-bold px-6 py-4 rounded-t-lg shadow-md">
          Top Selling Items
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                {tableHeaders?.map((theadName) => (
                  <th className="px-6 py-3" key={theadName}>
                    {theadName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, idx) => {
                const product = topProducts[idx];
                const isLast = idx === customers.length - 1;
                return (
                  <tr
                    key={customer.id}
                    className={`bg-slate-50 hover:bg-gray-50 cursor-pointer ${
                      !isLast ? "border-b border-gray-200" : ""
                    }`}
                  >
                    <td className="px-6 py-4"> # {product?.code}</td>
                    <td className="px-6 py-4">{product?.name}</td>
                    <td className="px-6 py-4">{product?.category}</td>
                    <td className="px-6 py-4">
                      {product ? (
                        <Image
                          width={800}
                          height={800}
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-full border"
                        />
                      ) : (
                        <Image
                          width={800}
                          height={800}
                          src={"/assets/food-1.png"}
                          alt={"food"}
                          className="w-16 h-16 object-cover rounded-full border"
                        />
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {product ? formatCurrency(product.price) : "N/A"}
                    </td>
                    <td className="px-6 py-4">{product?.salesQty}</td>
                    <td className="px-6 py-4">{product?.salesAmount}</td>
                    <td className="px-6 py-4">{product?.returnQty}</td>
                    <td className="px-6 py-4">{product?.refundAmount}</td>
                    <td className="px-6 py-4">{product?.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Optional Pagination */}
        <div className="flex items-start justify-between mt-4">
          <div className="px-2 text-gray-500">
            Showing{" "}
            <span className="text-purple-700 font-extrabold">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="text-purple-700 font-extrabold">{totalPages}</span>
          </div>
          <nav className="inline-flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
            >
              <BsChevronDoubleLeft />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded font-semibold ${
                    page === currentPage
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300">
              <BsChevronDoubleRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
