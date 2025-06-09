"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { size } from "lodash";
import { Eye, EyeOff, Lock, Mail } from "react-feather";
import AOS from "aos";
import "aos/dist/aos.css";
import CommonHeader from "@/components/common/CommonHeader";
import toastAlert from "@/utils/toastConfig";
import {
  checkEmailForValid,
  validatedTextInputField,
} from "@/utils/appHelpers";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setAuthUser } from "@/redux/user/userSlice";
import { requestForLogin } from "@/helpers/restApiRequest";
import { useRouter, useSearchParams } from "next/navigation";

const LoginComponent = () => {
  const toastId = useRef<string | number | null>(null);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  // redux states
  const { cartData, checkoutCartItem, guestUserId } = useAppSelector(
    (state) => state.cart
  );

  const updatedCartData = useMemo(
    () => cartData || checkoutCartItem,
    [cartData, checkoutCartItem]
  );

  // states
  const [mutationData, setMutationData] = useState({
    email: "",
    password: "",
    ...(guestUserId && size(updatedCartData) > 0
      ? { guest_id: guestUserId }
      : {}),
  });
  const [viewPassword, setViewPassword] = useState(false);
  const [Loading, setLoading] = useState(false);

  const isValidEmail = checkEmailForValid(mutationData.email);

  // input change
  const handleChange = (value: string, context: string) => {
    if (context !== "email" && validatedTextInputField(value)) {
      setMutationData((prev) => ({
        ...prev,
        password: value,
      }));
    } else {
      setMutationData((prev) => ({
        ...prev,
        email: value,
      }));
    }
  };

  // login mutation

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await requestForLogin(mutationData);

      if (response?.data?.message === "Login successful") {
        const updatedRes = response?.data || {};

        const prepareUserData = {
          token: updatedRes?.token,
          fullname: updatedRes?.user?.full_name,
          photo: updatedRes?.user?.image_url || updatedRes?.user?.image,
          email: updatedRes?.user?.email,
          userId: updatedRes?.user?.id,
        };

        dispatch(setAuthUser(prepareUserData));
        setMutationData({ email: "", password: "" });

        const redirectPath = searchParams.get("redirect") || "/";
        router.push(redirectPath);
      }
    } catch (err) {
      setLoading(false);
      const { response } = err as { response: { data: { message: string } } };
      toastAlert("error", response?.data?.message, "top-right", toastId, {
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  // button disable
  const disableBtn =
    !mutationData?.email ||
    Loading ||
    !isValidEmail ||
    size(mutationData?.password) <= 6;

  // ANIMATE ON SCROLL
  useEffect(() => {
    AOS.init({ offset: 120, duration: 2000, easing: "ease-out" });
  }, []);

  return (
    <div>
      <CommonHeader title="Welcome" subtitle="back" componentTitle="Login" />
      <div
        className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-10"
        data-aos="fade-up"
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-border-dark mb-6 capitalize">
            Sign in to your <span className="text-brand">account</span>
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 justify-center items-center"
              >
                Email
                <span className="text-red-500 text-xs font-medium px-1">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  value={mutationData.email}
                  type="email"
                  onChange={(e) => handleChange(e.target.value, "email")}
                  autoComplete="email"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              {mutationData?.email && !isValidEmail && (
                <span className="text-red-500 text-12 font-semibold">
                  Email is invalid
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
                <span className="text-red-500 text-xs font-medium px-1">*</span>
              </label>
              <div className="relative">
                <div className="flex border border-gray-300 justify-center items-center">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    value={mutationData.password}
                    type={viewPassword ? "text" : "password"}
                    onChange={(e) => handleChange(e.target.value, "password")}
                    autoComplete={"current-password"}
                    required
                    className="pl-10 w-full px-3 py-2 rounded-md focus:outline-none focus:border-transparent"
                    placeholder="••••••••"
                  />
                  {viewPassword ? (
                    <EyeOff
                      className="mr-2 text-gray-400 cursor-pointer"
                      onClick={() => setViewPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="mr-2 text-gray-400 cursor-pointer"
                      onClick={() => setViewPassword(true)}
                    />
                  )}
                </div>
              </div>
              {mutationData?.password && size(mutationData?.password) <= 6 && (
                <span className="text-red-500 text-12 font-semibold">
                  Password should be more than six characters.
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={disableBtn}
              className={`${
                disableBtn
                  ? "cursor-not-allowed bg-orange-300"
                  : "cursor-pointer bg-brand"
              } w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all duration-200`}
            >
              {Loading ? "Login in..." : "Login"}
            </button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-center text-gray-600">
            <span>Don&apos;t have an account?</span>
            <Link
              href="/register"
              className="font-medium text-brand transition ease-in-out duration-150 px-2"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
