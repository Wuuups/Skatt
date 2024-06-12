import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import styles from './header.module.scss'
import Cart from '../Header-Section/Cart'
import Login from '../Header-Section/Login'

export default function Header() {
  const [activeSection, setActiveSection] = useState(null)
  const [visibleSection, setVisibleSection] = useState(null)
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
    if (activeSection) {
      if (activeSection === 'cart') {
        gsap.to([shopBtnRef.current, accountBtnRef.current], {
          pointerEvents: 'none',
          opacity: 0,
          duration: 0.7,
          onComplete: () => {
            gsap.fromTo(
              cartBtnRef.current,
              { position: 'absolute', pointerEvents: 'none', left: '50%' },
              { left: 0, duration: 0.7 }
            )
            gsap.to(closeBtnRef.current, { opacity: 1, duration: 0.7 })
          },
        })
      } else if (activeSection === 'account') {
        gsap.to([shopBtnRef.current, cartBtnRef.current], {
          pointerEvents: 'none',
          opacity: 0,
          duration: 0.7,
          onComplete: () => {
            gsap.fromTo(
              accountBtnRef.current,
              { position: 'absolute', pointerEvents: 'none', left: '50%' },
              { left: 0, duration: 0.7 }
            )
            gsap.to(closeBtnRef.current, { opacity: 1, duration: 0.7 })
          },
        })
      }
    } else {
      gsap.to(closeBtnRef.current, {
        opacity: 0,
        duration: 0.7,
        onComplete: () => {
          gsap.to(cartBtnRef.current, { left: '50%', duration: 0.7 })
          gsap.to(accountBtnRef.current, { left: '100%', duration: 0.7 })
          gsap.to(
            [shopBtnRef.current, accountBtnRef.current, cartBtnRef.current],
            {
              pointerEvents: 'auto',
              opacity: 1,
              duration: 0.7,
            }
          )
        },
      })
    }
  }, [activeSection])

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src="/icons/logoText.svg" alt="Logo" />
      </div>
      <div className={styles.menu}>
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
