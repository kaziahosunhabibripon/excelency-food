"use client";

export const alterredUserAvatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9DBm4up7xkDQKhfO1kvAAwU8Grk36ZywnngllVU&s";

export const alterCardImage =
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600";

export const noCountryFlag =
  "https://www.shutterstock.com/image-vector/hanging-empty-white-flag-blank-260nw-508102912.jpg";

export const getCurrentYear = new Date().getFullYear();

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    const data = JSON.parse(localStorage.getItem("info")) || "";
    return data?.token ? `Bearer ${data.token}` : "";
  }
  return "";
};

export const truncateText = (
  text: string,
  maxLength: number,
  ellipsis: string = "..."
): string => {
  if (typeof text !== "string" || typeof maxLength !== "number") {
    console.log(
      "Invalid arguments for truncateText: text must be a string and maxLength must be a number."
    );
    return ""; // or throw new Error(...) instead
  }

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + ellipsis;
};

export const checkEmailForValid = (value) => {
  const regex = /^[\w%\+\-]+(\.[\w%\+\-]+)*@[\w%\+\-]+(\.[\w%\+\-]+)+$/;
  return regex.test(value);
};

export const convertNumToPad = (value = 0) =>
  value === 0 ? 0 : value?.toString().padStart(2, "0");

export interface FormatDateOptions extends Intl.DateTimeFormatOptions {
  year: "numeric";
  month: "short";
  day: "numeric";
}

export const formatDate = (dateString: string): string => {
  const options: FormatDateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const checkWindow = () => {
  return typeof window !== "undefined" ? true : false;
};

export const validatedTextInputField = (value) => value?.indexOf(" ") !== 0;

export const getPlayerDimensions = (screenSize) => {
  switch (screenSize) {
    case "xs":
      return { width: "auto", height: "180px" };
    case "sm":
      return { width: "300px", height: "180px" };
    case "md":
      return { width: "330px", height: "200px" };
    case "lg":
      return { width: "330px", height: "200px" };
    case "xl":
      return { width: "355px", height: "200px" };
    case "xxl":
      return { width: "415px", height: "200px" };
    default:
      return { width: "360px", height: "200px" };
  }
};

export const capitalizeFirstLetter = (str) =>
  str?.charAt(0).toUpperCase() || "";

export const getDefaultAvatarText = (first_name, last_name, email) => {
  if (first_name && last_name) {
    return capitalizeFirstLetter(first_name) + capitalizeFirstLetter(last_name);
  }
  if (first_name) {
    return first_name.length > 1
      ? capitalizeFirstLetter(first_name) + first_name.charAt(1).toUpperCase()
      : capitalizeFirstLetter(first_name);
  }
  if (email) {
    return capitalizeFirstLetter(email);
  }

  return "";
};

export const getCsrfToken = () => {
  console.log("All cookies:", document.cookie);
  const csrfCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="));
  const token = csrfCookie ? csrfCookie.split("=")[1] : undefined;
  console.log("Extracted CSRF Token:", token);
  return token;
};

// export const getCsrfToken = () => Cookies.get("XSRF-TOKEN") || "";
