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

// ------所需功能------ //
// 1.點擊展開商品
// 2.滾輪可以將展開的商品關閉
// 3.同時間只能有一個商品展開
// 4.當前展開的商品會至於頁面中央
// 5.依據箭頭的指向顯示該商品名稱
// 6.頁面高度判定 確保箭頭能夠指向所有商品

// 方法: 透過設定父元件中的展開狀態以及點擊的商品狀態，將狀態傳入至元件中進行判斷

export default function productPage() {
  // 當前頁面展開的商品
  const [expandedIndex, setExpandedIndex] = useState(null)

  // 點擊時將當前商品的index傳入 並透過props傳至元件中 元件中判斷傳入index是否與該元件index相等
  const handleExpand = (index) => {
    setExpandedIndex(index) // 將當前點擊的商品index傳入
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
        {data.map((index) => {
          return (
            <ProductCard
              key={index}
              index={index} // 當前商品index
              expandedIndex={expandedIndex} // 新商品index
              handleExpand={handleExpand} // 傳遞當前index
            />
          )
        })}
      </div>
    </section>
  )
}
