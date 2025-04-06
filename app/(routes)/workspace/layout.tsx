import React from "react";
import WorkspaceHeader from "./_components/WorkspaceHeader";
import WorkspaceSidebar from "./_components/WorkspaceSidebar";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <WorkspaceHeader />
      <div className="flex">
        <WorkspaceSidebar />
        {children}
      </div>
    </div>
  );
};

export default WorkspaceLayout;
