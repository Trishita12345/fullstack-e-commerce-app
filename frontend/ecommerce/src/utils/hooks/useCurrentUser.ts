"use client";

import { User } from "@/constants/types";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { useEffect, useState } from "react";
import { useAuthActions } from "../store/auth";

export function useCurrentUser() {
  const [loading, setLoading] = useState(true);
  const { setUserInfo } = useAuthActions();
  const [user, setUser] = useState<User | undefined>(undefined);

  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();
      setUserInfo(data);
      setUser(data);

    } catch (error) {
      setUserInfo(undefined);
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return { loading, isLoggedIn: !!user };
}