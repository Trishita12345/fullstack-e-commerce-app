"use client";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { useEffect, useState } from "react";
import { useAuthActions, useUserInfo } from "../store/auth";

export function useCurrentUser() {
  const [loading, setLoading] = useState(true);
  const { setUserInfo } = useAuthActions();
  const user = useUserInfo();

  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();
      setUserInfo(data);
    } catch (error) {
      setUserInfo(undefined);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return { loading, isLoggedIn: !!user };
}