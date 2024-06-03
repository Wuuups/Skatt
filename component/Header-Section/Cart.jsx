import React from 'react'
import styles from './cart.module.scss'

export default function Cart() {
  return (
    <>
      <div className={styles['cart']}>
        <div className={styles['cart-list']}>
          <div>2 items</div>
          <div>
            <div className={styles['items']}>
              <div>
                <img src="/icons/logo.svg" />
              </div>
              <div className={styles['info']}>
                <div>Colored Campbell's Soup Eggplant</div>
                <div>$7,217.00</div>
                <div className={styles['num']}>
                  <div className={styles['edit-num']}>
                    <img src="/icons/minus.svg" />
                    <div>3</div>
                    <img src="/icons/plus.svg" />
                  </div>
                  <div>Delete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['checkout-area']}>
          <div className={styles['price']}>
            <div>Total</div>
            <div>$3,3580</div>
          </div>
          <button className={styles['checkout']}>Checkout</button>
        </div>
      </div>
    </>
  )
}
