import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { FiRefreshCw } from "react-icons/fi";
import { getBalance } from "../../redux/API/cash";
import { isAdmin, isUser } from "../../redux/API";
import jsCookie from "js-cookie";

const Header = () => {
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [balance, setBalance] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchBalance = async () => {
    return dispatch(getBalance());
  };

  const refreshBalance = async () => {
    setLoadingRefresh(true);
    await fetchBalance().then((data) => setBalance(data.payload.data));
    setLoadingRefresh(false);
  };

  useEffect(() => {
    refreshBalance();
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <p className={styles.logo}>Fantastic bets</p>
      </div>
      <div className={styles.center}>
        <p onClick={() => navigate(`/`)}>CS:GO</p>
        <p>DOTA 2</p>
      </div>
      <div className={styles.right}>
        {isAdmin() ? (
          <p className={styles.adminPanel} onClick={() => navigate(`/admin`)}>
            Admin
          </p>
        ) : null}
        {isUser() ? (
          <>
            {loadingRefresh ? (
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
              <FiRefreshCw
                className={styles.refresh}
                onClick={refreshBalance}
              />
            )}
            <p className={styles.balance}>{Number(balance).toFixed(2)}</p>
            <button
              onClick={() => {
                navigate(`/cash-room`);
              }}
            >
              CashRoom 🔥
            </button>
            <AiOutlineUser
              className={styles.profile}
              onClick={() => navigate(`/profile`)}
            />
            <button
              onClick={() => {
                jsCookie.remove("access-token");
                navigate(`/`);
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate(`/login`)}>Login in</button>
            <button onClick={() => navigate(`/register`)}>Register</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
