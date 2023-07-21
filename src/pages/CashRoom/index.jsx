import React, { useState } from "react";
import Layout from "../../layout";
import SectionSelector from "./components/SectionSelector";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";

const CashRoom = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  return (
    <Layout>
      <SectionSelector
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      {selectedItem === 1 ? <Deposit /> : null}
      {selectedItem === 2 ? <Withdraw /> : null}
    </Layout>
  );
};

export default CashRoom;
