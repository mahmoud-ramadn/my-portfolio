import { Outlet } from "react-router"

import SplashCursor from "@/components/SplashCursor"

export default function DefaultLayout() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <SplashCursor />

      <Outlet />
    </main>
  )
}
