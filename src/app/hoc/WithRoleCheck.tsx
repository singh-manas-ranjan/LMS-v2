import { ReactNode, ComponentType } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const withRoleCheck = <P extends object>(
  WrappedComponent: ComponentType<P>,
  role: "student" | "instructor" | "admin"
) => {
  const RoleCheckComponent = async (props: P) => {
    const session = await auth();

    if (!session || session.user?.role !== role) {
      redirect("/forbidden");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return RoleCheckComponent;
};

export default withRoleCheck;
