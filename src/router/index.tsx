import { createBrowserRouter } from "react-router"

import Home from "@/pages"
import FacebookMarketplaceDemo from "@/pages/FacebookMarketplaceDemo"
import FacebookClone from "@/pages/facebook"
import ProfilePage from "@/pages/profile"

import DefaultLayout from "../layouts"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DefaultLayout,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "facebook",
        Component: FacebookClone,
      },
      {
        path: "facebook/profile/:userId",
        Component: ProfilePage,
      },
      {
        path: "facebook/marketplace",
        Component: FacebookMarketplaceDemo,
      },
    ],
  },
])
