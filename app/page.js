import React from 'react'
import About from '@/component/home/About'
import Banner from '@/component/home/Banner'
import Spirit from '@/component/home/Spirit'

export default function homePage() {
  return (
    <>
      <section>
        <Banner />
      </section>
      <section>
        <About />
      </section>
      <section>
        <Spirit />
      </section>
    </>
  )
}
