import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout";
import { profile } from "../../redux/API/user";
import { selectUserData } from "../../redux/slices/user";
import Bets from "./componenets/Bets";
import SectionSelector from "./componenets/SectionSelector";
import Transactions from "./componenets/Transactions";
import styles from "./profile.module.scss";

function UserProfile() {
  const [selectedItem, setSelectedItem] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profile());
  }, []);
  const { data, loading } = useSelector(selectUserData);

  return (
    <Layout>
      {data && (
        <div className={styles.profile_card}>
          <p className={styles.email}>{data.email}</p>
          <p className={styles.id}>{data.id}</p>
        </div>
      )}
      <SectionSelector
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      {selectedItem === 1 ? <Bets /> : null}
      {selectedItem === 2 ? <Transactions /> : null}
    </Layout>
  );
}

export default UserProfile;
