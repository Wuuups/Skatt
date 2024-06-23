import React from 'react'
import styles from './footer.module.scss'

const Footer = () => {
  return (
    <div className={styles['footer-container']}>
      <div className={styles['footer-top']}>
        <div className={styles['logo']}>
          <img src="/icons/logo.svg" />
        </div>
        <div className={styles['links']}>
          <div>
            <button>Home</button>
          </div>
          <div>
            <button>Shop</button>
          </div>
          <div>
            <button>Contact</button>
          </div>
        </div>
      </div>
      <div className={styles['footer-bottom']}>
        <div className={styles['section']}>
          ©2024 Skatt. All rights reserved
        </div>
        <div className={styles['section']}>Terms & Conditions</div>
        <div className={styles['section']}>
          <div>Back to Top</div>
          <div>Privacy Policy</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
