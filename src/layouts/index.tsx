import { Outlet } from "react-router"

import SplashCursor from "@/components/SplashCursor"
import Hero from "@/components/ui/home/hero"

export default function DefaultLayout() {
  return (
    <main className="min-h-screen  overflow-hidden flex flex-col bg-black">
      <Hero/>
      <SplashCursor />
 <main className=" container mx-auto px-4 ">
      <Outlet />
 </main>
    </main>
  )
}
