"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import SidebarContent from "../../../components/pages/document/SidebarContent"; // Importing the component to display
import {
  BanknoteIcon,
  MessageSquareText,
  MonitorSpeaker,
  CircleCheckBig,
  Hourglass,
  HourglassIcon,
} from "lucide-react";
import useApi from "@/hooks/useApi";
import { getDocumentsData } from "@/apis";
import { DocumentStatus } from "@/types";

const Documents = () => {
  const [selectedOption, setSelectedOption] = useState("Home");
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>({});

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const { makeApiCall } = useApi();

  const getAllDataAGG = React.useCallback(() => {
    return makeApiCall(getDocumentsData())
      .then((response) => {
        console.log(response.data, "ERS response of all dat");
        setDocumentStatus(response?.data);
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      })
      .finally(() => {});
  }, [makeApiCall]);

  React.useEffect(() => {
    getAllDataAGG();
  }, [makeApiCall]);

  return (
    <section>
      <div className="h-screen flex overflow-hidden ml-10">
        <div className="hidden md:flex flex-col w-60 border-r border-gray-200 ">
          <div className="flex flex-1 flex-col overflow-auto">
            <div className="flex-1 flex flex-col gap-1.5">
              <Link
                className={`flex items-center justify-start p-4 gap-2 text-sm font-medium ${
                  selectedOption === "Home"
                    ? "bg-gray-100"
                    : " dark:bg-gray-800"
                }`}
                href="#"
                onClick={() => handleOptionClick("Home")}
              >
                {documentStatus && documentStatus?.balance_sheet == 1 ? (
                  <CircleCheckBig />
                ) : (
                  <HourglassIcon />
                )}
                <p className="font-roboto text-base text-black">
                  Balance Sheet
                </p>
              </Link>
              <Link
                className={`flex items-center justify-start p-4 gap-2 text-sm font-medium ${
                  selectedOption === "Gst" ? "bg-gray-100" : ""
                }`}
                href="#"
                onClick={() => handleOptionClick("Gst")}
              >
                {documentStatus && documentStatus?.gst == 1 ? (
                  <CircleCheckBig />
                ) : (
                  <HourglassIcon />
                )}
                <p className="font-roboto text-base text-black">GST</p>
              </Link>
              <Link
                className={`flex items-center justify-start p-4 gap-2 text-sm font-medium ${
                  selectedOption === "Board" ? "bg-gray-100" : ""
                }`}
                href="#"
                onClick={() => handleOptionClick("Board")}
              >
                {documentStatus && documentStatus?.share_holding == 1 ? (
                  <CircleCheckBig />
                ) : (
                  <HourglassIcon />
                )}
                <p className="font-roboto text-base text-black">
                  Share Holding Pattern
                </p>
              </Link>
              <Link
                className={`flex items-center justify-start p-4 gap-2 text-sm font-medium ${
                  selectedOption === "Loan" ? "bg-gray-100" : ""
                }`}
                href="#"
                onClick={() => handleOptionClick("Loan")}
              >
                {documentStatus && documentStatus?.loan == 1 ? (
                  <CircleCheckBig />
                ) : (
                  <HourglassIcon />
                )}
                <p className="font-roboto text-base text-black">Loan Profile</p>
              </Link>
              <Link
                className={`flex items-center justify-start p-4 gap-2 text-sm font-medium ${
                  selectedOption === "Bank" ? "bg-gray-100" : ""
                }`}
                href="#"
                onClick={() => handleOptionClick("Bank")}
              >
                {documentStatus && documentStatus?.bank_statement == 1 ? (
                  <CircleCheckBig />
                ) : (
                  <HourglassIcon />
                )}
                <p className="font-roboto text-base text-black">
                  Bank Statements
                </p>
              </Link>
            </div>
            <div className="border-t border-gray-200 ">
              <Button
                className="w-full justify-start text-left pl-4"
                variant="ghost"
              >
                Edit profile
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex-1 flex items-center justify-center">
              {selectedOption && <SidebarContent option={selectedOption} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documents;

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LayoutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <line x1="9" x2="9" y1="21" y2="9" />
    </svg>
  );
}
