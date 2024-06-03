import React from 'react'
import styles from './header.module.scss'

export default function index() {
  return (
    <>
      <div className={styles['header-container']}>
        <div className={styles['logo']}>
          <img src="/icons/logoText.svg" />
        </div>
        <div className={styles['menu']}>
          <button>Shop</button>
          <button>Cart</button>
          <button>Login</button>
        </div>
      </div>
    </>
  )
}
