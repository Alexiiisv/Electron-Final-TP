import { createBrowserRouter } from "react-router-dom";
import About from "../screens/about";
import Home from "../screens/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

export default router;
