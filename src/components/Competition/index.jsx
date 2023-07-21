import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isAdmin } from "../../redux/API";
import {
  updateCompetitionDota2,
  updCompetitionBase,
  updCompetitionDota2,
} from "../../redux/API/competition";
import styles from "./competition.module.scss";
import Outcome from "./Outcome";

const competitionStatusTypes = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "Waiting" },
  { id: 2, name: "Live" },
  { id: 3, name: "Ended" },
];

const CompetitionTypes = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "EsportCs" },
  { id: 2, name: "EsportDota2" },
  { id: 3, name: "Football" },
];

const Competition = ({
  id,
  competitionBaseId,
  team1Name,
  team2Name,
  competitionBase,
  team1KillAmount,
  team2KillAmount,
  team1Id,
  team2Id,
  totalTime,
}) => {
  const [loadingCompetitionBase, setLoadingCompetitionBase] = useState(false);
  const [loadingCompetitionDota2, setLoadingCompetitionDota2] = useState(false);
  const [statusType, setStatusType] = useState(0);
  const [type, setType] = useState(0);
  const [currentTeam1KillAmount, setCurrentTeam1KillAmount] = useState(0);
  const [currentTeam2KillAmount, setCurrentTeam2KillAmount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setStatusType(competitionBase && Number(competitionBase.statusType));
    setType(competitionBase && Number(competitionBase.type));
    setCurrentTeam1KillAmount(competitionBase && Number(team1KillAmount));
    setCurrentTeam2KillAmount(competitionBase && Number(team2KillAmount));
  }, [competitionBase]);

  const idCompetitionBase = competitionBase && competitionBase.id;
  const startTime = new Date(competitionBase && competitionBase.startTime);
  const outcomes = competitionBase && competitionBase.coefficientGroups;

  const updateCompetition = () => {
    const competition = {};
    dispatch(updateCompetitionDota2(competition));
  };

  const handleCurrentTeam2KillAmount = (event) => {
    setCurrentTeam2KillAmount(event.target.value);
  };

  const handleCurrentTeam1KillAmount = (event) => {
    setCurrentTeam1KillAmount(event.target.value);
  };

  const handleStatusTypeChange = (event) => {
    setStatusType(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const updateCompetitionBase = async () => {
    setLoadingCompetitionBase(true);
    await dispatch(
      updCompetitionBase({
        id: idCompetitionBase,
        statusType,
        type,
        startTime,
      })
    );
    setLoadingCompetitionBase(false);
  };

  const updateCompetitionDota2 = async () => {
    setLoadingCompetitionDota2(true);
    await dispatch(
      updCompetitionDota2({
        id,
        competitionBaseId,
        team1Id,
        team2Id,
        team1Name,
        team2Name,
        team1KillAmount: currentTeam1KillAmount,
        team2KillAmount: currentTeam2KillAmount,
        totalTime,
      })
    );
    setLoadingCompetitionDota2(false);
  };

  return (
    <div className={styles.competition}>
      <div className={styles.info}>
        <div className={styles.startTime}>
          {String(startTime.toLocaleString())}
        </div>
        <div className={styles.teams}>
          <p className={styles.teamName}>{team1Name}</p>
          <p className={styles.vs}>VS</p>
          <p className={styles.teamName}>{team2Name}</p>
        </div>
        {isAdmin() ? (
          <>
            <button
              className={styles.updateAdmin}
              onClick={updateCompetitionDota2}
            >
              {loadingCompetitionDota2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="200px"
                  height="200px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#e15b64"
                    stroke-width="10"
                    r="35"
                    stroke-dasharray="164.93361431346415 56.97787143782138"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0 50 50;360 50 50"
                      keyTimes="0;1"
                    ></animateTransform>
                  </circle>
                </svg>
              ) : (
                "Update competition"
              )}
            </button>
            <div className={styles.scoreAdmin}>
              <input
                className={styles.inputAdmin}
                type="number"
                value={currentTeam1KillAmount}
                onChange={handleCurrentTeam1KillAmount}
              ></input>
              <p>:</p>
              <input
                className={styles.inputAdmin}
                type="number"
                value={currentTeam2KillAmount}
                onChange={handleCurrentTeam2KillAmount}
              ></input>
            </div>
          </>
        ) : (
          <>
            <div className={styles.score}>
              {team1KillAmount}:{team2KillAmount}
            </div>
          </>
        )}
      </div>
      {isAdmin() ? (
        <div className={styles.adminInfo}>
          <button onClick={updateCompetitionBase}>
            {loadingCompetitionBase ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="#e15b64"
                  stroke-width="10"
                  r="35"
                  stroke-dasharray="164.93361431346415 56.97787143782138"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                  ></animateTransform>
                </circle>
              </svg>
            ) : (
              "Update competition base"
            )}
          </button>
          <p>Status type:</p>
          <select
            className={styles.competitionStatusTypes}
            value={statusType}
            onChange={handleStatusTypeChange}
          >
            {competitionStatusTypes.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.name}
              </option>
            ))}
          </select>
          <p>Competition type:</p>
          <select
            className={styles.competitionTypes}
            value={type}
            onChange={handleTypeChange}
          >
            {CompetitionTypes.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      {outcomes &&
        outcomes.map((obj) => (
          <Outcome
            key={obj.id}
            {...obj}
            team1Name={team1Name}
            team2Name={team2Name}
          />
        ))}
    </div>
  );
};

export default Competition;
