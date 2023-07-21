import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCompetition } from "../../redux/API/competition";
import Competition from "../../components/Competition";

const CompetitionDota2 = () => {
  const [competition, setCompetition] = useState({});

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    const fetchCompetitions = async () => {
      return dispatch(getCompetition(id));
    };

    fetchCompetitions().then((data) => setCompetition(data.payload.data));
  }, []);
  return (
    <Layout>
      <Competition {...competition} />
    </Layout>
  );
};

export default CompetitionDota2;
