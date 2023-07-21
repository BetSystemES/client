import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.children}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
