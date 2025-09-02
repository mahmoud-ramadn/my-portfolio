import { Outlet } from "react-router"

export default function DefaultLayout() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Outlet />
    </main>
  )
}
