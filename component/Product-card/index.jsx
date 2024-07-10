import { useEffect, useRef } from 'react'
import styles from './product-card.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useResponsive } from '@/context/ResponsiveContext'

// 動畫處理: 縮放 & 展開
// 動畫觸發: 點擊展開 滑動關閉

// bonus: 動畫執行時減緩滾動速度

export default function ProductCard({
  index, // 該商品index
  expandedIndex, // 新商品index
  handleExpand, // 函式引用
}) {
  // 引入尺寸
  const { isSmall } = useResponsive()
  // 綁定元素
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const infoRef = useRef(null)
  const tl = useRef(null)

  useGSAP(() => {
    // 商品的展開關閉動畫
    tl.current = gsap
      .timeline({
        defaults: { ease: 'power3.inOut', duration: 1.2 },
        paused: true,
        // 動畫完成後清除樣式
        onReverseComplete: () => {
          gsap.set([cardRef.current, imgRef.current, infoRef.current], {
            clearProps: 'all',
          })
        },
      })
      .to(
        // 商品容器放至最大
        cardRef.current,
        {
          width: 'calc(100vw - 56px)',
          height: isSmall ? '100vh' : 'calc(100vh - 128px)',
        },
        0
      )
      .to(
        // 圖片容器只有商品容器的一半
        imgRef.current,
        {
          width: isSmall ? '100%' : '50%',
          // 控制hover效果
          onStart: () => {
            imgRef.current.classList.remove(styles.expand)
          },
          onReverseComplete: () => {
            imgRef.current.classList.add(styles.expand)
          },
        },
        0
      )
      .to(
        // 商品資訊最後顯示
        infoRef.current,
        {
          width: isSmall ? '100%' : '50%',
          display: 'flex',
          opacity: 1,
          duration: 0.3,
        }
      )
  }, [isSmall])

  // 執行判定
  useEffect(() => {
    if (expandedIndex === index) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [index, expandedIndex])

  return (
    <div className={styles.container} onClick={() => handleExpand(index)}>
      <div ref={cardRef} className={styles.cardWrapper}>
        <div ref={imgRef} className={`${styles.imgWrapper} ${styles.expand}`}>
          <img src="/product-images/testimg.png" />
        </div>
        <div ref={infoRef} className={styles.infoWrapper}>
          <div className={styles.productName}>
            Colored Campbell's Soup Eggplant
          </div>
          <div className={styles.productInfo}>
            <p className={styles.title}>Open Edition</p>
            <p>
              In the early sixties, Andy Warhol created many works depicting
              consumer products, Hollywood stars, and a highly publicized series
              illustrating death and disaster in American society. As one of the
              most recognized faces in contemporary art, it seemed obvious for
              us to try and perpetuate Andy Warhol’s vision through our
              production. That’s why we recently collaborated with the Andy
              Warhol Foundation for the Visual Arts to produce a series of
              Andy’s most iconic works: Colored Campbell's Soup Cans. Under
              license from The Andy Warhol Foundation for the Visual Arts, Inc.
            </p>
          </div>
          <div className={styles.productOptions}>
            <div className={styles.productPrice}>$7,217.00</div>
            <div className={styles.productNum}>
              <div>
                <img src="/icons/minus.svg" />
              </div>
              <div>1</div>
              <div>
                <img src="/icons/plus.svg" />
              </div>
            </div>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
