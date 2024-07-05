'use client'
import { useEffect, useState, useRef } from 'react'
import styles from './product.module.scss'
import ProductCard from '@/component/Product-card'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 暫時資料
const data = [
  <ProductCard />,
  <ProductCard />,
  <ProductCard />,
  <ProductCard />,
  <ProductCard />,
  <ProductCard />,
  <ProductCard />,
  <ProductCard />,
  <ProductCard />,
  <ProductCard />,
  <ProductCard />,
]

// 卡片距離判定(依箭頭判定當前商品)
// 滾輪可以將展開的商品關閉
// 當前展開的商品會至於頁面中央
// 同時間只能有一個商品展開
// 依據箭頭的指向顯示該商品名稱

export default function productPage() {

  useGSAP(() => {

  })

  return (
    <section>
      <div className={styles.productSection}>
        {data.map((product, i) => {
          return (
            <>
              <div key={i}>{product}</div>
            </>
          )
        })}
      </div>
    </section>
  )
}
