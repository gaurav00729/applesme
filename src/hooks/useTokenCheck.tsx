import { useRouter } from "next/navigation";
import * as React from "react";
import { nextLocalStorage } from "../utils/nextLocalStorage";

export default function useTokenAndRoleCheck() {
  const router = useRouter();

  React.useEffect(() => {
    const token = nextLocalStorage()?.getItem("authToken");

    if (!token || token === "") {
      localStorage.removeItem("authToken");
      router.replace("/login");
    }
  }, [router]);
}
