import { Link, useLocation } from "react-router"

import LightRays from "@/components/LightRays"

export default function Hero() {
  const location = useLocation()

  return (
    <>
      {/* Navigation */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <nav className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Portfolio
            </Link>
            <Link
              to="/facebook"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/facebook" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Facebook Clone
            </Link>
          </div>
        </nav>
      </header>

      {/* Light Rays Background */}
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
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
