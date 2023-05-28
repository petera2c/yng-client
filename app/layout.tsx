import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Add your custom layout components or styles here */}
      <header>{/* Your header component */}</header>
      <main>{children}</main>
      <footer>{/* Your footer component */}</footer>
    </div>
  );
};

export default Layout;
