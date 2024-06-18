'use client'
import React, { useRef, useState, useLayoutEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'

const PageTransition = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()

  const currentRef = useRef()
  const newRef = useRef()

  const [prevPath, setPrevPath] = useState(pathname)
  const [isAnimating, setIsAnimating] = useState(false)
  const [content, setContent] = useState(children) // 當前頁面
  const [newContent, setNewContent] = useState(null) // 切換路由後的新內容

  useLayoutEffect(() => {
    if (prevPath !== pathname && !isAnimating) {
      setIsAnimating(true)
      const currentNode = currentRef.current // 當前頁面
      const newNode = newRef.current // 新頁面

      const handleComplete = () => {
        setNewContent(children)
        setPrevPath(pathname)
        setIsAnimating(false)
        router.push(pathname)
      }

      // 創建動畫
      const tl = gsap.timeline({ onComplete: handleComplete })

      // 退出動畫
      tl.fromTo(
        currentNode,
        { x: 0 },
        {
          x: pathname === '/' ? -window.innerWidth : window.innerWidth,
          duration: 0.7,
          ease: 'power1.inOut',
        }
      )

      // 進入動畫
      tl.fromTo(
        newNode,
        { x: pathname === '/' ? window.innerWidth : -window.innerWidth },
        { x: 0, duration: 0.7, ease: 'power1.inOut' },
        0
      )
    }
  }, [pathname, prevPath, isAnimating, children])

  return (
    <>
      {/* 新內容舊內容同時存在 */}
      <div
        ref={currentRef}
        style={{
          position: 'absolute',
          width: '100%',
        }}
      >
        {content}
      </div>
      <div
        ref={newRef}
        style={{
          position: 'absolute',
          width: '100%',
        }}
      >
        {newContent}
      </div>
    </>
  )
}

export default PageTransition
