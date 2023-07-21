import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBets } from "../../../../redux/API/bets";
import Bet from "./components/Bet";
import styles from "./bets.module.scss";

const Bets = () => {
  const [bets, setBets] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBets = async () => {
      return dispatch(getAllBets());
    };

    fetchBets().then((data) => setBets(data.payload.data));
  }, []);

  return (
    <div className={styles.home}>
      {bets && bets.map((obj) => <Bet key={obj.id} {...obj} />)}
    </div>
  );
};

export default Bets;
