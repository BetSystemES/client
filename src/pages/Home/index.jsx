import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../layout";
import { getAllCompetitions } from "../../redux/API/competitions";
import Competition from "./components/Competition";
import styles from "./home.module.scss";

const Home = () => {
  const [competitions, setCompetitions] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompetitions = async () => {
      return dispatch(getAllCompetitions());
    };

    fetchCompetitions().then((data) => setCompetitions(data.payload.data));
  }, []);

  return (
    <Layout>
      <div className={styles.home}>
        {competitions &&
          competitions.map((obj) =>
            obj.competitionBase.coefficientGroups.length !== 0 ? (
              <Competition key={obj.id} {...obj} />
            ) : null
          )}
      </div>
    </Layout>
  );
};

export default Home;
