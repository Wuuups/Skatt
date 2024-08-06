'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './spirit.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Spirit() {
  const imagesRef = useRef([])
  const spiritRef = useRef(null)
  const textRef = useRef(null)
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: spiritRef.current,
        start: 'top top',
        end: '+=900px',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    imagesRef.current.forEach((img, index) => {
      tl.fromTo(img, { opacity: 0 }, { opacity: 1 }, index * 0.5)
    })
    tl.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1 },
      imagesRef.current.length * 0.5
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section>
      <div className={styles.spiritContainer} ref={spiritRef}>
        <div className={styles.imgContainer}>
          {[...Array(9)].map((_, index) => (
            <img
              key={index}
              ref={(el) => (imagesRef.current[index] = el)}
              src={`/images/frame${index + 1}.png`}
            />
          ))}
        </div>
        <div className={styles.sripit} ref={textRef}>
          At SKATT, we believe in pushing boundaries and embracing the thrill of
          the ride. Our boards are more than just a means of transportation;
          they are a symbol of creativity, resilience, and the unyielding
          pursuit of excellence. Join us, and become a part of a community that
          values individuality, innovation, and the endless possibilities of the
          open streets.
        </div>
      </div>
    </section>
  )
}
