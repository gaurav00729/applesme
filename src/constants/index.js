import { Home, Search, CircleUserIcon, BadgeInfo, Wrench } from "lucide-react";

export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Home",
    logocmp: <Home />,
  },
  {
    imgURL: "/assets/search.svg",
    route: "/explore",
    label: "Documents",
    logocmp: <Search />,
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/profile",
    label: "Profile",
    logocmp: <CircleUserIcon />,
  },
  {
    imgURL: "/assets/create.svg",
    route: "/about",
    label: "About",
    logocmp: <BadgeInfo />,
  },
  {
    imgURL: "/assets/community.svg",
    route: "/settings",
    label: "Settings",
    logocmp: <Wrench />,
  },
];
