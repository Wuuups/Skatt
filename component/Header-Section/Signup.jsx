import React from 'react'
import styles from './signup.module.scss'

export default function Signup() {
  return (
    <form className={styles.loginForm}>
      <div className={styles.formArea}>
        <div className={styles.formGroup}>
          <div>
            <label htmlFor="firstName">First Name</label>
          </div>
          <input type="text" id="firstName" name="firstName" />
        </div>
        <div className={styles.formGroup}>
          <div>
            <label htmlFor="LastName">Last Name</label>
          </div>
          <input type="text" id="LastName" name="LastName" />
        </div>
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
        <div className={styles.formGroup}>
          <div>
            <label htmlFor="retypePassword">Confirm Password</label>
          </div>
          <input type="password" id="retypePassword" name="retypePassword" />
        </div>
      </div>
      <button type="submit" className={styles.loginButton}>
        Signup
      </button>
    </form>
  )
}
