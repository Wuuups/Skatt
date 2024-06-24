import styles from './about.module.scss'
import Marquee from '../../Marquee'

export default function About() {
  return (
    <section>
      <div className={styles.marquee}>
        <Marquee />
      </div>
      <div className={styles.about}>
        <p>
          SKATT CELEBRATES SKATEBOARD CULTURE AND THE SPIRIT OF CHALLENGE.
          HANDCRAFTED WITH PASSION, EVERY BOARD EMBODIES FREEDOM AND ADVENTURE.
        </p>
      </div>
    </section>
  )
}
