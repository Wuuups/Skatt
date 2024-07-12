import { useEffect, useRef } from 'react'
import styles from './product-card.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useResponsive } from '@/context/ResponsiveContext'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// 動畫處理: 縮放 & 展開
// 動畫觸發: 點擊展開 滑動關閉

// bonus: 動畫執行時減緩滾動速度

export default function ProductCard({ index, expandedIndex, handleExpand }) {
  const { isSmall } = useResponsive()
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const infoRef = useRef(null)
  const tl = useRef(null)

  // 創建商品動畫
  const createAnimation = () => {
    tl.current = gsap.timeline({
      defaults: { ease: 'power3.inOut', duration: 1.2 },
      paused: true,
      onReverseComplete: () => {
        gsap.set([cardRef.current, imgRef.current, infoRef.current], {
          clearProps: 'all',
        })
      },
    })

    tl.current
      .to(
        cardRef.current,
        {
          width: 'calc(100vw - 56px)',
          height: isSmall ? '100vh' : 'calc(100vh - 128px)',
        },
        0
      )
      .to(
        imgRef.current,
        {
          width: isSmall ? '100%' : '50%',
          onStart: () => imgRef.current.classList.remove(styles.expand),
          onReverseComplete: () => imgRef.current.classList.add(styles.expand),
        },
        0
      )
      .to(infoRef.current, {
        width: isSmall ? '100%' : '50%',
        display: 'flex',
        opacity: 1,
        duration: 0.3,
      })
  }

  // 播放動畫
  const playAnimation = () => {
    tl.current.timeScale(1).play()
  }

  // 反轉動畫
  const reverseAnimation = (speed = 1.5) => {
    tl.current.timeScale(speed).reverse()
  }

  useGSAP(() => {
    // 使用動畫
    createAnimation()
    // 滾動時觸發動畫回放
    ScrollTrigger.create({
      trigger: cardRef.current,
      onUpdate: () => {
        reverseAnimation()
      },
    })
  }, [isSmall, index])

  // 比對傳入參數與商品index是否符合
  useEffect(() => {
    if (expandedIndex === index) {
      gsap.to(window, {
        duration: 0.7,
        scrollTo: {
          y: cardRef.current,
          offsetY: 100,
        },
        ease: 'power3.inOut',
        onComplete: () => {
          playAnimation()
        },
      })
    } else {
      reverseAnimation()
      handleExpand(null) // 設置為null 再次點擊時才可觸發
    }
  }, [index, expandedIndex])

  return (
    <div className={styles.container} data-index={index}>
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
