import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session } = useSession();

  return session?.user;
};

export const useCurrentUserSession = () => {
  const { data: session, status } = useSession();

  return { user: session?.user, loading: status === "loading" };
};
