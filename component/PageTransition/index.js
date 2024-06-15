'use client'
import React, { useRef, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

const PageTransition = ({ children }) => {
  const pathname = usePathname()

  const currentRef = useRef()
  const newRef = useRef()

  const [prevPath, setPrevPath] = useState(pathname)
  const [isAnimating, setIsAnimating] = useState(false)
  const [content, setContent] = useState(children)
  const [newContent, setNewContent] = useState(null)

  useEffect(() => {
    if (prevPath !== pathname && !isAnimating) {
      setIsAnimating(true)
      const currentNode = currentRef.current
      const newNode = newRef.current

      // 將先前頁面保留
      setNewContent(children)

      if (pathname === '/') {
        // 當前頁面與新頁面同時移動
        gsap.to([currentNode], {
          x: window.innerWidth,
          duration: 0.7,
          ease: 'power1.inOut',

          // 切換結束後設定新的頁面內容
         //  onComplete: () => {
         //    setContent(children)
         //    setPrevPath(pathname)
         //    gsap.fromTo(
         //      newNode,
         //      { x: -window.innerWidth },
         //      {
         //        x: 0,
         //        duration: 0.7,
         //        ease: 'power1.inOut',
         //        onComplete: () => {
         //          setIsAnimating(false)
         //        },
         //      }
         //    )
         //  },
        })
      } else {
        gsap.to([currentNode], {
          x: -window.innerWidth,
          duration: 0.7,
          ease: 'power1.inOut',
          onComplete: () => {
            setContent(children)
            setPrevPath(pathname)
            gsap.fromTo(
              newNode,
              { x: window.innerWidth },
              {
                x: 0,
                duration: 0.7,
                ease: 'power1.inOut',
                onComplete: () => {
                  setIsAnimating(false)
                },
              }
            )
          },
        })
      }
    }
  }, [pathname, prevPath, isAnimating, children])

  return (
    <>
      {/* 此為chileren */}
      <div ref={currentRef} style={{ position: 'absolute', width: '100%' }}>
        {content}
      </div>
      <div ref={newRef} style={{ position: 'absolute', width: '100%' }}>
        {newContent}
      </div>
    </>
  )
}

export default PageTransition
