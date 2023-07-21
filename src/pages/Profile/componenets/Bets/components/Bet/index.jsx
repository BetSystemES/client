import React from "react";
import styles from "./bet.module.scss";

const payoutStatuses = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "Processing" },
  { id: 2, name: "Paid" },
  { id: 3, name: "Blocked" },
];

const betStatusTypes = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "Win" },
  { id: 2, name: "Lose" },
  { id: 3, name: "Canceled" },
  { id: 4, name: "Blocked" },
];
const Bet = ({ amount, rate, createAtUtc, payoutStatus, betStatusType }) => {
  const creationTime = new Date(createAtUtc);
  return (
    <div className={styles.bet}>
      <p>{String(creationTime.toLocaleString())}</p>
      <p>{amount}</p>
      <p>{Number(rate).toFixed(2)}</p>
      <p>{payoutStatuses.find((item) => item.id === payoutStatus).name}</p>
      <p>{betStatusTypes.find((item) => item.id === betStatusType).name}</p>
    </div>
  );
};

export default Bet;
