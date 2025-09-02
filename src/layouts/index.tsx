import { Outlet } from "react-router"

import SplashCursor from "@/components/SplashCursor"

export default function DefaultLayout() {
  return (
    <main className="min-h-screen  overflow-hidden flex flex-col bg-black">
      <SplashCursor />
 <main className=" container mx-auto px-4 ">
      <Outlet />
 </main>
    </main>
  )
}
