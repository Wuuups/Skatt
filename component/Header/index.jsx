import React, { useState, useRef, useEffect } from 'react'
import styles from './header.module.scss'
import Cart from '../Header-Section/Cart'
import Login from '../Header-Section/Login'

export default function Header() {
  const [activeSection, setActiveSection] = useState(null)

  const handleButtonClick = (section) => {
    setActiveSection(prev => (prev === section ? null : section))
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src="/icons/logoText.svg" alt="Logo" />
      </div>
      <div className={`${styles.menu} ${activeSection ? styles.active : ''}`}>
        <div className={styles.links}>
          <button className={`${styles.shopBtn} shopBtn`}>Shop</button>
          <button
            className={`${styles.cartBtn} cartBtn`}
            onClick={() => handleButtonClick('cart')}
          >
            Cart
          </button>
          <button
            className={`${styles.accountBtn} accountBtn`}
            onClick={() => handleButtonClick('account')}
          >
            Login
          </button>
          <button
            className={`${styles.closeBtn} closeBtn`}
            onClick={() => handleButtonClick(null)}
          >
            X
          </button>
        </div>
        <div className={`${styles.section} ${activeSection === 'cart' ? styles.open : ''}`}>
          <div className={styles.formContainer}>
            <Cart />
          </div>
        </div>
        <div className={`${styles.section} ${activeSection === 'account' ? styles.open : ''}`}>
          <div className={styles.formContainer}>
            <Login />
          </div>
        </div>
      </div>
    </div>
  )
}
