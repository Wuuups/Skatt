import { useEffect, useRef, forwardRef } from 'react'
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
const ProductCard = forwardRef(
  ({ index, expandedIndex, handleExpand, product }, ref) => {
    const { isSmall } = useResponsive()
    const cardRef = useRef(null)
    const imgRef = useRef(null)
    const infoRef = useRef(null)
    const tl = useRef(null)

    // 創建動畫
    const cardAnimation = () => {
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
            pointerEvents: 'none',
            onStart: () => imgRef.current.classList.remove(styles.expand),
            onReverseComplete: () =>
              imgRef.current.classList.add(styles.expand),
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
      cardAnimation()
      // 判斷是否為當前商品
      if (expandedIndex === index) {
        // 將元件移至頁面中央
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
        reverseAnimation() // still need to figure out why isn't working
        handleExpand(null) // 設置為null 再次點擊時才可觸發
      }

      // 滾動時觸發動畫回放
      ScrollTrigger.create({
        trigger: cardRef.current,
        onUpdate: () => {
          reverseAnimation()
        },
      })
    }, [isSmall, index, expandedIndex])

    return (
      <div className={styles.container}>
        <div ref={cardRef} className={styles.cardWrapper}>
          <div
            ref={imgRef}
            className={`${styles.imgWrapper} ${styles.expand}`}
            onClick={() => handleExpand(index)}
          >
            <img src="/product-images/testimg.png" />
          </div>
          <div ref={infoRef} className={styles.infoWrapper}>
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productInfo}>
              <p className={styles.title}>Open Edition</p>
              <p>{product.info}</p>
            </div>
            <div className={styles.productOptions}>
              <div className={styles.productPrice}>{product.price}</div>
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
)

export default ProductCard
// export default function ProductCard({
// index,
// expandedIndex,
// handleExpand,
// product,
// ref
// }) {
// const { isSmall } = useResponsive()
// const cardRef = useRef(null)
// const imgRef = useRef(null)
// const infoRef = useRef(null)
// const tl = useRef(null)

// // 創建動畫
// const cardAnimation = () => {
//   tl.current = gsap.timeline({
//     defaults: { ease: 'power3.inOut', duration: 1.2 },
//     paused: true,
//     onReverseComplete: () => {
//       gsap.set([cardRef.current, imgRef.current, infoRef.current], {
//         clearProps: 'all',
//       })
//     },
//   })

//   tl.current
//     .to(
//       cardRef.current,
//       {
//         width: 'calc(100vw - 56px)',
//         height: isSmall ? '100vh' : 'calc(100vh - 128px)',
//       },
//       0
//     )
//     .to(
//       imgRef.current,
//       {
//         width: isSmall ? '100%' : '50%',
//         pointerEvents: 'none',
//         onStart: () => imgRef.current.classList.remove(styles.expand),
//         onReverseComplete: () => imgRef.current.classList.add(styles.expand),
//       },
//       0
//     )
//     .to(infoRef.current, {
//       width: isSmall ? '100%' : '50%',
//       display: 'flex',
//       opacity: 1,
//       duration: 0.3,
//     })
// }

// // 播放動畫
// const playAnimation = () => {
//   tl.current.timeScale(1).play()
// }

// // 反轉動畫
// const reverseAnimation = (speed = 1.5) => {
//   tl.current.timeScale(speed).reverse()
// }

// useGSAP(() => {
//   // 使用動畫
//   cardAnimation()
//   // 判斷是否為當前商品
//   if (expandedIndex === index) {
//     gsap.to(window, {
//       duration: 0.7,
//       scrollTo: {
//         y: cardRef.current,
//         offsetY: 100,
//       },
//       ease: 'power3.inOut',
//       onComplete: () => {
//         playAnimation()
//       },
//     })
//   } else {
//     reverseAnimation()
//     handleExpand(null) // 設置為null 再次點擊時才可觸發
//   }

//   // 滾動時觸發動畫回放
//   ScrollTrigger.create({
//     trigger: cardRef.current,
//     onUpdate: () => {
//       reverseAnimation()
//     },
//   })
// }, [isSmall, index, expandedIndex])

// return (
//   <div className={styles.container} >
//     <div ref={cardRef} className={styles.cardWrapper}>
//       <div
//         ref={imgRef}
//         className={`${styles.imgWrapper} ${styles.expand}`}
//         onClick={() => handleExpand(index)}
//       >
//         <img src="/product-images/testimg.png" />
//       </div>
//       <div ref={infoRef} className={styles.infoWrapper}>
//         <div className={styles.productName}>{product.name}</div>
//         <div className={styles.productInfo}>
//           <p className={styles.title}>Open Edition</p>
//           <p>{product.info}</p>
//         </div>
//         <div className={styles.productOptions}>
//           <div className={styles.productPrice}>{product.price}</div>
//           <div className={styles.productNum}>
//             <div>
//               <img src="/icons/minus.svg" />
//             </div>
//             <div>1</div>
//             <div>
//               <img src="/icons/plus.svg" />
//             </div>
//           </div>
//           <button>Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   </div>
// )
// }
