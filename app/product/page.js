'use client'
import React from 'react'
import styles from './product.module.scss'
import ProductCard from '@/component/Product-card'

// 卡片距離判定(依當前箭頭判定當前商品) 滾輪事件可以將以展開的商品關閉 當前展開的商品會至於頁面中央

export default function productPage() {
  return (
    <section>
      <div className={styles.productSection}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  )
}
