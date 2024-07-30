'use client'
import { useEffect, useState, useRef } from 'react'
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
// 5.頁面高度判定: 確保箭頭能夠指向所有商品 done
// 6.依據箭頭的指向顯示該商品名稱
// 7.連接至資料庫

export default function ProductPage() {
  // 當前頁面展開的商品
  const [expandedIndex, setExpandedIndex] = useState(null)
  // 儲存函式中取得的高度
  const [cardLength, setCardLength] = useState(0)
  // 顯示的品名稱
  const [productName, setProductName] = useState('')
  // 商品編號
  const [productIndex, setProductIndex] = useState(1)

  const [products, setProducts] = useState([])
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const pointerRef = useRef(null)
  const cardRef = useRef([])
  const triggersRef = useRef([])

  // 點擊時將新商品的index傳入
  const handleExpand = (index) => {
    setExpandedIndex(index)
  }

  // 計算pointer大小
  const updateLayout = () => {
    // 渲染後執行
    if (cardRef.current[0]) {
      const cardLength = cardRef.current[0].offsetHeight
      setCardLength(cardLength)
      const y = window.innerHeight - 156 - cardLength - 207
      gsap.set(pointerRef.current, { height: cardLength })
      gsap.set(wrapperRef.current, {
        marginTop: -cardLength,
        paddingBottom: y,
      })
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateLayout)
    return () => {
      window.removeEventListener('resize', updateLayout)
    }
  }, [])

  // 動畫效果
  useGSAP(() => {
    updateLayout()

    // 清理現有的 ScrollTrigger 但僅限於該父元件
    triggersRef.current.forEach((trigger) => trigger.kill())
    triggersRef.current = []

    cardRef.current.forEach((ref, index) => {
      if (cardLength) {
        const trigger = ScrollTrigger.create({
          markers: true,
          trigger: ref,
          start: `top ${100 + cardLength}px`,
          end: `bottom ${100}px`,
          onEnter: () => {
            // console.log('enter', products[index].name) 
            const nextName = products[index].name
            setProductName(nextName)
            setProductIndex(index + 1)
          },
        })
        triggersRef.current.push(trigger)
      }
    })
  }, [cardLength, products])

  // fetch資料
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to fetch products')
        const products = await response.json()
        setProducts(products)
        //   console.log(products[0].name)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section>
      {/* 此div用於記算高度(箭頭的位置) */}
      <div ref={containerRef} className={styles.container}>
        <div ref={pointerRef} className={styles.pointer}>
          <div>
            {/* 商品名稱 */}
            <div>{productName}</div>
            {/* 商品編號 */}
            <div>{productIndex}</div>
          </div>
        </div>
        <div ref={wrapperRef} className={styles.productWrapper}>
          {products.map((product, index) => {
            return (
              <div
                key={product._id}
                ref={(el) => {
                  cardRef.current[index] = el
                }}
              >
                <ProductCard
                  products={product}
                  index={index} // 當前商品index
                  expandedIndex={expandedIndex} // 新商品index
                  handleExpand={handleExpand}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
