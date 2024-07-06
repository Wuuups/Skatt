'use client'
import { useEffect, useState, useRef } from 'react'
import styles from './product.module.scss'
import ProductCard from '@/component/Product-card'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 暫時
const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// 卡片距離判定(依箭頭判定當前商品)
// 滾輪可以將展開的商品關閉
// 當前展開的商品會至於頁面中央
// 同時間只能有一個商品展開
// 依據箭頭的指向顯示該商品名稱

export default function productPage() {
  // 展開狀態
  const [isExpand, setIsExpand] = useState(false)

  // 切換展開
  const handleExpand = () => {
    setIsExpand(true)
  }

  // 動畫效果
  useGSAP(() => {})

  // fetch資料
  useEffect(() => {}, [])

  return (
    <section>
      {/* 此div用於記算高度(箭頭的位置) */}
      <div className={styles.productWrapper}>
        <div className={styles.arrow}></div>
        {data.map((i) => {
          return <ProductCard key={i} />
        })}
      </div>
    </section>
  )
}
