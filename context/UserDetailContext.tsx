import { Doc } from "@/convex/_generated/dataModel";
import { createContext } from "react";
type UserType = Doc<"users">;
export const UserDetailContext = createContext({} as { userDetail: UserType; setuserDetail: Function });