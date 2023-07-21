import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import jsCookie from "js-cookie";
import instance from ".";

export const getAllTransactions = createAsyncThunk(
  "cash/get-all-transactions",
  async () => {
    const user = jwt(jsCookie.get("access-token"));
    const { data } = await instance.get(`/api/Cash/transactions/${user.id}`);
    return data;
  }
);
