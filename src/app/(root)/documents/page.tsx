"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import SidebarContent from "../../../components/pages/document/SidebarContent"; // Importing the component to display
import {
  BanknoteIcon,

  MessageSquareText,
  MonitorSpeaker,
} from "lucide-react";

const Documents = () => {
  const [selectedOption, setSelectedOption] = useState(""); // State to manage selected option

  const handleOptionClick = (option: any) => {
    setSelectedOption(option); // Set selected option when clicked
  };

  return (
    <section>
      <div className="h-screen flex overflow-hidden">
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
                <HomeIcon className="h-5 w-5" />
                Balance Sheet
              </Link>
              <Link
                className={`flex items-center justify-start p-4 gap-2 text-sm font-medium ${
                  selectedOption === "Gst" ? "bg-gray-100" : ""
                }`}
                href="#"
                onClick={() => handleOptionClick("Gst")}
              >
                <LayoutIcon className="h-5 w-5" />
                GST
              </Link>
              <Link
                className={`flex items-center justify-start p-4 gap-2 text-sm font-medium ${
                  selectedOption === "Board" ? "bg-gray-100" : ""
                }`}
                href="#"
                onClick={() => handleOptionClick("Board")}
              >
                <MessageSquareText className="h-5 w-5" />
                Board Resolution
              </Link>
              <Link
                className={`flex items-center justify-start p-4 gap-2 text-sm font-medium ${
                  selectedOption === "Loan" ? "bg-gray-100" : ""
                }`}
                href="#"
                onClick={() => handleOptionClick("Loan")}
              >
                <MonitorSpeaker className="h-5 w-5" />
                Loan Profile
              </Link>
              <Link
                className={`flex items-center justify-start p-4 gap-2 text-sm font-medium ${
                  selectedOption === "Bank" ? "bg-gray-100" : ""
                }`}
                href="#"
                onClick={() => handleOptionClick("Bank")}
              >
                <BanknoteIcon className="h-5 w-5" />
                Bank Statements
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
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center flex flex-col gap-2">
                {/* Render the selected component */}
                {selectedOption && <SidebarContent option={selectedOption} />}
              </div>
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

function SettingsIcon(props: any) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
