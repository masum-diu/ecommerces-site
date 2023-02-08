import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.lds}>
      <div></div>
      <h1>Loading</h1>
      <div></div>
    </div>
  );
};

export default Loader;
