'use client'
import { useEffect, useState, useRef, forwardRef } from 'react'
import styles from './product.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import ProductCard from '@/component/Product-card'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// ------ 所需功能 ------ //
// 1.點擊展開商品 done
// 2.滾輪可以將展開的商品關閉 done
// 3.同時間只能有一個商品展開 done
// 4.當前展開的商品會至於頁面中央 done
// 5.頁面高度判定: 確保箭頭能夠指向所有商品
// 6.依據箭頭的指向顯示該商品名稱
// 7.連接至資料庫 done

export default function ProductPage() {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [products, setProducts] = useState([])
  const [cardRect, setCardRect] = useState(0)
  const cardRef = useRef([])
  const wrapperRef = useRef(null)

  // 點擊時將新商品的index傳入元件進行判斷
  const handleExpand = (index) => {
    setExpandedIndex(index)
  }

  // 動畫效果
  useGSAP(() => {}, [])

  // fetch資料
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to fetch products')
        const products = await response.json()
        setProducts(products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section>
      <div className={styles.wrapper} ref={wrapperRef}></div>
      {products.map((product, index) => {
        return (
          <ProductCard
            key={product._id}
            ref={(el) => {
              cardRef.current[index] = el
            }}
            product={product}
            index={index} // 當前商品index
            expandedIndex={expandedIndex} // 新商品index
            handleExpand={handleExpand}
          />
        )
      })}
    </section>
  )
}
