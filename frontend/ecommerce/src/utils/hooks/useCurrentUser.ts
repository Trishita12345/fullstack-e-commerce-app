"use client";

import { User } from "@/constants/types";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    
    const fetchUser = async () => {
        try {
            const data = await getCurrentUser();
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, isLoggedIn: !!user };
}