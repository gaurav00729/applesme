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

export const UploadDocument = (
  file_type: string,
  file: File | FileList | null
) => {
  const formData = new FormData();

  formData.append("file_type", file_type);
  if (file instanceof File) {
    formData.append("files", file);
  } else if (file instanceof FileList) {
    for (let i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }
  }
  return onePiece.post("/document", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      mobile: localStorage.getItem("mobile"),
      email: localStorage.getItem("email"),
      user_id: localStorage.getItem("user_id"),
    },
  });
};
