import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isAdmin } from "../../../redux/API";
import Coefficient from "./Coefficient";
import styles from "./outcome.module.scss";
import { updOutcome } from "../../../redux/API/competition";

const CoefficientGroupTypes = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "OneWinner" },
  { id: 2, name: "TwoWinners" },
];

const Outcome = ({
  id,
  competitionBaseId,
  name,
  coefficients,
  team1Name,
  team2Name,
  type,
}) => {
  const [loading, setLoading] = useState(false);
  const [coefficientStatusType, setCoefficientStatusType] = useState(0);
  const [outcomeName, setOutcomeName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setCoefficientStatusType(coefficients && Number(type));
    setOutcomeName(coefficients && name);
  }, [coefficients]);

  const handleCoefficientGroupTypeChange = (event) => {
    setCoefficientStatusType(event.target.value);
  };

  const handleOutcomeNameChange = (event) => {
    setOutcomeName(event.target.value);
  };

  const updateOutcome = async () => {
    setLoading(true);
    await dispatch(
      updOutcome({
        id,
        competitionBaseId,
        name: outcomeName,
        type: coefficientStatusType,
      })
    );
    setLoading(false);
  };

  return (
    <div className={styles.outcome}>
      {isAdmin() ? (
        <div className={styles.descriptionAdmin}>
          <button onClick={updateOutcome}>
            {loading ? (
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
              "Update Outcome"
            )}
          </button>
          <p>Outcome type:</p>
          <select
            className={styles.coefficientGroupTypes}
            value={coefficientStatusType}
            onChange={handleCoefficientGroupTypeChange}
          >
            {CoefficientGroupTypes.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.name}
              </option>
            ))}
          </select>
          <p>Name:</p>
          <input value={outcomeName} onChange={handleOutcomeNameChange}></input>
        </div>
      ) : (
        <>
          <p className={styles.description}>{name}</p>
        </>
      )}
      <div
        className={isAdmin() ? styles.coefficientsAdmin : styles.coefficients}
      >
        {coefficients &&
          coefficients.map((obj) => (
            <Coefficient
              key={obj.id}
              {...obj}
              team1Name={team1Name}
              team2Name={team2Name}
              name={name}
            />
          ))}
      </div>
    </div>
  );
};

export default Outcome;
