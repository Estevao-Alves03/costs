import React from "react";
import loadingImage from "../../img/loading.svg"; 
import styles from "./loading.module.css";

function Loading() {
  return (
    <div className={styles.loader_container}>
      <img className={styles.loader} src={loadingImage} alt="loading" />
    </div>
  );
}

export default Loading;
