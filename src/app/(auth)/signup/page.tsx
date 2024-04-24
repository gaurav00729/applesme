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
import useApi from "@/hooks/useApi";
import { SignupApi } from "@/apis";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types";
import useToast from "@/hooks/useToast";

const INTIAL_VALUES = {
  business_name: "",
  business_type: "",
  email: "",
  mobile: "",
};
export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { setAuthToken, setUser } = useStore();

  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const navigateToHomePage = React.useCallback(() => {
    router.replace("/");
  }, [router]);

  const gotoLoginPage = React.useCallback(() => {
    router.replace("/login");
  }, [router]);

  const navigateToEnterOTP = React.useCallback(() => {
    router.replace("/login");
  }, [router]);
  const handleSubmit = React.useCallback(
    ({ business_name, business_type, email, mobile }: typeof INTIAL_VALUES) => {
      return makeApiCall(SignupApi(business_name, business_type, email, mobile))
        .then((response) => {
          console.log(response, "RESPONSE OF SIGNUP");

          if (
            response?.status == true &&
            response?.user_status == "inactive_user"
          ) {
            sessionStorage.setItem("user_status", "inactive_user");
            sessionStorage.setItem("user_email", email);
            showToast("OTP Sent", { type: "success" });
            navigateToEnterOTP();
          } else if (response?.user_status == "active_user") {
            showToast("Account already present! Please Login!", {
              type: "error",
            });
            sessionStorage.removeItem("user_status");
            sessionStorage.removeItem("user_email");
            navigateToEnterOTP();
          } else {
            sessionStorage.removeItem("user_status");
            sessionStorage.removeItem("user_email");
            navigateToEnterOTP();
          }
          return true;
        })
        .catch((error) => {
          showToast("Some error occurred!", { type: "error" });
          console.error("Login Error:- ", error);
          return false;
        })
        .finally(() => setLoading(false));
    },
    [navigateToHomePage, setAuthToken, makeApiCall, setUser, navigateToEnterOTP]
  );

  const validationSchema = Yup.object().shape({
    business_name: Yup.string().required("Business Name is required"),
    mobile: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[0-9]{10}$/, {
        message:
          "Mobile Number must be exactly 10 digits and contain only numbers",
        excludeEmptyString: true,
      }),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    business_type: Yup.string().required("Business Type is required"),
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
              className="cursor-pointer transfor  self-center "
            />
            <Spacer size="xs" />

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

            <div className=" ">
              <div
                style={{ paddingLeft: "30px", paddingRight: "30px" }}
                className=" mx-auto max-w-2xl "
              >
                <Formik
                  initialValues={INTIAL_VALUES}
                  onSubmit={handleSubmit}
                  validateOnBlur
                  validateOnChange
                  validationSchema={validationSchema}
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
                        label="Registered Business Name"
                        placeholder="Name"
                        name="business_name"
                      />
                      <Spacer size="xs" />
                      <Input
                        label="Business Type"
                        placeholder="Business Type"
                        name="business_type"
                      />
                      <Spacer size="xs" />
                      <Input
                        label="Phone Number"
                        placeholder="Phone"
                        name="mobile"
                      />
                      <Spacer size="xs" />
                      <Input label="Email" placeholder="Email" name="email" />
                      <Spacer size="sm" />
                    </div>
                    <Spacer size="sm" />

                    <div className="flex justify-center items-center">
                      {loading ? (
                        <button
                          disabled
                          type="button"
                          style={{ backgroundColor: "#4EB2EF" }}
                          className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center mr-2   inline-flex items-center"
                        >
                          <LoadingIcon />
                          Loading...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          style={{ backgroundColor: "#4EB2EF" }}
                          className=" focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg "
                        >
                          <p
                            style={{
                              paddingTop: 8,
                              paddingBottom: 8,
                              fontSize: "24px",
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

                    <div className="flex justify-center items-center">
                      <p
                        onClick={gotoLoginPage}
                        style={{
                          fontSize: 24,
                          fontWeight: 400,
                          textAlign: "center",
                        }}
                      >
                        Already have a account? Login
                      </p>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
