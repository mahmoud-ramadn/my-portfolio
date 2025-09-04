import { Link, useLocation } from "react-router"

import LightRays from "@/components/LightRays"

export default function Hero() {
  const location = useLocation()

  return (
    <>
      {/* Navigation */}
      <header className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs sm:max-w-md px-4 sm:px-0">
        <nav className="bg-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
          <div className="flex items-center justify-center space-x-4 sm:space-x-6">
            <Link
              to="/"
              className={`text-xs sm:text-sm font-medium transition-colors ${
                location.pathname === "/" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Portfolio
            </Link>
            <Link
              to="/facebook"
              className={`text-xs sm:text-sm font-medium transition-colors ${
                location.pathname === "/facebook" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Facebook Clone
            </Link>
          </div>
        </nav>
      </header>

      {/* Light Rays Background */}
      <div className="w-full h-80 sm:h-96 lg:h-[600px] relative">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
    </>
  )
}
