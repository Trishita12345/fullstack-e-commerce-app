"use client";

import { User } from "@/constants/types";
import { useCurrentUser } from "@/utils/hooks/useCurrentUser";

import { useRouter } from "next/navigation";

export interface LoggedInProps {
  user: User;
}
export interface LoggedOutProps {
  redirectToLogin: () => void;
}

const LoginComponent = ({
  LoggedInComponent,
  NotLoggedInComponent,
}: {
  LoggedInComponent: any;
  NotLoggedInComponent: any;
}) => {
  const { user } = useCurrentUser();
  const router = useRouter();

  return (
    <>
      {user ? (
        <LoggedInComponent user={user} />
      ) : (
        <NotLoggedInComponent redirectToLogin={() => router.push(`/login?redirectUrl=${encodeURIComponent(window.location.href)}`)} />
      )}
    </>
  );
};

export default LoginComponent;
