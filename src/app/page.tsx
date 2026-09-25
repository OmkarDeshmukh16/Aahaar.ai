'use client'

import { Navbar } from '@/components/sections/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { VisionScannerSection } from '@/components/sections/VisionScannerSection'
import { DoshaEngineSection } from '@/components/sections/DoshaEngineSection'
import { BiometricSection } from '@/components/sections/BiometricSection'
import { BentoSection } from '@/components/sections/BentoSection'
import { WaitlistSection } from '@/components/sections/WaitlistSection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#06090e] text-white selection:bg-emerald-500/30 selection:text-white flex flex-col items-center">
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <HeroSection />
        <VisionScannerSection />
        <DoshaEngineSection />
        <BiometricSection />
        <BentoSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  )
}
