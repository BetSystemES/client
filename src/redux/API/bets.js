import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import jsCookie from "js-cookie";
import instance from ".";

export const getAllBets = createAsyncThunk("bet/get-all-bets", async () => {
  const user = jwt(jsCookie.get("access-token"));
  const { data } = await instance.get(
    `/api/Bet/get-bets/${user.id}?page=1&pageSize=10`
  );
  return data;
});
