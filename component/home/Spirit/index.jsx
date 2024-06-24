'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './spirit.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Spirit() {
  useEffect(() => {}, [])
  return (
    <section>
      <div className={styles.spiritContainer}>
        <div className={styles.imgContainer}>
          <img src="/images/frame1.png" />
          <img src="/images/frame2.png" />
          <img src="/images/frame3.png" />
          <img src="/images/frame4.png" />
          <img src="/images/frame5.png" />
          <img src="/images/frame6.png" />
          <img src="/images/frame7.png" />
        </div>
        <p>
          At SKATT, we believe in pushing boundaries and embracing the thrill of
          the ride. Our boards are more than just a means of transportation;
          they are a symbol of creativity, resilience, and the unyielding
          pursuit of excellence. Join us, and become a part of a community that
          values individuality, innovation, and the endless possibilities of the
          open streets.
        </p>
      </div>
    </section>
  )
}
