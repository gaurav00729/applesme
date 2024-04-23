"use client";

import { onePiece, baki } from "./components/AxiosInterceptor";
import { BaseShipmentsDetails } from "./types";

export const SignupApi = (
  business_name: string,
  business_type: string,
  email: string,
  mobile: string
) => {
  const formData = new FormData();

  formData.append("business_name", business_name);
  formData.append("business_type", business_type);
  formData.append("email", email);
  formData.append("mobile", mobile);
  return onePiece.post("/sign-up", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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
  const formData = new FormData();

  formData.append("email", email);
  return onePiece.post("/forget-password", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const ConfirmPasswordOtpApi = (
  email: string,
  verification_code: string,
  password: string,
  confirm_password: string
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("verification_code", verification_code);
  formData.append("password", password);
  formData.append("confirm_password", confirm_password);

  return onePiece.post("/verify-code", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
