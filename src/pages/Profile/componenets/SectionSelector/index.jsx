import styles from "./sectionSelector.module.scss";

let sectionList = [
  { name: "Bets", id: 1 },
  { name: "Transactions", id: 2 },
];

const SectionSelector = ({ selectedItem, setSelectedItem }) => {
  return (
    <div className={styles.sectionSelector}>
      {sectionList.map((obj) => (
        <button key={obj.id} onClick={() => setSelectedItem(obj.id)}>
          {obj.name}
        </button>
      ))}
    </div>
  );
};

export default SectionSelector;
