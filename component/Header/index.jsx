'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import styles from './header.module.scss'
import Cart from '../Header-Section/Cart'
import Login from '../Header-Section/Login'

const Header = () => {
  const [activeSection, setActiveSection] = useState(null)
  const [visibleSection, setVisibleSection] = useState(null)
  const shopBtnRef = useRef(null)
  const cartBtnRef = useRef(null)
  const accountBtnRef = useRef(null)
  const closeBtnRef = useRef(null)

  const router = useRouter()

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
        gsap.to(cartBtnRef.current, {
          pointerEvents: 'none',
        })
        gsap.to([shopBtnRef.current, accountBtnRef.current], {
          pointerEvents: 'none',
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.fromTo(
              cartBtnRef.current,
              {
                pointerEvents: 'none',
                transform: 'translateX(-50%)',
              },
              { left: 0, duration: 0.7, transform: 'translateX(0)' }
            )
            gsap.to(closeBtnRef.current, {
              pointerEvents: 'auto',
              opacity: 1,
              duration: 0.7,
              delay: 0.5,
            })
          },
        })
      } else if (activeSection === 'account') {
        gsap.to(accountBtnRef.current, {
          pointerEvents: 'none',
        })
        gsap.to([shopBtnRef.current, cartBtnRef.current], {
          pointerEvents: 'none',
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.fromTo(
              accountBtnRef.current,
              {
                pointerEvents: 'none',
                transform: 'translateX(-100%)',
              },
              { left: 0, duration: 0.7, transform: 'translateX(0)' }
            )
            gsap.to(closeBtnRef.current, {
              pointerEvents: 'auto',
              opacity: 1,
              duration: 0.7,
              delay: 0.5,
            })
          },
        })
      }
    }
    if (activeSection === null) {
      gsap.to(closeBtnRef.current, {
        pointerEvents: 'none',

        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.to(cartBtnRef.current, {
            left: '50%',
            transform: 'translateX(-50%)',
            duration: 0.7,
          })
          gsap.to(accountBtnRef.current, {
            left: '100%',
            duration: 0.7,
            transform: 'translateX(-100%)',
          })
          gsap.to(
            [shopBtnRef.current, accountBtnRef.current, cartBtnRef.current],
            {
              pointerEvents: 'auto',
              opacity: 1,
              duration: 0.5,
              delay: 0.5,
            }
          )
        },
      })
    }
  }, [activeSection])

  return (
    <div className={styles.headerContainer}>
      <div
        className={styles.logo}
        onClick={() => {
          router.push('/')
        }}
      >
        <img src="/icons/logoText.svg" alt="Logo" />
      </div>
      <div className={styles.menu}>
        <div className={styles.links}>
          <button
            ref={shopBtnRef}
            onClick={() => {
              router.push('/product')
            }}
          >
            Shop
          </button>
          <button
            ref={cartBtnRef}
            className={styles.cartBtn}
            onClick={() => handleButtonClick('cart')}
          >
            Cart
          </button>
          <button
            ref={accountBtnRef}
            className={styles.accountBtn}
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

export default Header