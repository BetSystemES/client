import styles from "./withdraw.module.scss";
import React, { useState } from "react";
import card from "../../../../assets/card.png";
import InputMask from "react-input-mask";
import { useDispatch } from "react-redux";
import { withdrawTransaction } from "../../../../redux/API/cash";

const Withdraw = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const withdraw = async () => {
    setLoading(true);
    await dispatch(withdrawTransaction(amount));
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <img src={card} className={styles.card}></img>
        <InputMask
          className={styles.card_number}
          mask="9999   9999   9999   9999"
        ></InputMask>
        <InputMask className={styles.cvv} mask="999"></InputMask>
      </div>
      <div className={styles.form}>
        <input
          maxLength="8"
          placeholder="Amount"
          onChange={handleAmountChange}
        ></input>
        <button onClick={withdraw}>
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
            "Withdraw"
          )}
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
