import React, { ReactNode } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
