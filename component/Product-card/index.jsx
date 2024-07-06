import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './product-card.module.scss'

gsap.registerPlugin(ScrollTrigger)

// 卡片處理: 縮放 & 展開
// 動畫觸發: 點擊展開 滑動關閉

// bonus 動畫觸發時減緩滾動速度

export default function ProductCard() {
   
   // 綁定元素
   const cardRef = useRef(null)
   const imgRef = useRef(null)
   const infoRef = useRef(null)
   const tl = useRef(null)
   
   // 展開狀態
   const [isExpand, setIsExpand] = useState(false)

  // 切換展開
  const handleExpand = () => {
    setIsExpand(true)
  }

  // 動畫執行
  useGSAP(() => {
    // 各斷點下的動畫條件
    const media = gsap.matchMedia()

    media.add(
      {
        isLarge: '(min-width: 1201px)',
        isMedium: '(min-width: 577px) and (max-width: 1200px)',
        isSmall: '(max-width: 576px)',
      },
      (context) => {
        const { isSmall } = context.conditions

        // 動畫時間軸
        tl.current = gsap
          .timeline({
            defaults: { ease: 'power3.inOut', duration: 1.2 },
            paused: true,
          })
          .to(
            // 卡片容器放至最大
            cardRef.current,
            {
              width: 'calc(100vw - 56px)',
              height: isSmall ? '100vh' : 'calc(100vh - 128px)',
            },
            0
          )
          .to(
            // 圖片容器只有卡片容器的一半
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

        // 滾動事件
        ScrollTrigger.create({
          trigger: cardRef.current,
          onUpdate: (self) => {
            // 小尺寸下取消滾動關閉
            if (self.direction && !isSmall) {
              setIsExpand(false)
            }
          },
        })
      }
    )
  })

  // 執行判定
  useEffect(() => {
    if (isExpand) {
      tl.current.play()
    } else {
      tl.current.reverse()
    }
  }, [isExpand])

  return (
    <div className={styles.container}>
      <div ref={cardRef} className={styles.cardWrapper} onClick={handleExpand}>
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
