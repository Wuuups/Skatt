import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './product-cart.module.scss'

gsap.registerPlugin(ScrollTrigger)

// 卡片處理: 縮放 & 展開
// 預設關閉: 點擊展開 滑動關閉

export default function ProductCard() {
  // 展開狀態
  const [isExpand, setIsExpand] = useState(false)

  // 綁定元素
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const infoRef = useRef(null)
  const tl = useRef(null)

  // 切換展開
  const handleExpand = () => {
    setIsExpand(true)
  }

  // 動畫執行
  useGSAP(() => {
    // 動畫時間軸
    tl.current = gsap
      .timeline({ defaults: { duration: 1.2 }, paused: true })
      .to(cardRef.current, { width: '100%', ease: 'power3.inOut' }, 0)
      .to(imgRef.current, { width: '50%', ease: 'power3.inOut' }, 0)
      .to(infoRef.current, { display: 'flex', opacity: 1, duration: 0.5 })

    ScrollTrigger.create({
      trigger: cardRef.current,
      onUpdate: (self) => {
         
        setIsExpand(false)
      },
    })
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
        <div ref={imgRef} className={styles.imgWrapper}>
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
