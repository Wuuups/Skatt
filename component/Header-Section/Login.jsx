import React from 'react'
import styles from './login.module.scss'

export default function Login() {
  return (
    <form method='post' className={styles.loginForm}>
      <div className={styles.formArea}>
        <div className={styles.formGroup}>
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.formGroup}>
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <input type="password" id="password" name="password" />
        </div>
      </div>
      <button type="submit" className={styles.loginButton}>
        Login
      </button>
    </form>
  )
}
