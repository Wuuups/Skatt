'use client'
import React from 'react'
import { useState } from 'react'
import styles from './header.module.scss'
import Cart from '../Header-Section/Cart'
import Login from '../Header-Section/Login'
import OrderHistory from '../Header-Section/OrderHistory'
import Signup from '../Header-Section/Signup'

export default function index() {
  const [activeComponent, setActiveComponent] = useState(null)

  const renderComponent = () => {
    switch (activeComponent) {
      case 'cart':
        return <Cart />
      case 'login':
        return <Login />
      case 'orderHistory':
        return <OrderHistory />
      case 'signup':
        return <Signup />
      default:
        return null
    }
  }

  return (
    <>
      <div className={styles['header-container']}>
        <div className={styles['logo']}>
          <img src="/icons/logoText.svg" />
        </div>
        <div className={styles['menu']}>
          <div className={styles['links']}>
            <button onClick={() => setActiveComponent('shop')}>Shop</button>
            <button onClick={() => setActiveComponent('cart')}>Cart</button>
            <button onClick={() => setActiveComponent('login')}>Login</button>
          </div>
          <div className={styles['form-container']}>
            {renderComponent()}
          </div>
          {/* <div className={styles['form-container']}>
            <Cart />
            <Login />
            <OrderHistory />
            <Signup />
          </div> */}
        </div>
      </div>
    </>
  )
}
