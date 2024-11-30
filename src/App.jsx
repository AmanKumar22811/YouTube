import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Watch from "./components/Watch";
import Feed from "./components/Feed";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/watch",
        element: <Watch />,
      },
    ],
  },
]);
function App() {
  return (
    <div className="dark:bg-black">
      <Navbar />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
