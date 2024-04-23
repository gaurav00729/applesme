"use client";

import * as React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import Spacer from "@/components/Spacer";
import Label from "@/components/Label";
import FileInput from "@/components/FileInput";
import { LoadingIcon } from "@/assets/Loading";
const INTIAL_VALUES = {
  name: "",
  code: "",
  client_email: "",
  account_manager_email: "",
  end_of_term: "",
  pdf_file: null as File | null,
  address_1: "",
  address_2: "",
  address_3: "",
  address_4: "",
  address_5: "",
};
export default function Mra() {
  const [loading, setLoading] = React.useState(false); // eslint-disable-line

  const handleSubmit = React.useCallback(({}: typeof INTIAL_VALUES) => {}, []);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Client name is required"),
    code: Yup.string().required("Client code is required"),
    client_email: Yup.string()
      .email("Invalid client email format")
      .required("Client email is required"),
    account_manager_email: Yup.string()
      .email("Invalid account manager email format")
      .required("Client account manager email is required"),
    end_of_term: Yup.string().required("Client end of term is required"),
    pdf_file: Yup.mixed().required("File is required"),
    address_1: Yup.string(),
    address_2: Yup.string(),
    address_3: Yup.string(),
    address_4: Yup.string(),
    address_5: Yup.string(),
  });
  return (
    <section className="bg-white ">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 ">
          Create a post
        </h2>
        <Formik
          initialValues={INTIAL_VALUES}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <Spacer size="xs" />

            <Input label="Title" placeholder="Enter Title" name="name" />
            <Spacer size="xs" />
            <Input label="Text" placeholder="Enter Text" name="code" />
            <Spacer size="xs" />
            <Input label="Tags" placeholder="Enter tags" name="client_email" />
            <Spacer size="xs" />
            <Label>Upload Image & Video</Label>
            <FileInput name="pdf_file" type="dropzone" accept=".pdf" />
            <Spacer size="xs" />
            <div className="flex justify-center items-center">
              {loading ? (
                <button
                  disabled
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2  inline-flex items-center"
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
          </Form>
        </Formik>
      </div>
    </section>
  );
}
