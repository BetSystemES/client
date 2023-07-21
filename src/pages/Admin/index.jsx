import React from "react";
import Layout from "../../layout";
import styles from "./admin.module.scss";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={styles.buttons}>
        <button onClick={() => navigate("/admin/create-competition")}>
          Create competition
        </button>
        <button>Users</button>
      </div>
    </Layout>
  );
};

export default Admin;
