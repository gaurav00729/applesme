"use client";

import * as React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import Spacer from "@/components/common/Spacer";
import { LoadingIcon } from "@/assets/images/Loading";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import logo from "../../../assets/images/logocrpl.svg";
import Image from "next/image";
import {
  ConfirmPasswordOtpApi,
  LoginApi,
  SendForgetPasswordOtpApi,
} from "@/apis";
import useApi from "@/hooks/useApi";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types";
import { nextSessionStorage } from "@/utils/nextLocalStorage";
import useToast from "@/hooks/useToast";

const INTIAL_VALUESLOGIN = {
  email: "",
  password: "",
};

const INTIAL_VALUESSENDOTPFORM = {
  email: "",
};

const INTIAL_VALUESVERIFY = {
  verification_code: "",
  password: "",
  confirm_password: "",
};

export default function SignUp() {
  const isactive = nextSessionStorage()?.getItem("user_status") ?? "";
  const user_email = nextSessionStorage()?.getItem("user_email") ?? "";

  const { showToast } = useToast();

  const [loading, setLoading] = React.useState(false); // eslint-disable-line
  const [password, setPassword] = React.useState(
    isactive == "inactive_user" ? true : false
  ); // eslint-disable-line
  const [userEmail, setUserEmail] = React.useState(user_email); // eslint-disable-line

  const [otpSent, setOtpSent] = React.useState(
    isactive == "inactive_user" ? true : false
  ); // eslint-disable-line

  const { makeApiCall } = useApi();

  const router = useRouter();
  const { setAuthToken, setUser } = useStore();

  const navigateToHomePage = React.useCallback(() => {
    router.replace("/");
  }, [router]);

  const toggleForgetPassword = React.useCallback(() => {
    setPassword(true);
  }, []);

  const handleLoginSubmit = React.useCallback(
    ({ email, password }: typeof INTIAL_VALUESLOGIN) => {
      return makeApiCall(LoginApi(email, password))
        .then((response) => {
          console.log(response, "RESPONSE OF LOGIN API");
          if (response != undefined) {
            console.log(response, "INSIDE");
            const { token }: { token: string } = response;
            const decode: User = jwtDecode(token);
            console.log(decode, "decodee");

            localStorage.setItem("authToken", token);
            localStorage.setItem("user_id", `${decode.user_id}`);
            localStorage.setItem("email", decode.email);
            localStorage.setItem("name", decode.name);

            setUser(decode);
            setAuthToken(token);
            if (token) {
              showToast("Successful", { type: "success" });
              navigateToHomePage();
            }
          } else {
            showToast("Some error occurred", { type: "error" });
          }
          return true;
        })
        .catch((error) => {
          console.error("Login Error:- ", error);
          showToast(
            error?.response?.data?.message &&
              error?.response?.data?.message != ""
              ? error?.response?.data?.message
              : "Error occurreds",
            { type: "error" }
          );

          return false;
        })
        .finally(() => setLoading(false));
    },
    [navigateToHomePage, setAuthToken, makeApiCall, setUser, showToast]
  );

  const validationloginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid  email format")
      .required(" Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSendOtpSubmit = React.useCallback(
    ({ email }: typeof INTIAL_VALUESSENDOTPFORM) => {
      setUserEmail(email);
      return makeApiCall(SendForgetPasswordOtpApi(email))
        .then((response) => {
          console.log(response, "RESPONSE OF FORGET PASSWORD OTP ENDING");
          if (response != undefined && response?.status == true) {
            showToast(
              response?.message && response?.message != ""
                ? response?.message
                : "Sent",
              { type: "success" }
            );
            setOtpSent(true);
          }
          return true;
        })
        .catch((error) => {
          showToast(
            error?.response?.data?.message &&
              error?.response?.data?.message != ""
              ? error?.response?.data?.message
              : "Error occurreds",
            { type: "error" }
          );
          console.error("Login Error:- ", error);
          return false;
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall]
  );

  const validationSchemaSendOtp = Yup.object().shape({
    email: Yup.string()
      .email("Invalid  email format")
      .required(" Email is required"),
  });

  const handleSendSetPassword = React.useCallback(
    ({
      verification_code,
      password,
      confirm_password,
    }: typeof INTIAL_VALUESVERIFY) => {
      return makeApiCall(
        ConfirmPasswordOtpApi(
          userEmail,
          verification_code,
          password,
          confirm_password
        )
      )
        .then((response) => {
          console.log(response, "RESPONSE OF CONFIRM  PASSWORD AFTER OTP");
          if (response != undefined) {
            const { token }: { token: string } = response;
            const decode: User = jwtDecode(token);
            localStorage.setItem("authToken", token);
            localStorage.setItem("user_id", `${decode.user_id}`);
            localStorage.setItem("email", decode.email);
            localStorage.setItem("name", decode.name);
            setUser(decode);
            setAuthToken(token);
            if (token) {
              navigateToHomePage();
            }

            return true;
          }
        })
        .catch((error) => {
          showToast(
            error?.response?.data?.message &&
              error?.response?.data?.message != ""
              ? error?.response?.data?.message
              : "Error occurreds",
            { type: "error" }
          );
          console.error("Login Error:- ", error);
          return false;
        })
        .finally(() => setLoading(false));
    },
    [navigateToHomePage, makeApiCall, userEmail, setAuthToken]
  );

  const validationSchema = Yup.object().shape({
    verification_code: Yup.string().required(" OTP is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string().required(
      "Confirm password same as password is required"
    ),
  });

  return (
    <section className="bg-white ">
      <div className="flex flex-row justify-between ">
        <div className="w-full md:w-1/2 hidden md:block">
          <div className=" h-screen flex items-center justify-center">
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url("https://storage.googleapis.com/website_blog_images/applebanner.jpg")`,
              }}
            ></div>
          </div>
        </div>
        <div className="w-full md:w-1/2   ">
          <Spacer size="xs" />

          <div className=" flex w-full flex-col">
            <Image
              src={logo}
              alt="banner"
              height={40}
              objectFit="cover"
              className="cursor-pointer transfor mt-5 "
            />
            <p
              style={{
                fontSize: "24px",
                fontWeight: "400",
              }}
              className=" self-center "
            >
              Apple SME Lease Program
            </p>
            <Spacer size="sm" />
          </div>
          {!password ? (
            <div className="">
              <div
                style={{ paddingLeft: "30px", paddingRight: "30px" }}
                className=" mx-auto max-w-2xl "
              >
                <Formik
                  initialValues={INTIAL_VALUESLOGIN}
                  onSubmit={handleLoginSubmit}
                  validateOnBlur
                  validateOnChange
                  validationSchema={validationloginSchema}
                  enableReinitialize
                >
                  <Form>
                    <div className="px-10 mr-5 mx-auto max-w-2xl border  border-gray-500 rounded-2xl">
                      <div className="flex w-full justify-center items-center">
                        <p
                          style={{
                            fontSize: "24px",
                            fontWeight: 400,
                            lineHeight: "29px",
                            paddingTop: "10px",
                          }}
                          className="my-2 text-xl font-normal font-roboto text-gray-900"
                        >
                          Sign Up
                        </p>
                      </div>
                      <Input
                        label="Registered Email"
                        placeholder="Email"
                        name="email"
                      />
                      <Spacer size="xs" />

                      <Input
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                      />
                      <Spacer size="xs" />

                      <div className="flex justify-end items-center">
                        <button>
                          <p
                            onClick={toggleForgetPassword}
                            className="my-4 font-roboto  text-base font-normal text-gray-900 "
                          >
                            Forget Password?
                          </p>
                        </button>
                      </div>

                      <div className="flex justify-center items-center">
                        {loading ? (
                          <button
                            disabled
                            type="button"
                            className="text-white bg-blue-700 font-roboto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2  inline-flex items-center"
                          >
                            <LoadingIcon />
                            Loading...
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-roboto font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center "
                          >
                            Submit
                          </button>
                        )}
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="my-4  text-base font-roboto font-medium text-gray-900 ">
                          New Here? Signup
                        </p>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          ) : !otpSent ? (
            <div>
              <div className=" px-20 ">
                <div className=" px-2 mr-5  mx-auto max-w-2xl lg:py-2 border border-gray-500 rounded-2xl ">
                  <div className=" flex w-full justify-center items-center">
                    <h2 className=" my-2 text-xl font-normal font-roboto text-gray-900 ">
                      Forget Password
                    </h2>
                  </div>

                  <Formik
                    initialValues={INTIAL_VALUESSENDOTPFORM}
                    onSubmit={handleSendOtpSubmit}
                    validateOnBlur
                    validateOnChange
                    validationSchema={validationSchemaSendOtp}
                    enableReinitialize
                  >
                    <Form>
                      <Input
                        label="Enter Email"
                        placeholder="Email"
                        name="email"
                      />
                      <Spacer size="xs" />

                      <div className="flex justify-center items-center">
                        {loading ? (
                          <button
                            disabled
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2   inline-flex items-center"
                          >
                            <LoadingIcon />
                            Loading...
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center "
                          >
                            Submit
                          </button>
                        )}
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="my-4  text-base font-medium text-gray-900 "></p>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div className=" px-20 ">
                  <div className=" px-2 mr-5  mx-auto max-w-2xl lg:py-2 border border-gray-500 rounded-2xl ">
                    <div className=" flex w-full justify-center items-center">
                      <h2 className=" my-2 text-xl font-normal font-roboto text-gray-900 ">
                        Veriy Email
                      </h2>
                    </div>

                    <Formik
                      initialValues={INTIAL_VALUESVERIFY}
                      onSubmit={handleSendSetPassword}
                      validateOnBlur
                      validateOnChange
                      validationSchema={validationSchema}
                      enableReinitialize
                    >
                      <Form>
                        <Input
                          label="Enter OTP Received on your email"
                          placeholder="Enter OTP"
                          name="verification_code"
                        />
                        <Spacer size="xs" />

                        <Input
                          label="Create Password"
                          placeholder="enter Password"
                          name="password"
                          type="password"
                        />
                        <Spacer size="xs" />

                        <Input
                          label="Confirm Password"
                          placeholder="confirm password"
                          name="confirm_password"
                          type="password"
                        />
                        <Spacer size="xs" />

                        <div className="flex justify-center items-center">
                          {loading ? (
                            <button
                              disabled
                              type="button"
                              className="text-white font-roboto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2   inline-flex items-center"
                            >
                              <LoadingIcon />
                              Loading...
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="px-5 py-2.5 font-roboto text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center  "
                            >
                              Submit
                            </button>
                          )}
                        </div>
                        <div className="flex justify-center items-center">
                          <p className="my-4  text-base font-medium text-gray-900 "></p>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
