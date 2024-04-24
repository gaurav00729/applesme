// components/Header.js
"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { Logo } from "../../../assets/Logo";
import { SearchIcon } from "../../../assets/Search";
import { Add } from "@/assets/Add";
import Image from "next/image";
import Man from "../../../assets/images/man.png";
import { useRouter } from "next/navigation";
import { nextLocalStorage } from "@/utils/nextLocalStorage";

export default function DashHeader() {
  const router = useRouter();

  const handleLogout = React.useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();
    router.replace("/signup");
  }, [router]);
  const name = nextLocalStorage()?.getItem("name") ?? "";

  return (
    <Navbar isBordered className=" ">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4"></NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3 ">
          <h1 className="text-base font-roboto mb-4 font-semibold mt-5  text-black mx-8">
            {name && name != "" ? `Welcome ${name}` : "Welcome"}
          </h1>
        </NavbarContent>
      </NavbarContent>
      <NavbarContent as="div" className="items-center  mr-5 mt-5" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Link>
              {" "}
              <Image
                height={40}
                width={40}
                src={Man}
                alt="man"
                className="shadow-md rounded-sm border"
              />
            </Link>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            className="bg-cyan-50  border rounded-md"
          >
            <DropdownItem key="profile" className="h-14 gap-2 ">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {" "}
                {name && name != "" ? `${name}` : "Welcome"}
              </p>
            </DropdownItem>

            <DropdownItem
              className="text-black font-roboto text-base"
              key="logout"
              color="danger"
              onClick={handleLogout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
