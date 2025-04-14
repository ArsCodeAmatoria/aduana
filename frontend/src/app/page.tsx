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
    <div className="flex min-h-screen flex-col bg-slate-900 text-white">
      <Navbar />
      <main className="flex-1 flex flex-col relative">
        {/* Background gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[1000px] h-[1000px] -top-[400px] -right-[400px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute w-[1000px] h-[1000px] top-[40%] -left-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute w-[1000px] h-[1000px] -bottom-[400px] -right-[300px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        {/* Content Sections */}
        <div className="relative z-10">
          <Hero />
          <Overview />
          <ZkOriginProofs />
          <DaoInsurance />
          <SyntheticDerivatives />
          <TokenUtility />
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>
  )
}
