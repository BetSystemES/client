import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from ".";
import jwt from "jwt-decode";
import jsCookie from "js-cookie";
import { useParams } from "react-router-dom";

export const getCompetition = createAsyncThunk(
  "competition/get-one",
  async (id) => {
    const { data } = await instance.get(`/api/Competition/competition/${id}`);
    return data;
  }
);

export const depositToCoefficient = createAsyncThunk(
  "deposit-to-coefficient",
  async ({ coefficientId, amount }) => {
    const user = jwt(jsCookie.get("access-token"));
    const { data } = await instance.post(
      `/api/Competition/deposit-to-coefficient`,
      { coefficientId, amount, userId: user.id }
    );
    return data;
  }
);

export const updateCompetitionDota2 = createAsyncThunk(
  "update-competition",
  async () => {
    const { data } = await instance.post(
      `/api/Competition/update-competition`,
      {}
    );
    return data;
  }
);

export const updCoefficient = createAsyncThunk(
  "update-coefficient",
  async ({
    id,
    coefficientGroupId,
    description,
    rate,
    statusType,
    amount,
    probability,
    outcomeType,
  }) => {
    const { data } = await instance.post(
      `/api/Competition/update-coefficient`,
      {
        id,
        coefficientGroupId,
        description,
        rate,
        statusType,
        amount,
        probability,
        outcomeType,
      }
    );
    return data;
  }
);

export const updOutcome = createAsyncThunk(
  "update-outcome",
  async ({ id, competitionBaseId, name, type }) => {
    const { data } = await instance.post(`/api/Competition/update-outcome`, {
      id,
      competitionBaseId,
      name,
      type,
    });
    return data;
  }
);

export const updCompetitionBase = createAsyncThunk(
  "update-competition-base",
  async ({ id, statusType, type, startTime }) => {
    const { data } = await instance.post(
      `/api/Competition/update-competition-base`,
      {
        id,
        statusType,
        type,
        startTime,
      }
    );
    return data;
  }
);

export const updCompetitionDota2 = createAsyncThunk(
  "update-competition-dota2",
  async ({
    id,
    competitionBaseId,
    team1Id,
    team2Id,
    team1Name,
    team2Name,
    team1KillAmount,
    team2KillAmount,
    totalTime,
  }) => {
    const { data } = await instance.post(
      `/api/Competition/update-competition-dota2`,
      {
        id,
        competitionBaseId,
        team1Id,
        team2Id,
        team1Name,
        team2Name,
        team1KillAmount,
        team2KillAmount,
        totalTime,
      }
    );
    return data;
  }
);

export const createCompetitionBase = createAsyncThunk(
  "create/competition-base",
  async ({ statusType, type, startTime }) => {
    const { data } = await instance.post(
      `/api/Competition/create-competition-base`,
      {
        statusType,
        type,
        startTime,
      }
    );
    return data;
  }
);

export const createCompetitionDota2 = createAsyncThunk(
  "create/competition-dota2",
  async ({
    competitionBaseId,
    team1Name,
    team2Name,
    team1KillAmount,
    team2KillAmount,
  }) => {
    const { data } = await instance.post(
      `/api/Competition/create-competition-dota2`,
      {
        competitionModel: {
          competitionBaseId,
          team1Id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          team2Id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          team1Name,
          team2Name,
          team1KillAmount,
          team2KillAmount,
          totalTime: "2023-05-30T13:30:00.418Z",
        },
      }
    );
    return data;
  }
);
