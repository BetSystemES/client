import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BetCreationModal from "../../../../components/Modal";
import styles from "./competition.module.scss";

const competitionStatusTypes = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "Waiting ⌛", color: "#fca311" },
  { id: 2, name: "Live ●", color: "#E40C42" },
  { id: 3, name: "Ended ✅", color: "#1CF847" },
];

const Competition = ({ id, team1Name, team2Name, competitionBase }) => {
  const [open, setOpen] = useState(false);
  const [currentCoefficientId, setCurrentCoefficientId] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentRate, setCurrentRate] = useState("");

  const navigate = useNavigate();

  const currentCoeffGroup = competitionBase.coefficientGroups[0];
  const coeff1 = currentCoeffGroup.coefficients[0];
  const coeff2 = currentCoeffGroup.coefficients[1];
  const coeff1rate = coeff1.rate;
  const coeff2rate = coeff2.rate;
  const coeff1Id = coeff1.id;
  const coeff2Id = coeff2.id;
  const coeff1description = coeff1.description;
  const coeff2description = coeff2.description;

  const startTime = new Date(competitionBase.startTime);
  const competitionId = id;
  const statusType = competitionBase.statusType;
  const currentStatusType = competitionStatusTypes.find(
    (item) => item.id === statusType
  );

  return (
    <>
      <div
        className={styles.competition}
        onClick={() => navigate(`/competition/${competitionId}`)}
      >
        <div className={styles.datetime}>
          {String(startTime.toLocaleString())}
        </div>
        <p
          className={styles.statusType}
          style={{ color: currentStatusType.color }}
        >
          {currentStatusType.name}
        </p>
        <div className={styles.teamName}>{team1Name}</div>
        <div
          className={styles.coefficient}
          onClick={(event) => {
            setCurrentCoefficientId(coeff1Id);
            setCurrentDescription(coeff1description);
            setCurrentRate(coeff1rate);
            setOpen(true);
            event.stopPropagation();
          }}
        >
          {Number(coeff1rate).toFixed(2)}
        </div>
        <p className={styles.vs}>VS</p>
        <div
          className={styles.coefficient}
          onClick={(event) => {
            setCurrentCoefficientId(coeff2Id);
            setCurrentDescription(coeff2description);
            setCurrentRate(coeff2rate);
            setOpen(true);
            event.stopPropagation();
          }}
        >
          {Number(coeff2rate).toFixed(2)}
        </div>
        <div className={styles.teamName}>{team2Name}</div>
      </div>
      <BetCreationModal
        setOpen={setOpen}
        coefficientId={currentCoefficientId}
        open={open}
        description={currentDescription}
        rate={currentRate}
        team1Name={team1Name}
        team2Name={team2Name}
      />
    </>
  );
};

export default Competition;
