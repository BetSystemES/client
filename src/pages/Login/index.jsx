import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout";
import { login, register } from "../../redux/API/user";
import styles from "./login.module.scss";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Login", email, password);
    await dispatch(login({ email, password }));
    navigate("/");
  };

  return (
    <Layout>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <p className={styles.login}>Login</p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}
