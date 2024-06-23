'use client'
import styles from './marquee.module.scss'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Marquee() {
  const text = (
    <>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
      <img src="/icons/logo.svg" />
      <p>SKATT</p>
    </>
  )
  const firstText = useRef(null)
  const secondText = useRef(null)
  const slider = useRef(null)
  let xPercent = 0
  let direction = -1
  let x

  useEffect(() => {
    const animation = () => {
      if (xPercent <= -100) {
        xPercent = 0
      }
      if (xPercent > 0) {
        xPercent = -100
      }
      gsap.set(firstText.current, { xPercent: xPercent })
      gsap.set(secondText.current, { xPercent: xPercent })
      xPercent += 0.06 * direction
      requestAnimationFrame(animation)
    }

    requestAnimationFrame(animation)

    const trigger = ScrollTrigger.create({
      trigger: slider.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.25,
      onUpdate: (self) => {
        direction = self.direction === 1 ? -1 : 1
      //   x = '-300px'
      },
    })

    return () => {
      trigger.kill()
      cancelAnimationFrame(animation)
    }
  }, [])

  return (
    <div className={styles.sliderContainer}>
      <div ref={slider} className={styles.slider}>
        <div ref={firstText}>{text}</div>
        <div ref={secondText}>{text}</div>
      </div>
    </div>
  )
}
