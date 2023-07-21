import React, { useState } from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { depositToCoefficient } from "../../redux/API/competition";
import { StyleProvider } from "@ant-design/cssinjs";
import styles from "./betCreationModal.module.scss";
import "./modal.scss";

const BetCreationModal = ({
  setOpen,
  coefficientId,
  open,
  description,
  rate,
  team1Name,
  team2Name,
  name,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [possibeAmount, setPossibleAmount] = useState("");
  const dispatch = useDispatch();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setPossibleAmount(Number(rate) * Number(event.target.value));
  };

  const handleOk = async () => {
    await dispatch(depositToCoefficient({ coefficientId, amount }));
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <StyleProvider hashPriority="high">
        <Modal
          className={styles.modal}
          title="Bet"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p className={styles.teams}>
            {team1Name} VS {team2Name}
          </p>
          <div>
            <div>
              <p>{name}</p>
              <p>{description}</p>
            </div>
            <div>
              <div>
                <p>{Number(rate).toFixed(2)}</p>
                <input
                  value={amount}
                  onChange={handleAmountChange}
                  maxLength="7"
                ></input>
              </div>
              <p>Possible income: {Number(possibeAmount).toFixed(2)}</p>
            </div>
          </div>
        </Modal>
      </StyleProvider>
    </>
  );
};

export default BetCreationModal;
