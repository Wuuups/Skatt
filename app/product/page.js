'use client'
import { useEffect, useState, useRef } from 'react'
import styles from './product.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import ProductCard from '@/component/Product-card'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// 暫時
const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// ------ 所需功能 ------ //
// 1.點擊展開商品 done
// 2.滾輪可以將展開的商品關閉 done
// 3.同時間只能有一個商品展開 done
// 4.當前展開的商品會至於頁面中央 half done
// 5.依據箭頭的指向顯示該商品名稱
// 6.頁面高度判定: 確保箭頭能夠指向所有商品

export default function productPage() {
  // 當前頁面展開的商品
  const [expandedIndex, setExpandedIndex] = useState(null)
  const wrapperRef = useRef(null)

  // 點擊時將新商品的index傳入
  const handleExpand = (index) => {
    setExpandedIndex(index)
  }

  // 動畫效果
  useGSAP(() => {
   // wrapper高度
   

  }, [])

  // fetch資料
  useEffect(() => {}, [])

  return (
    <section>
      {/* 此div用於記算高度(箭頭的位置) */}
      <div ref={wrapperRef} className={styles.productWrapper}>
        <div className={styles.pointer}>
        
        </div>
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
