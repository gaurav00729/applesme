"use client";
import useTokenAndRoleCheck from "@/hooks/useTokenCheck";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Home: React.FC = () => {
  useTokenAndRoleCheck();
  const router = useRouter();

  const navigateToDocuments = React.useCallback(() => {
    router.push(`documents`);
  }, [router]);

  return (
    <div>
      <div className="container h-screen mx-auto py-10">
        <div className="flex flex-col justify-center ">
          <h1 className="text-2xl font-semibold mb-4 font-roboto  text-black mx-16">
            Apple SME Program
          </h1>

          <p className="p-8 mx-10 text-lg font-roboto font-normal text-black ">
            Apple Inc and Connect have launched a leasing program specially
            designed for Indian Small and Medium Enterprises. This is a
            tail-made product, enabling SMEs to convert their upfront asset
            procument costs to monthly/quarterly/semi-annually EMIs, enabling
            better cashflow management for business.
          </p>

          <h1 className="text-xl font-medium mb-4 font-roboto  text-black mx-16">
            Key Benefits:
          </h1>
          <ul className="list-disc pl-4 mb-4 mx-20">
            <li className="mb-2">Capex to Opex</li>
            <li className="mb-2">Easy Payment Options</li>
            <li className="mb-2">Reduced Costs of Procurement and Usage</li>
            <li className="mb-2">Wide variety of Apple Products covered</li>
            <li className="mb-2">Tax Benefits</li>
            <li>Easy replacement and end of tenure process</li>
          </ul>

          <p className="p-8 mx-10 text-lg font-roboto font-normal text-black ">
            For more information, please get in touch with your partner. To
            start leasing, kindly upload the documents through the link below
          </p>

          <div className="w-full flex justify-center items-center">
            <button
              style={{ backgroundColor: "#4EB2EF", width: "20%" }}
              className=" focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg  "
              onClick={navigateToDocuments}
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
                Start Application
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
