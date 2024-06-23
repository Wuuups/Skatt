import styles from './about.module.scss'
import Marquee from './Marquee'

export default function About() {
  return (
    <div className={styles.wrap}>
      <div className={styles.firstMarquee}>
        <Marquee />
      </div>
     
      <div className={styles.about}>
        <p>
          SKATT CELEBRATES SKATEBOARD CULTURE AND THE SPIRIT OF CHALLENGE.
          HANDCRAFTED WITH PASSION, EVERY BOARD EMBODIES FREEDOM AND ADVENTURE.
        </p>
      </div>
    </div>
  )
}
