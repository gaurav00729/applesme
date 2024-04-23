import { useRouter } from "next/navigation";
import * as React from "react";
import { nextLocalStorage } from "../utils/nextLocalStorage";

export default function useTokenAndRoleCheck() {
  const router = useRouter();

  React.useEffect(() => {
    const token = nextLocalStorage()?.getItem("authToken");
    const role = nextLocalStorage()?.getItem("role");

    if (!token || token === "" || !role || role === "") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      router.replace("/login");
    }
  }, [router]);
}
