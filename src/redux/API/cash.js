import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import jsCookie from "js-cookie";
import instance from ".";

export const getBalance = createAsyncThunk("cash/get-balance", async () => {
  const user = jwt(jsCookie.get("access-token"));
  const { data } = await instance.get(`/api/Cash/get-balance/${user.id}`);
  return data;
});

export const depositTransaction = createAsyncThunk(
  "cash/deposit",
  async (amount) => {
    const user = jwt(jsCookie.get("access-token"));
    const { data } = await instance.post(`/api/Cash/deposit`, {
      profileId: user.id,
      transactionApis: [{ cashType: 1, amount: amount }],
    });
    return data;
  }
);

export const withdrawTransaction = createAsyncThunk(
  "cash/withdraw",
  async (amount) => {
    const user = jwt(jsCookie.get("access-token"));
    const { data } = await instance.post(`/api/Cash/withdraw`, {
      profileId: user.id,
      transactionApis: [{ cashType: 1, amount: amount }],
    });
    return data;
  }
);
