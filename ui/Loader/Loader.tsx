import classnames from "classnames"
import React from "react"

import styles from "./Loader.module.scss"

export const Loader = (): JSX.Element => (
  <div className={styles.loader}>
    <div className={classnames(styles.loadingioSpinner)}>
      <div className={classnames(styles.ldio)}>
        <div></div>
      </div>
    </div>
  </div>
)

export default Loader
