// components/PageTransition.js
'use client'
import React, { useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styles from './page-transition.module.scss'


const PageTransition = ({ children }) => {
  const pathname = usePathname()
  const nodeRef = useRef(null)

  useEffect(() => {
    const handleStart = () => {
      gsap.to(nodeRef.current, {
        x: -window.innerWidth,
        duration: 0.5,
        ease: 'power1.inOut',
      })
    }

    const handleComplete = () => {
      gsap.fromTo(
        nodeRef.current,
        { x: window.innerWidth },
        {
          x: 0,
          duration: 0.5,
          ease: 'power1.inOut',
        }
      )
    }

    handleStart()
    handleComplete()
  }, [pathname])

  return (
    <TransitionGroup>
      <CSSTransition
        key={pathname}
        timeout={500}
        classNames={styles.page}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default PageTransition
