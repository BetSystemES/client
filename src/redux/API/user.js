import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import jsCookie from "js-cookie";
import instance from ".";

export const register = createAsyncThunk("auth/register", async (params) => {
  const { data } = await instance.post("/api/Auth/create-user", {
    ...params,
    roleIds: ["c0aa94e8-a7c6-4746-bda4-9ea142babcd7"],
  });
  return data;
});

export const login = createAsyncThunk("auth/login", async (params) => {
  const { data } = await instance.post("/api/Auth/login", params);
  console.log(data);
  jsCookie.set("access-token", data.data.accessToken);
  return data;
});

export const profile = createAsyncThunk("profile", async (params) => {
  const user = jwt(jsCookie.get("access-token"));
  const { data } = await instance.post("/api/Auth/get-user", {
    userId: user.id,
  });
  return data;
});
