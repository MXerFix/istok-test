import Contents from "@/views/Contents"
import DomFeatures from "@/views/DomFeatures"
import Hero from "@/views/Hero"
import Partners from "@/views/Partners"
import Header from "@/widgets/Header/Header"

export default function Home() {
  return (
    <>
      <main>
        <div className='max-w-[1519px] mx-auto'>
          <Header />
          <Hero />
          <section className='flex flex-col gap-24'>
            <Contents />
            <DomFeatures />
          </section>
        </div>
        <section>
          <Partners />
        </section>
      </main>
    </>
  )
}
