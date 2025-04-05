"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@stackframe/stack";
import { useMutation } from "convex/react";
import React, { useEffect } from "react";
import Loading from "../loading";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const createNewUserMutation = useMutation(api.users.CreateNewUser);
  const createUser = async () => {
    const data = {
      name: user?.displayName || "",
      email: user?.primaryEmail || "",
      picture: user?.profileImageUrl || "",
    };
    useEffect(() => {
      user && createUser();
    }, [user]);
    const result = await createNewUserMutation({ ...data });
    console.log(result)
  };
  return <div>{children}</div>;
};

export default Provider;
