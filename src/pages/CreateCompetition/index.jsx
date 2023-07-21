import React, { useState } from "react";
import styles from "./createCompetition.module.scss";
import Layout from "../../layout";
import { DatePicker } from "antd";
import { useDispatch } from "react-redux";
import {
  createCompetitionBase,
  createCompetitionDota2,
} from "../../redux/API/competition";

const CompetitionTypes = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "EsportCs" },
  { id: 2, name: "EsportDota2" },
  { id: 3, name: "Football" },
];

const competitionStatusTypes = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "Waiting" },
  { id: 2, name: "Live" },
  { id: 3, name: "Ended" },
];

const CreateCompetition = () => {
  const [statusType, setStatusType] = useState(0);
  const [type, setType] = useState(0);
  const [currentTeam1KillAmount, setCurrentTeam1KillAmount] = useState(0);
  const [currentTeam2KillAmount, setCurrentTeam2KillAmount] = useState(0);
  const [currentTeam1Name, setCurrentTeam1Name] = useState("");
  const [currentTeam2Name, setCurrentTeam2Name] = useState("");
  const [startTime, setStartTime] = useState("");
  const dispatch = useDispatch();

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

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleCurrentTeam1Name = (event) => {
    setCurrentTeam1Name(event.target.value);
  };

  const handleCurrentTeam2Name = (event) => {
    setCurrentTeam2Name(event.target.value);
  };

  const createCompetition = () => {
    const competitionData = dispatch(
      createCompetitionBase({ statusType, type, startTime })
    ).then((data) =>
      dispatch(
        createCompetitionDota2({
          competitionBaseId: data.payload.id,
          team1Name: currentTeam1Name,
          team2Name: currentTeam2Name,
          team1KillAmount: currentTeam1KillAmount,
          team2KillAmount: currentTeam2KillAmount,
        })
      )
    );
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div>
          <p>Team 2 name</p>
          <input
            value={currentTeam1Name}
            onChange={handleCurrentTeam1Name}
          ></input>
        </div>
        <div>
          <p>Team 2 name:</p>
          <input
            value={currentTeam2Name}
            onChange={handleCurrentTeam2Name}
          ></input>
        </div>
        <div>
          <p>Team 1 kill amount:</p>
          <input
            type="number"
            value={currentTeam1KillAmount}
            onChange={handleCurrentTeam1KillAmount}
          ></input>
        </div>
        <div>
          <p>Team 2 kill amount:</p>
          <input
            type="number"
            value={currentTeam2KillAmount}
            onChange={handleCurrentTeam2KillAmount}
          ></input>
        </div>
        <div>
          <p>statusType:</p>
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
        </div>
        <div>
          <p>type:</p>
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
        <div>
          <p>startTime:</p>
          <input
            type="datetime-local"
            value={startTime}
            onChange={handleStartTimeChange}
          ></input>
        </div>
        <button onClick={createCompetition}>Create</button>
      </div>
    </Layout>
  );
};

export default CreateCompetition;
