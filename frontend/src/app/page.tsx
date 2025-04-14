import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Overview } from "@/components/landing/overview"
import { ZkOriginProofs } from "@/components/landing/zk-origin"
import { DaoInsurance } from "@/components/landing/dao-insurance"
import { SyntheticDerivatives } from "@/components/landing/synthetic-derivatives"
import { TokenUtility } from "@/components/landing/token-utility"
import { CallToAction } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Overview />
      <ZkOriginProofs />
      <DaoInsurance />
      <SyntheticDerivatives />
      <TokenUtility />
      <CallToAction />
      <Footer />
    </main>
  )
}
