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
        isSmall: '(max-width: 576px)',
        isMedium: '(min-width: 577px) and (max-width: 1200px)',
        isLarge: '(min-width: 1201px)',
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
