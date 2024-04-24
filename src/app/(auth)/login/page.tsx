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
      <div className="flex flex-row justify-between 0">
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
        <div className="w-full md:w-1/2 ">
          <Spacer size="xs" />
          <div className=" flex w-full flex-col">
            <Image
              src={logo}
              alt="banner"
              height={50}
              objectFit="cover"
              className="cursor-pointer transfor  self-center  ml-16 "
            />
            <Spacer size="xs" />

            <p
              style={{
                fontSize: "18px",
                fontWeight: "400",
              }}
              className=" self-center ml-16 font-roboto"
            >
              Apple SME Lease Program
            </p>
            <Spacer size="sm" />
          </div>
          {!password ? (
            <div>
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
                    <div
                      style={{ borderColor: "#DADADA", width: "80%" }}
                      className="px-10 mr-5 mx-auto max-w-xl border   rounded-2xl"
                    >
                      <div className="flex w-full justify-center items-center">
                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: 400,
                            lineHeight: "29px",
                            paddingTop: "10px",
                          }}
                          className="my-2 text-xl font-normal font-roboto text-gray-900"
                        >
                          Log In
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
                      <Spacer size="sm" />
                    </div>
                    <Spacer size="sm" />
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
                          style={{ backgroundColor: "#4EB2EF" }}
                          type="button"
                          className=" focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg ml-16 "
                        >
                          <LoadingIcon />
                          <p
                            style={{
                              paddingTop: 8,
                              paddingBottom: 8,
                              fontSize: "15px",
                              fontWeight: "400",
                              paddingLeft: 64,
                              paddingRight: 64,
                              color: "#fff",
                              textAlign: "center",
                            }}
                          >
                            Loading ...
                          </p>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          style={{ backgroundColor: "#4EB2EF" }}
                          className=" focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg ml-16 "
                        >
                          <p
                            style={{
                              paddingTop: 8,
                              paddingBottom: 8,
                              fontSize: "15px",
                              fontWeight: "400",
                              paddingLeft: 64,
                              paddingRight: 64,
                              color: "#fff",
                              textAlign: "center",
                            }}
                          >
                            Submit
                          </p>
                        </button>
                      )}
                    </div>
                    <Spacer size="xs" />

                    <div className="flex justify-center items-center ml-16">
                      <button>
                        {" "}
                        <p
                          style={{
                            fontSize: 15,
                            fontWeight: 400,
                            textAlign: "center",
                          }}
                        >
                          {" "}
                          New Here? Signup
                        </p>
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          ) : !otpSent ? (
            <div>
              <div className=" ">
                <div
                  style={{ paddingLeft: "30px", paddingRight: "30px" }}
                  className=" mx-auto max-w-2xl "
                >
                  <Formik
                    initialValues={INTIAL_VALUESSENDOTPFORM}
                    onSubmit={handleSendOtpSubmit}
                    validateOnBlur
                    validateOnChange
                    validationSchema={validationSchemaSendOtp}
                    enableReinitialize
                  >
                    <Form>
                      <div
                        style={{ borderColor: "#DADADA", width: "80%" }}
                        className="px-10 mr-5 mx-auto max-w-xl border   rounded-2xl"
                      >
                        <div className="flex w-full justify-center items-center">
                          <p
                            style={{
                              fontSize: "18px",
                              fontWeight: 400,
                              lineHeight: "29px",
                              paddingTop: "10px",
                            }}
                            className="my-2 text-xl font-normal font-roboto text-gray-900"
                          >
                            Forget Passoword
                          </p>
                        </div>
                        <Input
                          label="Enter Email"
                          placeholder="Email"
                          name="email"
                        />
                       <Spacer size="sm" />
                    </div>
                    <Spacer size="sm" />

                      <div className="flex justify-center items-center ml-16">
                        {loading ? (
                          <button
                            disabled
                            type="button"
                            style={{ backgroundColor: "#4EB2EF" }}
                            className=" focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg ml-16 "
                          >
                            <LoadingIcon />
                            <p
                              style={{
                                paddingTop: 8,
                                paddingBottom: 8,
                                fontSize: "15px",
                                fontWeight: "400",
                                paddingLeft: 64,
                                paddingRight: 64,
                                color: "#fff",
                                textAlign: "center",
                              }}
                            >
                              Loading...
                            </p>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            style={{ backgroundColor: "#4EB2EF" }}
                            className=" focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg  "
                          >
                            <p
                              style={{
                                paddingTop: 8,
                                paddingBottom: 8,
                                fontSize: "15px",
                                fontWeight: "400",
                                paddingLeft: 64,
                                paddingRight: 64,
                                color: "#fff",
                                textAlign: "center",
                              }}
                            >
                              Submit
                            </p>
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
                <div className=" ">
                  <div
                    style={{ paddingLeft: "30px", paddingRight: "30px" }}
                    className=" mx-auto max-w-2xl "
                  >
                    <Formik
                      initialValues={INTIAL_VALUESVERIFY}
                      onSubmit={handleSendSetPassword}
                      validateOnBlur
                      validateOnChange
                      validationSchema={validationSchema}
                      enableReinitialize
                    >
                      <Form>
                        <div
                          style={{ borderColor: "#DADADA", width: "80%" }}
                          className="px-10 mr-5 mx-auto max-w-xl border   rounded-2xl"
                        >
                          <div className="flex w-full justify-center items-center">
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: 400,
                                lineHeight: "29px",
                                paddingTop: "10px",
                              }}
                              className="my-2 text-xl font-normal font-roboto text-gray-900"
                            >
                              Veriy Email
                            </p>
                          </div>
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
                           <Spacer size="sm" />
                    </div>
                    <Spacer size="sm" />

                        <div className="flex justify-center items-center ml-16">
                          {loading ? (
                            <button
                              disabled
                              style={{ backgroundColor: "#4EB2EF" }}
                              type="button"
                              className=" focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg ml-16 "
                            >
                              <LoadingIcon />
                              <p
                                style={{
                                  paddingTop: 8,
                                  paddingBottom: 8,
                                  fontSize: "15px",
                                  fontWeight: "400",
                                  paddingLeft: 64,
                                  paddingRight: 64,
                                  color: "#fff",
                                  textAlign: "center",
                                }}
                              >
                                Loading ...
                              </p>{" "}
                            </button>
                          ) : (
                            <button
                              style={{ backgroundColor: "#4EB2EF" }}
                              type="submit"
                              className=" focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg  "
                            >
                              <p
                                style={{
                                  paddingTop: 8,
                                  paddingBottom: 8,
                                  fontSize: "15px",
                                  fontWeight: "400",
                                  paddingLeft: 64,
                                  paddingRight: 64,
                                  color: "#fff",
                                  textAlign: "center",
                                }}
                              >
                                Submit
                              </p>
                            </button>
                          )}
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
