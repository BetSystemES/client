import React from "react";
import styles from "./transaction.module.scss";

const cashTypes = [
  { id: 0, name: "Unspecified" },
  { id: 1, name: "Cash" },
  { id: 2, name: "Bonus" },
];
const Transaction = ({ cashType, amount, date }) => {
  const creationTime = new Date(date);
  return (
    <div className={styles.transaction}>
      <p>{String(creationTime.toLocaleString())}</p>
      <p
        className={
          Number(amount) < 0 ? styles.amountColorRed : styles.amountColorGreen
        }
      >
        {Number(amount) < 0
          ? Number(amount).toFixed(2)
          : `+${Number(amount).toFixed(2)}`}
      </p>
      <p>{cashTypes.find((item) => item.id === cashType).name}</p>
    </div>
  );
};

export default Transaction;
