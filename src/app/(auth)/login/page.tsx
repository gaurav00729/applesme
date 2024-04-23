"use client";

import * as React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/Input";
import Spacer from "@/components/common/Spacer";
import { LoadingIcon } from "@/assets/images/Loading";
import { useRouter } from "next/navigation";
import Select from "@/components/common/Select";
import { SelectType } from "@/types";
import useStore from "@/store";
import banner from "../../../assets/images/banner.svg";
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
import { nextLocalStorage } from "@/utils/nextLocalStorage";
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
  const isactive = nextLocalStorage()?.getItem("user_status") ?? "";
  const user_email = nextLocalStorage()?.getItem("user_email") ?? "";

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
    ({
      email, // eslint-disable-line
      password, // eslint-disable-line
    }: typeof INTIAL_VALUESLOGIN) => {
      return makeApiCall(LoginApi(email, password))
        .then((response) => {
          console.log(response, "RESPONSE OF LOGIN API");
          const { token }: { token: string } = response;
          const decode: User = jwtDecode(token);
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
          return true;
        })
        .catch((error) => {
          showToast("Failed", { type: "error" });
          console.error("Login Error:- ", error);
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
          if (response?.status == 200) {
            setOtpSent(true);
          }
          return true;
        })
        .catch((error) => {
          setOtpSent(true);

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
        })
        .catch((error) => {
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
      "Confirm password same asPassword is required"
    ),
  });

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex flex-row justify-between">
        <div className="w-full md:w-1/2 hidden md:block">
          <div className="bg-gray-200 h-screen flex items-center justify-center">
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url("https://storage.googleapis.com/website_blog_images/applebanner.jpg")`,
              }}
            ></div>
          </div>
        </div>
        <div className="w-full md:w-1/2  flex flex-col justify-center  ">
          <div className=" flex w-full flex-col justify-center items-center">
            <Image
              src={logo}
              alt="banner"
              height={40}
              objectFit="cover"
              className="cursor-pointer transfor  "
            />
            <p className="my-4 text-lg  font-bold  text-gray-900 dark:text-white">
              Apple SME Lease Program
            </p>
          </div>
          {!password ? (
            <div className=" px-20 ">
              <div className=" px-2 mr-5  mx-auto max-w-2xl lg:py-6 border border-gray-500 rounded-2xl ">
                <div className=" flex w-full justify-center items-center">
                  <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Login
                  </h2>
                </div>

                <Formik
                  initialValues={INTIAL_VALUESLOGIN}
                  onSubmit={handleLoginSubmit}
                  validateOnBlur
                  validateOnChange
                  validationSchema={validationloginSchema}
                  enableReinitialize
                >
                  <Form>
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
                    />
                    <Spacer size="xs" />

                    <div
                      className="flex justify-end items-center"
                      onClick={toggleForgetPassword}
                    >
                      <p className="my-4  text-base font-medium text-gray-900 dark:text-white">
                        Forget Password?
                      </p>
                    </div>

                    <div className="flex justify-center items-center">
                      {loading ? (
                        <button
                          disabled
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                        >
                          <LoadingIcon />
                          Loading...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                    <div className="flex justify-center items-center">
                      <p className="my-4  text-base font-medium text-gray-900 dark:text-white">
                        New Here? Signup
                      </p>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          ) : !otpSent ? (
            <div>
              <div className=" px-20 ">
                <div className=" px-2 mr-5  mx-auto max-w-2xl lg:py-6 border border-gray-500 rounded-2xl ">
                  <div className=" flex w-full justify-center items-center">
                    <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
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
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                          >
                            <LoadingIcon />
                            Loading...
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Submit
                          </button>
                        )}
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="my-4  text-base font-medium text-gray-900 dark:text-white"></p>
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
                  <div className=" px-2 mr-5  mx-auto max-w-2xl lg:py-6 border border-gray-500 rounded-2xl ">
                    <div className=" flex w-full justify-center items-center">
                      <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                        Verify Email
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
                        />
                        <Spacer size="xs" />

                        <Input
                          label="Confirm Password"
                          placeholder="confirm passowrd"
                          name="confirm_password"
                        />
                        <Spacer size="xs" />

                        <div className="flex justify-center items-center">
                          {loading ? (
                            <button
                              disabled
                              type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                            >
                              <LoadingIcon />
                              Loading...
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Submit
                            </button>
                          )}
                        </div>
                        <div className="flex justify-center items-center">
                          <p className="my-4  text-base font-medium text-gray-900 dark:text-white"></p>
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
