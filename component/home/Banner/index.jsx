'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import React from 'react'
import styles from './banner.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Banner() {
  const imgRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 0,
        end: '+=1000px',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    tl.fromTo(imgRef.current, { x: 0 }, { x: window.innerWidth * 1.5 })
  }, [])

  return (
    <section>
      <div className={styles.bannerContainer} ref={containerRef}>
        <div className={styles.slogon}>
          FALLING?
          <br />
          JUST PART OF
          <br />
          THE FUN.
        </div>
        <div className={styles.skateImg}>
          <img
            className={styles.objFit}
            ref={imgRef}
            src="/images/skateboard.png"
          />
        </div>
      </div>
    </section>
  )
}
