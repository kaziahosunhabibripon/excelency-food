"use client";

import { useEffect, useRef, useState } from "react";

import {
  ChevronLeft,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "react-feather";
import { setOpenCartModal } from "@/redux/cart/cartSlice";
import ProfileDropdown from "./ProfileDropdown";
import { useDebounce } from "@/hooks/useDebounce";
import { addSearchData, addSelectedSearchData } from "@/redux/app/appSlice";
import { useGetSearchFoodQuery } from "@/redux/apiSlice/apiSlice";
import CartModal from "@/components/Cart/CartModal";
import { navData } from "@/data/navData";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import HighLightMatchText from "./HighLightMatchText";
import gsap from "gsap";

import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

const Navbar = ({ from = "" }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const isHomeRoute = pathname === "/";

  // Redux state
  const { cartData, cartOpen } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);

  // Local state
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // prevent hydration mismatch

  const debouncedSearch = useDebounce(searchQuery, 500);
  const searchParam = isExpanded && debouncedSearch ? debouncedSearch : "";

  const { data, isLoading } = useGetSearchFoodQuery(searchParam, {
    skip: !searchParam,
  });

  // Refs for animation
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(addSearchData(data));
    }
  }, [searchQuery, data, dispatch]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animation on mount for logo + nav items (desktop only)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate logo dropping from y: -30 with opacity
      tl.from(logoRef.current, {
        opacity: 0,
        y: -40,
        duration: 2,
        ease: "power2.out",
      });

      // Animate nav links staggered drop + fade in
      tl.fromTo(
        navItemsRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power2.out",
          stagger: 0.5,
        },
        ">0.1"
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setIsExpanded(value.trim() !== "");
  };

  const handleSearchExpand = () => setIsExpanded(true);
  const handleSearchCollapse = () => {
    setIsExpanded(false);
    setSearchQuery("");
  };

  const handleSearchFoodItem = (item) => {
    setIsExpanded(false);
    dispatch(addSelectedSearchData(item));
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleAuthRedirect = () => router.push("/login");

  // languge  switcher
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  return (
    <nav
      className={`fixed ${
        from === "globalProvider" ? "-top-[12px]" : "top-0"
      } left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-brand-secondary shadow-lg" : "bg-transparent mt-12"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="w-28 h-28">
          <Link
            href="/"
            className="w-full h-full relative inline-block p-2"
            ref={logoRef}
          >
            <Image
              src="/assets/logo-1.png"
              alt="Logo"
              width={800}
              height={800}
              priority
              quality={100}
              className="w-full h-auto object-cover"
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 relative">
          {navData.slice(0, 5).map((item, idx) => (
            <Link
              key={item.id}
              href={item.link}
              ref={(el) => {
                navItemsRef.current[idx] = el;
              }}
              className={`hover:text-brand uppercase font-semibold transition-colors relative lg:text-16 ${
                pathname === item.link ? "text-brand" : "text-white"
              }`}
            >
              {locale === "ar" ? item.labelAr : item.labelEn}
            </Link>
          ))}
        </div>

        {/* Mobile nav icons */}
        <div className="flex gap-3 items-center md:hidden">
          {isHomeRoute && (
            <div className="relative flex items-center">
              <form>
                <div
                  className={`flex items-center transition-all rounded-md ${
                    isExpanded ? "w-[300px] bg-white" : "w-10"
                  }`}
                >
                  <button
                    type="button"
                    aria-label="Search"
                    onClick={
                      isExpanded ? handleSearchCollapse : handleSearchExpand
                    }
                    className={`p-2 hover:text-gray-600 ${
                      isExpanded ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {isExpanded ? (
                      <ChevronLeft className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Search className="h-5 w-5 text-white" />
                    )}
                  </button>
                  <div className="relative w-[250px]" ref={dropdownRef}>
                    <input
                      ref={inputRef}
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search..."
                      className={`w-full bg-transparent outline-none text-gray-700 ${
                        isExpanded ? "opacity-100 px-2" : "opacity-0 w-0 p-0"
                      } transition-all duration-300`}
                    />
                    {isExpanded && (
                      <ul className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                        {isLoading ? (
                          <li className="py-10 text-center text-brand font-medium">
                            Loading...
                          </li>
                        ) : (
                          data?.items?.map((food) => (
                            <li
                              key={food.id}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSearchFoodItem(food)}
                            >
                              {HighLightMatchText(food.name, searchQuery)}
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </form>
            </div>
          )}

          <div
            className="relative flex flex-col items-center"
            onClick={() => dispatch(setOpenCartModal(true))}
            role="button"
            tabIndex={0}
          >
            {mounted && (
              <span className="absolute -mt-5 ms-6 w-5 h-5 bg-white text-brand rounded-full text-12 flex items-center justify-center">
                {cartData?.length ?? 0}
              </span>
            )}
            <ShoppingCart className="w-5 h-5 text-white cursor-pointer" />
          </div>

          {user ? (
            <ProfileDropdown />
          ) : (
            <User
              onClick={handleAuthRedirect}
              className="w-5 h-5 text-white cursor-pointer"
              aria-label="Login"
            />
          )}

          <button
            onClick={toggleSidebar}
            aria-label="Toggle menu"
            className={`md:hidden transition-colors ${
              isScrolled ? "text-orange-600" : "text-white"
            }`}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          {isHomeRoute && (
            <form className="relative flex items-center">
              <div
                className={`flex items-center rounded-md transition-all ${
                  isExpanded ? "w-[300px] bg-white" : "w-10"
                }`}
              >
                <button
                  type="button"
                  aria-label="Search"
                  onClick={
                    isExpanded ? handleSearchCollapse : handleSearchExpand
                  }
                  className={`p-2 hover:text-gray-600 ${
                    isExpanded ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {isExpanded ? (
                    <ChevronLeft className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Search className="h-5 w-5 text-white" />
                  )}
                </button>
                <div className="relative w-[250px]" ref={dropdownRef}>
                  <input
                    ref={inputRef}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search..."
                    className={`w-full bg-transparent outline-none text-gray-700 ${
                      isExpanded ? "opacity-100 px-2" : "opacity-0 w-0 p-0"
                    } transition-all duration-300`}
                  />
                  {isExpanded && (
                    <ul className="absolute left-0 top-full mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                      {isLoading ? (
                        <li className="py-10 text-center text-brand font-medium">
                          Loading...
                        </li>
                      ) : (
                        data?.items?.map((food) => (
                          <li
                            key={food.id}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSearchFoodItem(food)}
                          >
                            {HighLightMatchText(food.name, searchQuery)}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </form>
          )}
          <div
            className="relative flex flex-col items-center"
            onClick={() => dispatch(setOpenCartModal(true))}
            role="button"
            tabIndex={0}
          >
            {mounted && (
              <span className="absolute -mt-5 ms-6 w-5 h-5 bg-white text-brand rounded-full text-12 flex items-center justify-center">
                {cartData?.length ?? 0}
              </span>
            )}
            <ShoppingCart className="w-5 h-5 text-white cursor-pointer" />
          </div>

          {user?.userId ? (
            <ProfileDropdown />
          ) : (
            <User
              onClick={handleAuthRedirect}
              className="w-5 h-5 text-white cursor-pointer"
              aria-label="Login"
            />
          )}
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            aria-label="Close menu"
            className="text-orange-600 mb-8"
          >
            <X size={24} />
          </button>
          <div className="flex flex-col gap-4">
            {navData.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                onClick={toggleSidebar}
                className={`transition-colors ${
                  pathname === item.link ? "text-brand" : "text-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Cart modal */}
      <CartModal
        isOpen={cartOpen}
        onClose={() => dispatch(setOpenCartModal(false))}
      />
    </nav>
  );
};

export default Navbar;
