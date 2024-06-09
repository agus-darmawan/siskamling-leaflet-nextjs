// components/Layout.tsx

import { ReactNode } from "react";

type WithSidebarProps = {
  children: ReactNode;
};

const WithSidebarLayout = ({ children }: WithSidebarProps) => {
  return (
    <main className="mt-24 w-4/5 ml-auto  mr-6 bg-white rounded-md h-[85vh]">
      {children}
    </main>
  );
};

export default WithSidebarLayout;
