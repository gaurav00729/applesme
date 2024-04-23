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

  const navigateToHomePage = React.useCallback(() => {
    router.replace("/");
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
            localStorage.setItem("user_status", "inactive_user");
            localStorage.setItem("user_email", email);
            navigateToEnterOTP();
          } else {
            navigateToEnterOTP();
          }
          return true;
        })
        .catch((error) => {
          console.error("Login Error:- ", error);
          return false;
        })
        .finally(() => setLoading(false));
    },
    [navigateToHomePage, setAuthToken, makeApiCall, setUser, navigateToEnterOTP]
  );

  const validationSchema = Yup.object().shape({
    business_name: Yup.string().required("Business Name is required"),
    mobile: Yup.string().required("Mobile Number is required"),
    email: Yup.string()
      .email("Invalid  email format")
      .required(" Email is required"),
    business_type: Yup.string().required("Business Type is required"),
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
        <div className="w-full md:w-1/2 ">
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

          <div className=" px-20">
            <div className=" px-2 mr-5  mx-auto max-w-2xl lg:py-6 border border-gray-500 rounded-2xl ">
              <div className=" flex w-full justify-center items-center">
                <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Sign Up
                </h2>
              </div>

              <Formik
                initialValues={INTIAL_VALUES}
                onSubmit={handleSubmit}
                validateOnBlur
                validateOnChange
                validationSchema={validationSchema}
                enableReinitialize
              >
                <Form>
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
                    <p className="my-4  text-base font-medium text-gray-900 dark:text-white">
                      Already have a account? Login
                    </p>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
