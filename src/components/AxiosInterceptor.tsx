"use client";

import * as React from "react";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import { getEnviromentVariable } from "../utils/nextLocalStorage";

interface Props {
  children: React.ReactNode;
}

const baseOnePieceURLS =
  getEnviromentVariable() === "staging"
    ? "https://production-apple-sme-u5ab3vfhaa-uw.a.run.app"
    : "https://production-apple-sme-u5ab3vfhaa-uw.a.run.app";

const baseBakiURL =
  getEnviromentVariable() === "staging"
    ? "https://staging.baki.connectrpl.in"
    : "https://baki.connectrpl.in";

export const onePiece: AxiosInstance = axios.create({
  baseURL: baseOnePieceURLS, // Replace with your first base URL
});

export const baki: AxiosInstance = axios.create({
  baseURL: baseBakiURL, // Replace with your second base URL
});

export default function AxiosInterceptor({ children }: Props) {
  const router = useRouter();

  React.useEffect(() => {
    const requestInterceptor1 = onePiece.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const requestInterceptor2 = baki.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor1 = onePiece.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.setItem("authToken", "");
          router.replace("/login");
          return;
        }
        return Promise.reject(error);
      }
    );

    const responseInterceptor2 = baki.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.setItem("authToken", "");
          router.replace("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptors when the component unmounts
    return () => {
      onePiece.interceptors.request.eject(requestInterceptor1);
      baki.interceptors.request.eject(requestInterceptor2);
      onePiece.interceptors.response.eject(responseInterceptor1);
      baki.interceptors.response.eject(responseInterceptor2);
    };
  }, [router]);

  return children;
}
