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

export default function DashHeader() {
  const router = useRouter();

  const handleLogout = React.useCallback(() => {
    localStorage.clear();
    router.replace("/info");
  }, [router]);

  return (
    <Navbar isBordered className=" ">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4"></NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3 "></NavbarContent>
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
          <DropdownMenu aria-label="Profile Actions" variant="flat" className="bg-cyan-50 border rounded-md">
            <DropdownItem key="profile" className="h-14 gap-2 " >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">apple.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
