"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { size } from "lodash";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaTimes,
  FaEye,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import CommonHeader from "../common/CommonHeader";
import { getOrdersData } from "@/helpers/restApiRequest";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Order } from "@/types/types";

const steps = [
  {
    id: 1,
    name: "Order Received",
    description: "Your order has been received",
    icon: FaBox,
  },
  {
    id: 2,
    name: "Processing",
    description: "We are preparing your order",
    icon: FaBox,
  },
  {
    id: 3,
    name: "Completed",
    description: "Your order is on its way",
    icon: FaTruck,
  },
  {
    id: 4,
    name: "Delivered",
    description: "Order has been delivered",
    icon: FaCheckCircle,
  },
];

const getOrderStatus = (value: string) => {
  const orderStatus = {
    "Order Received": "bg-brand w-1/4",
    Processing: "bg-brand w-2/4",
    Completed: "bg-brand w-3/4",
    Delivered: "bg-brand w-full",
  };
  return orderStatus[value] || "bg-gray-200";
};

const getOrderStatusForIcon = (currentStatus: string, stepName: string) => {
  const statusOrder = [
    "Order Received",
    "Processing",
    "Completed",
    "Delivered",
  ];
  const currentIndex = statusOrder.indexOf(currentStatus);
  const stepIndex = statusOrder.indexOf(stepName);
  return stepIndex <= currentIndex ? "bg-brand" : "bg-gray-200";
};

const getStatusColor = (status: string) => {
  const colors = {
    "Order Received": "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Completed: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getOrderProgress = (status: string) => {
  const progress = {
    "Order Received": 25,
    Processing: 50,
    Completed: 75,
    Delivered: 100,
  };
  return progress[status] || 0;
};

const OrderTrackingComponent = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const [orderInfo, setOrderInfo] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getOrderInfo = async () => {
    try {
      const response = await getOrdersData();
      if (size(response)) {
        const orders = response?.data?.orders || [];

        // Sort by created_at in descending order (latest first)
        const reversedOrders = [...orders].reverse();

        setOrderInfo(reversedOrders);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getOrderInfo();
    const intervalId = setInterval(getOrderInfo, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useLayoutEffect(() => {
    if (size(user) < 0) {
      router.push("/");
      router.prefetch("/");
    }
  }, [user, router]);

  const orderId = useMemo(
    () => orderInfo?.map((item) => item?.id).join(", "),
    [orderInfo]
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  const lastOrderId = orderId
    .split(",")
    .map((id) => id.trim())
    .pop();

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader
        title="Track"
        secondarySubTitle="order"
        subtitle={`#${lastOrderId || ""}`}
        componentTitle="Tracking"
      />
      <div className="container mx-auto my-10 p-4">
        {/* Orders Table */}
        <div className="bg-white rounded-lg mb-10 min-h-screen shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {[...orderInfo]
                  ?.sort(
                    (a, b) =>
                      new Date(b.created_at as string).getTime() -
                      new Date(a.created_at as string).getTime()
                  )
                  ?.map((order) => {
                    const { id, status, total_amount, created_at } =
                      order || {};
                    return (
                      <tr
                        key={id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleOrderClick(order)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            #{id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {created_at ? formatDate(created_at) : "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            AED {Math.round(total_amount)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#ecbf4c] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${getOrderProgress(status)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {getOrderProgress(status)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium cursor-pointer">
                          <button className="text-[#ecbf4c] hover:text-[#ecbf4cbd] flex items-center gap-1">
                            <FaEye className="h-4 w-4" />
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Order Details
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="h-6 w-6 text-[#ecbf4c]" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Order Info */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FaBox className="h-5 w-5 text-[#ecbf4c]" />
                      <span className="font-medium">Order ID:</span>
                      <span>#{selectedOrder.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="h-5 w-5 text-[#ecbf4c]" />
                      <span className="font-medium">Order Date:</span>
                      <span>
                        {selectedOrder.created_at
                          ? formatDate(selectedOrder.created_at)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCreditCard className="h-5 w-5 text-[#ecbf4c]" />
                      <span className="font-medium">Total:</span>
                      <span className="font-semibold">
                        AED {Math.round(selectedOrder.total_amount)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Estimated delivery: June 15, 2023
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="overflow-hidden rounded-full bg-gray-200 mb-4">
                    <div
                      className={`h-3 ${getOrderStatus(
                        selectedOrder.status
                      )} rounded-full transition-all duration-500`}
                    ></div>
                  </div>

                  {/* Steps */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {steps.map((step) => (
                      <div key={step.id} className="text-center">
                        <div
                          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${getOrderStatusForIcon(
                            selectedOrder.status,
                            step.name
                          )}`}
                        >
                          <step.icon
                            className={`h-6 w-6 ${
                              getOrderStatusForIcon(
                                selectedOrder.status,
                                step.name
                              ) === "bg-brand"
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          />
                        </div>
                        <p className="text-sm font-medium text-gray-900 mt-2">
                          {step.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Items
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedOrder.order_items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900">
                          AED {Math.round(item.price)}
                        </p>
                      </div>
                    ))}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <p className="text-lg font-semibold text-gray-900">
                        Total
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        AED {Math.round(selectedOrder.total_amount)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Delivery Address
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="h-5 w-5 text-[#ecbf4c] mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {user?.fullname}
                        </p>
                        <p className="text-gray-600">
                          {selectedOrder.delivery_address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(OrderTrackingComponent);
