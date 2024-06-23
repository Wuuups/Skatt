'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import stylse from './spirit.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Spirit() {
  useEffect(() => {}, [])
  return (
    <div className={stylse.spiritContainer}>
      <div>
        <img src="/icons/logo.svg" />
      </div>
      <div>
        At SKATT, we believe in pushing boundaries and embracing the thrill of
        the ride. Our boards are more than just a means of transportation; they
        are a symbol of creativity, resilience, and the unyielding pursuit of
        excellence. Join us, and become a part of a community that values
        individuality, innovation, and the endless possibilities of the open
        streets.
      </div>
    </div>
  )
}
