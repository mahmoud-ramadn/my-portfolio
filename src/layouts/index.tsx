import { Outlet, useLocation } from "react-router"

import Hero from "@/components/ui/home/hero"

import SplashCursor from "@/components/SplashCursor"

export default function DefaultLayout() {
  const location = useLocation()
  const isFacebookPage = location.pathname.startsWith("/facebook")

  if (isFacebookPage) {
    return (
      <main className="min-h-screen  overflow-hidden bg-gray-100">
        <Outlet />
      </main>
    )
  }

  return (
    <main className="min-h-screen  overflow-hidden flex flex-col bg-black">
      <Hero />
      <SplashCursor />
      <main className=" container mx-auto px-4 ">
        <Outlet />
      </main>
    </main>
  )
}
