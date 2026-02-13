import React from 'react'
import styles from "./Switch.module.css";

const Switch = ({troca, isligth}) => {
  return (
    <div className={isligth ? styles.ligth: ""}>
        <div id={styles.Switch}>
    <button></button>
    <><span></span></>

        </div>
      
    </div>
  );
};

export default Switch;
