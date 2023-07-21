import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import jsCookie from "js-cookie";
import instance from ".";

export const getAllCompetitions = createAsyncThunk(
  "competition/get-all-comps",
  async () => {
    const { data } = await instance.get(
      "/api/Competition/get-competitions-dota2/1/40"
    );
    return data;
  }
);
