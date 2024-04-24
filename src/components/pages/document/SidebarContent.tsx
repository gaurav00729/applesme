import React from "react";
import FileInput from "@/components/FileInput";
import Label from "@/components/Label";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { LoadingIcon } from "@/assets/Loading";
import { UploadDocument } from "@/apis";
import useToast from "@/hooks/useToast";
import useApi from "@/hooks/useApi";

const HomeContent = () => {
  
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const intial_values = {
    file_type: "balance_sheet",
    document: null as FileList | File | null,
  };

  const handleSubmit = React.useCallback(
    ({ file_type, document }: typeof intial_values) => {
      setLoading(true);
      console.log(file_type, "---", document, "SUBMMITTING  nbalance shet");
      return makeApiCall(UploadDocument(file_type, document))
        .then((response) => {
          console.log(response, "RESPONSE OF CONFIRM  PASSWORD AFTER OTP");
          if (response != undefined && response.status == true) {
            showToast(
              response?.message != "" ? response?.message : "Successful",
              { type: "success" }
            );
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
          console.error("upload Error:- ", error);
          return false;
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );

  const validationSchema = Yup.object().shape({
    file_type: Yup.string().required("File type name is required"),
    document: Yup.mixed().required("File is required"),
  });

  return (
    <div className=" h-screen w-3/4 flex   ">
      <div className=" w-[80%] flex flex-col justify-start">
        <p className="my-2 text-xl font-normal font-roboto text-gray-900">
          Balance Sheet
        </p>

        <p className="my-2 text-base font-normal font-roboto text-gray-900">
          Kindly Upload Last 2 Years Audited Financials ( including Notes to
          Accounts and Auditor’s Report )
        </p>

        <div className="mt-5">
          <Formik
            initialValues={intial_values}
            onSubmit={handleSubmit}
            validateOnBlur
            validateOnChange
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form>
              <FileInput name="document" type="dropzone" multiple />

              <div className="flex justify-center items-center mt-10">
                {loading ? (
                  <button
                    disabled
                    type="button"
                    style={{ backgroundColor: "#4EB2EF" }}
                    className=" flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg "
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
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

const LayoutContent = () => {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const intial_values = {
    file_type: "gst",
    document: null as FileList | File | null,
  };

  const handleSubmit = React.useCallback(
    ({ file_type, document }: typeof intial_values) => {
      setLoading(true);
      console.log(file_type, "---", document, "SUBMMITTING  nbalance shet");
      return makeApiCall(UploadDocument(file_type, document))
        .then((response) => {
          console.log(response, "RESPONSE OF CONFIRM  PASSWORD AFTER OTP");
          if (response != undefined && response.status == true) {
            showToast(
              response?.message != "" ? response?.message : "Successful",
              { type: "success" }
            );
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
          console.error("upload Error:- ", error);
          return false;
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );

  const validationSchema = Yup.object().shape({
    file_type: Yup.string().required("File type name is required"),
    document: Yup.mixed().required("File is required"),
  });

  return (
    <div className=" h-screen w-3/4 flex   ">
      <div className=" w-[80%] flex flex-col justify-start">
        <p className="my-2 text-xl font-normal font-roboto text-gray-900">
          Upload all GST Filings
        </p>

        <p className="my-2 text-base font-normal font-roboto text-gray-900">
          Kindly Upload all GST reports, minimum 12 months
        </p>
        <div className="mt-5">
          <Formik
            initialValues={intial_values}
            onSubmit={handleSubmit}
            validateOnBlur
            validateOnChange
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form>
              <FileInput name="document" type="dropzone" multiple />

              <div className="flex justify-center items-center mt-10 ">
                {loading ? (
                  <button
                    disabled
                    type="button"
                    style={{ backgroundColor: "#4EB2EF" }}
                    className=" flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg "
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
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

const SettingsContent = () => {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const intial_values = {
    file_type: "share_holding",
    document: null as FileList | File | null,
  };

  const handleSubmit = React.useCallback(
    ({ file_type, document }: typeof intial_values) => {
      setLoading(true);
      console.log(file_type, "---", document, "SUBMMITTING  nbalance shet");
      return makeApiCall(UploadDocument(file_type, document))
        .then((response) => {
          console.log(response, "RESPONSE OF CONFIRM  PASSWORD AFTER OTP");
          if (response != undefined && response.status == true) {
            showToast(
              response?.message != "" ? response?.message : "Successful",
              { type: "success" }
            );
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
          console.error("upload Error:- ", error);
          return false;
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );

  const validationSchema = Yup.object().shape({
    file_type: Yup.string().required("File type name is required"),
    document: Yup.mixed().required("File is required"),
  });

  return (
    <div className=" h-screen w-3/4 flex   ">
      <div className=" w-[80%] flex flex-col justify-start">
        <p className="my-2 text-xl font-normal font-roboto text-gray-900">
          Upload all Share Holding Pattern
        </p>

        <p className="my-2 text-base font-normal font-roboto text-gray-900">
          Kindly Upload all Share Holding Pattern
        </p>
        <div className="mt-5">
          <Formik
            initialValues={intial_values}
            onSubmit={handleSubmit}
            validateOnBlur
            validateOnChange
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form>
              <FileInput name="document" type="dropzone" multiple />

              <div className="flex justify-center items-center mt-10 ">
                {loading ? (
                  <button
                    disabled
                    type="button"
                    style={{ backgroundColor: "#4EB2EF" }}
                    className=" flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg "
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
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

const LoanProfile = () => {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const intial_values = {
    file_type: "loan",
    document: null as FileList | File | null,
  };

  const handleSubmit = React.useCallback(
    ({ file_type, document }: typeof intial_values) => {
      setLoading(true);
      console.log(file_type, "---", document, "SUBMMITTING  nbalance shet");
      return makeApiCall(UploadDocument(file_type, document))
        .then((response) => {
          console.log(response, "RESPONSE OF CONFIRM  PASSWORD AFTER OTP");
          if (response != undefined && response.status == true) {
            showToast(
              response?.message != "" ? response?.message : "Successful",
              { type: "success" }
            );
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
          console.error("upload Error:- ", error);
          return false;
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );

  const validationSchema = Yup.object().shape({
    file_type: Yup.string().required("File type name is required"),
    document: Yup.mixed().required("File is required"),
  });

  return (
    <div className=" h-screen w-3/4 flex   ">
      <div className=" w-[80%] flex flex-col justify-start">
        <p className="my-2 text-xl font-normal font-roboto text-gray-900">
          Upload all Loan Document
        </p>

        <p className="my-2 text-base font-normal font-roboto text-gray-900">
          Kindly upload all pre-existing loan details.{" "}
          <a
            href="https://storage.googleapis.com/sme_sampledocs/Loan%20Profile.xlsx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Click here to download sample format
          </a>
        </p>

        <div className="mt-5">
          <Formik
            initialValues={intial_values}
            onSubmit={handleSubmit}
            validateOnBlur
            validateOnChange
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form>
              <FileInput name="document" type="dropzone" multiple />

              <div className="flex justify-center items-center mt-10 ">
                {loading ? (
                  <button
                    disabled
                    type="button"
                    style={{ backgroundColor: "#4EB2EF" }}
                    className=" flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg "
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
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

const BankStatement = () => {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const intial_values = {
    file_type: "bank_statement",
    document: null as FileList | File | null,
  };

  const handleSubmit = React.useCallback(
    ({ file_type, document }: typeof intial_values) => {
      setLoading(true);
      console.log(file_type, "---", document, "SUBMMITTING  nbalance shet");
      return makeApiCall(UploadDocument(file_type, document))
        .then((response) => {
          console.log(response, "RESPONSE OF CONFIRM  PASSWORD AFTER OTP");
          if (response != undefined && response.status == true) {
            showToast(
              response?.message != "" ? response?.message : "Successful",
              { type: "success" }
            );
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
          console.error("upload Error:- ", error);
          return false;
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );

  const validationSchema = Yup.object().shape({
    file_type: Yup.string().required("File type name is required"),
    document: Yup.mixed().required("File is required"),
  });

  return (
    <div className=" h-screen w-3/4 flex   ">
      <div className=" w-[80%] flex flex-col justify-start">
        <p className="my-2 text-xl font-normal font-roboto text-gray-900">
          Upload all Bank Statements
        </p>

        <p className="my-2 text-base font-normal font-roboto text-gray-900">
          Kindly upload previous 1 year bank statements.{" "}
        </p>
        <div className="mt-5">
          <Formik
            initialValues={intial_values}
            onSubmit={handleSubmit}
            validateOnBlur
            validateOnChange
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form>
              <FileInput name="document" type="dropzone" multiple />

              <div className="flex justify-center items-center mt-10 ">
                {loading ? (
                  <button
                    disabled
                    type="button"
                    style={{ backgroundColor: "#4EB2EF" }}
                    className=" flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg "
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
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
const Default = () => {
  const [loading, setLoading] = React.useState(false);
  const { makeApiCall } = useApi();
  const { showToast } = useToast();

  const intial_values = {
    file_type: "document",
    document: null as FileList | File | null,
  };

  const handleSubmit = React.useCallback(
    ({ file_type, document }: typeof intial_values) => {
      setLoading(true);
      console.log(file_type, "---", document, "SUBMMITTING  nbalance shet");
      return makeApiCall(UploadDocument(file_type, document))
        .then((response) => {
          console.log(response, "RESPONSE OF CONFIRM  PASSWORD AFTER OTP");
          if (response != undefined && response.status == true) {
            showToast(
              response?.message != "" ? response?.message : "Successful",
              { type: "success" }
            );
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
          console.error("upload Error:- ", error);
          return false;
        })
        .finally(() => setLoading(false));
    },
    [makeApiCall, showToast]
  );

  const validationSchema = Yup.object().shape({
    file_type: Yup.string().required("File type name is required"),
    document: Yup.mixed().required("File is required"),
  });

  return (
    <div className=" h-screen w-3/4 flex   ">
      <div className=" w-[80%] flex flex-col justify-start">
        <p className="my-2 text-2xl font-normal font-roboto text-gray-900">
          Upload all GST Filings
        </p>

        <p className="my-2 text-xl font-normal font-roboto text-gray-900">
          Kindly Upload all GST reports, minimum 12 months
        </p>
        <div className="">
          <Formik
            initialValues={intial_values}
            onSubmit={handleSubmit}
            validateOnBlur
            validateOnChange
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form>
              <FileInput name="document" type="dropzone" multiple />

              <div className="flex justify-center items-center mt-10 ml-16">
                {loading ? (
                  <button
                    disabled
                    type="button"
                    style={{ backgroundColor: "#4EB2EF" }}
                    className=" flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg "
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
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

interface Props {
  option?: string;
}

const SidebarContent = ({ option }: Props) => {
  switch (option) {
    case "Home":
      return <HomeContent />;
    case "Gst":
      return <LayoutContent />;
    case "Board":
      return <SettingsContent />;
    case "Loan":
      return <LoanProfile />;
    case "Bank":
      return <BankStatement />;
    default:
      return <Default />;
  }
};

export default SidebarContent;
