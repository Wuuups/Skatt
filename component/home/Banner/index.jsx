import React from 'react'
import styles from './banner.module.scss'

export default function Banner() {
  return (
    <section>
      <div className={styles.banner}>
        <span>FALLING?</span>
        <br />
        <span>JUST PART OF</span>
        <br />
        <span>THE FUN.</span>
      </div>
      <div className={styles.skateImg}>
        <img className={styles.objFit} src="/images/skateboard.png" />
      </div>
    </section>
  )
}
