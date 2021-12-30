import classnames from "classnames"
import React from "react"

import styles from "./Loader.module.scss"

const Loader = (): JSX.Element => (
  <div className={classnames("col-sm-12", "text-center", styles.loader)}>
    <div className={classnames(styles.loadingioSpinner)}>
      <div className={classnames(styles.ldio)}>
        <div></div>
      </div>
    </div>
  </div>
)

export default Loader
