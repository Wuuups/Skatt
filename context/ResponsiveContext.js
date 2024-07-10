'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import gsap from 'gsap'

const ResponsiveContext = createContext()

export const ResponsiveProvider = ({ children }) => {
  // 設定尺寸預設值
  const [mediaConditions, setMediaConditions] = useState({
    isSmall: false,
    isMedium: false,
    isLarge: false,
  })

  useEffect(() => {
    const media = gsap.matchMedia()

    media.add(
      {
        isSmall: '(max-width: 375px)',
        isMedium: '(min-width: 376px) and (max-width: 768px)',
        isLarge: '(min-width: 1440px)',
      },
      (context) => {
        setMediaConditions(context.conditions)
      }
    )

    return () => media.revert() // 清理函數
  }, [])

  return (
    <ResponsiveContext.Provider value={mediaConditions}>
      {children}
    </ResponsiveContext.Provider>
  )
}

export const useResponsive = () => useContext(ResponsiveContext)
