"use client";

import { onePiece, baki } from "./components/AxiosInterceptor";
import { BaseShipmentsDetails } from "./types";

export const SignupApi = (
  business_name: string,
  business_type: string,
  email: string,
  mobile: string
) => {
  return onePiece.post("/sign-up", {
    business_name,
    business_type,
    email,
    mobile,
  });
};

export const LoginApi = (email: string, password: string) => {
  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);
  return onePiece.post("/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const SendForgetPasswordOtpApi = (email: string) => {
  return onePiece.post("/forget-password", { email });
};

export const ConfirmPasswordOtpApi = (
  email: string,
  verification_code: string,
  password: string,
  confirm_password: string
) => {
  return onePiece.post("/verify-code", {
    email,
    verification_code,
    password,
    confirm_password,
  });
};
