import { ComponentType } from "react";
import { redirect } from "next/navigation";
import { currentRole } from "@/lib/auth-session";

const withRoleCheck = <P extends object>(
  WrappedComponent: ComponentType<P>,
  role: "student" | "instructor" | "admin"
) => {
  const RoleCheckComponent = async (props: P) => {
    const currentUserRole = await currentRole();

    if (!currentUserRole || currentUserRole !== role) {
      redirect("/forbidden");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return RoleCheckComponent;
};

export default withRoleCheck;
