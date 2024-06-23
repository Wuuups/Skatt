import React from 'react'
import styles from './banner.module.scss'

export default function Banner() {
  return (
    <div>
      <div className={styles.banner}>
        FALLING?
        <br />
        JUST PART OF
        <br />
        THE FUN.
      </div>
      <div className={styles.skateImg}>
        <img className={styles.objFit} src="/images/skateboard.png" />
      </div>
    </div>
  )
}
