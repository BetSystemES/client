import styles from "./sectionSelector.module.scss";
import { VscArrowCircleUp, VscArrowCircleDown } from "react-icons/vsc";

const sectionList = [
  {
    name: <VscArrowCircleDown className={styles.depositIcon} />,
    label: "Deposit",
    label2: "fee 0%",
    id: 1,
  },
  {
    name: <VscArrowCircleUp className={styles.withdrawIcon} />,
    label: "Withdraw",
    label2: "fee 0%",
    id: 2,
  },
];

const CashRoomSectionSelector = ({ selectedItem, setSelectedItem }) => {
  return (
    <div className={styles.sectionSelector}>
      {sectionList.map((obj) => (
        <button key={obj.id} onClick={() => setSelectedItem(obj.id)}>
          {obj.name}{" "}
          <div className={styles.buttonText}>
            <p>{obj.label}</p>
            <p>{obj.label2}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CashRoomSectionSelector;
