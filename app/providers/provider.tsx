"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import React, { useEffect, useState } from "react";

type UserType = Doc<"users">;
const Provider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const [userDetail, setuserDetail] = useState<UserType>();
  const createNewUserMutation = useMutation(api.users.CreateNewUser);
  const createUser = async () => {
    const data = {
      name: user?.displayName || "",
      email: user?.primaryEmail || "",
      picture: user?.profileImageUrl || "",
    };
    const result = await createNewUserMutation({ ...data });
    if (typeof result === "object" && "_id" in result) {
      setuserDetail(result as UserType);
    }
  };
  useEffect(() => {
    user && createUser();
  }, [user]);
  return (
    <div>
      <UserDetailContext.Provider value={{ userDetail, setuserDetail }}>
        {children}
      </UserDetailContext.Provider>
    </div>
  );
};

export default Provider;
