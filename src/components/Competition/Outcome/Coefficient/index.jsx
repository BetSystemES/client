import { TbLockAccess } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import styles from "./coefficient.module.scss";
import BetCreationModal from "../../../Modal";
import { isAdmin } from "../../../../redux/API";
import { useDispatch } from "react-redux";
import { updCoefficient } from "../../../../redux/API/competition";

const coefficientStatusTypes = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "Active" },
  { id: 2, name: "Completed" },
  { id: 3, name: "Blocked" },
];

const coefficientOutcomeTypes = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "Win" },
  { id: 2, name: "Lose" },
  { id: 3, name: "Canceled" },
  { id: 4, name: "Blocked" },
];

const Coefficient = ({
  id,
  description,
  rate,
  amount,
  statusType,
  outcomeType,
  probability,
  coefficientGroupId,
  team1Name,
  team2Name,
  name,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [coefficientProbability, setCoefficientProbability] = useState(0);
  const [coefficientOutcomeType, setCoefficientOutcomeType] = useState(0);
  const [coefficientStatusType, setCoefficientStatusType] = useState(0);
  const [coefficientDescription, setCoefficientDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setCoefficientProbability(probability);
    setCoefficientOutcomeType(outcomeType);
    setCoefficientStatusType(statusType);
    setCoefficientDescription(description);
  }, []);

  const handleCoefficientProbabilityChange = (event) => {
    setCoefficientProbability(event.target.value);
  };

  const handleCoefficientOutcomeTypeChange = (event) => {
    setCoefficientOutcomeType(event.target.value);
  };

  const handleCoefficientStatusTypeChange = (event) => {
    setCoefficientStatusType(event.target.value);
  };

  const handleCoefficientDescriptionChange = (event) => {
    setCoefficientDescription(event.target.value);
  };

  const updateCoefficient = async () => {
    setLoading(true);
    await dispatch(
      updCoefficient({
        id,
        coefficientGroupId,
        description: coefficientDescription,
        rate,
        statusType: coefficientStatusType,
        amount,
        probability: coefficientProbability,
        outcomeType: coefficientOutcomeType,
      })
    );
    setLoading(false);
  };

  return (
    <>
      {isAdmin() ? (
        <div className={styles.coefficientAdmin}>
          <button onClick={updateCoefficient}>
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
              "Update Coefficient"
            )}
          </button>
          <p>Status type:</p>
          <select
            value={coefficientStatusType}
            onChange={handleCoefficientStatusTypeChange}
          >
            {coefficientStatusTypes.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.name}
              </option>
            ))}
          </select>
          <p>Outcome type:</p>
          <select
            value={coefficientOutcomeType}
            onChange={handleCoefficientOutcomeTypeChange}
          >
            {coefficientOutcomeTypes.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.name}
              </option>
            ))}
          </select>
          <p>Description :</p>
          <input
            value={coefficientDescription}
            onChange={handleCoefficientDescriptionChange}
          ></input>
          <p>Probability :</p>
          <input
            value={coefficientProbability}
            onChange={handleCoefficientProbabilityChange}
            type="number"
          ></input>
          <p>Coefficient :</p>
          <p className={styles.rate}>{Number(rate).toFixed(2)}</p>
          <TbLockAccess className={styles.block} title="Block coefficient" />
        </div>
      ) : (
        <>
          {coefficientStatusType === 3 ? (
            <div
              className={`${styles.coefficient} ${styles.blocked}`}
              onClick={() => {
                setOpen(true);
              }}
            >
              <p className={styles.description}>{description}</p>
              <p>{coefficientProbability}%</p>
              <p className={styles.rate}>{Number(rate).toFixed(2)}</p>
            </div>
          ) : (
            <div
              className={styles.coefficient}
              onClick={() => {
                setOpen(true);
              }}
            >
              <p className={styles.description}>{description}</p>
              <p>{coefficientProbability}%</p>
              <p className={styles.rate}>{Number(rate).toFixed(2)}</p>
            </div>
          )}
        </>
      )}
      <BetCreationModal
        setOpen={setOpen}
        coefficientId={id}
        open={open}
        description={description}
        rate={rate}
        team1Name={team1Name}
        team2Name={team2Name}
        name={name}
      />
    </>
  );
};

export default Coefficient;
