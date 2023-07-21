import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllTransactions } from "../../../../redux/API/transactions";
import Transaction from "./components/Transaction";
import styles from "./transactions.module.scss";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTransactions = async () => {
      return dispatch(getAllTransactions());
    };

    fetchTransactions().then((data) =>
      setTransactions(data.payload.data.transactions)
    );
  }, []);

  console.log(transactions);
  return (
    <div className={styles.home}>
      {transactions.length === 0
        ? null
        : transactions.map((obj) => <Transaction key={obj.id} {...obj} />)}
    </div>
  );
};

export default Transactions;
