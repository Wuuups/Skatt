import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import styles from './header.module.scss'
import Cart from '../Header-Section/Cart'
import Login from '../Header-Section/Login'

export default function Header() {
  const [activeSection, setActiveSection] = useState(null)
  const [visibleSection, setVisibleSection] = useState(null)
  const menuRef = useRef(null)
  const shopBtnRef = useRef(null)
  const cartBtnRef = useRef(null)
  const accountBtnRef = useRef(null)
  const closeBtnRef = useRef(null)

  const handleButtonClick = (section) => {
    if (activeSection === section) {
      setActiveSection(null)
    } else {
      setActiveSection(section)
      setVisibleSection(section)
    }
  }

  useEffect(() => {
   const menuWidth = menuRef.current ? menuRef.current.offsetWidth : 0

    if (activeSection) {
      if (
        shopBtnRef.current &&
        accountBtnRef.current &&
        cartBtnRef.current &&
        closeBtnRef.current
      ) {
        if (activeSection === 'cart') {
          gsap.to([shopBtnRef.current, accountBtnRef.current], {
            opacity: 0,
            duration: 0.7,
            display: 'none',
            onComplete: () => {
              gsap.to(cartBtnRef.current, { x: -100, duration: 0.7 })
              gsap.to(closeBtnRef.current, {
                opacity: 1,
                display: 'block',
                duration: 0.7,
              })
            },
          })
        } else if (activeSection === 'account') {
          gsap.to([shopBtnRef.current, cartBtnRef.current], {
            opacity: 0,
            duration: 0.7,
            onComplete: () => {
              gsap.to(accountBtnRef.current, { x: -100, duration: 0.7 })
              gsap.to(closeBtnRef.current, {
                opacity: 1,
                display: 'block',
                duration: 0.7,
              })
            },
          })
        }
      }
    } else {
      if (
        shopBtnRef.current &&
        accountBtnRef.current &&
        cartBtnRef.current &&
        closeBtnRef.current
      ) {
        gsap.to(closeBtnRef.current, {
          opacity: 0,
          duration: 0.7,
          onComplete: () => {
            gsap.set(closeBtnRef.current, { display: 'none' })
            gsap.to(cartBtnRef.current, { x: 0, duration: 0.7 })
            gsap.to(accountBtnRef.current, { x: 0, duration: 0.7 })
            gsap.to(
              [shopBtnRef.current, accountBtnRef.current, cartBtnRef.current],
              {
                opacity: 1,
                duration: 0.7,
              }
            )
          },
        })
      }
    }
  }, [activeSection])

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src="/icons/logoText.svg" alt="Logo" />
      </div>
      <div ref={menuRef} className={styles.menu}>
        <div className={styles.links}>
          <button ref={shopBtnRef} onClick={() => handleButtonClick('shop')}>
            Shop
          </button>
          <button ref={cartBtnRef} onClick={() => handleButtonClick('cart')}>
            Cart
          </button>
          <button
            ref={accountBtnRef}
            onClick={() => handleButtonClick('account')}
          >
            Login
          </button>
          <button
            ref={closeBtnRef}
            className={styles.closeBtn}
            onClick={() => handleButtonClick(activeSection)}
          >
            <img src="/icons/close.svg" alt="Close" />
          </button>
        </div>
        <div
          className={`${styles.formContainer} ${
            activeSection ? styles.containerActive : ''
          }`}
        >
          {visibleSection === 'cart' && <Cart />}
          {visibleSection === 'account' && <Login />}
        </div>
      </div>
    </div>
  )
}
