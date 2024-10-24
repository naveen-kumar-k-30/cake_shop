import ReactDOM from "react-dom/client";
import '../src/assets/css/google-places.css';
import "./index.css";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx";
import Error from "./pages/Error.jsx";
import { Suspense } from "react";
import Homepage from "./pages/Homepage.jsx";
import Details from "./components/Details.jsx";
import App from "./App.jsx";
import AdminForm from "./pages/AdminForm.jsx";
import Logout from "./pages/Logout.jsx";
import ProtectedRoute from "./Auth/ProtectedRoute.jsx";
import Orders from "./components/Orders.jsx";
import Contact from "./components/Contact.jsx";
import Rating from "./components/Rating.jsx";
import CakeReviews from "./components/CakeReviews.jsx";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Homepage />
          </Suspense>
        ),
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Homepage />
          </Suspense>
        ),
      },
      {
        path: "/admin",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminForm />
          </Suspense>
        ),
      },

      {
        path: "/SignUp",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/logout",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Logout />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute><Cart/></ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute><Contact/></ProtectedRoute>
          </Suspense>
        ),
      },
     
      {
        path: "/orders",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute><Orders/></ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/About",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/review",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Rating />
          </Suspense>
        ),
      },
      {
        path: "/cakeReviews/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CakeReviews />
          </Suspense>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Details />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Toaster position="top-center" />
    <RouterProvider router={appRouter} />
  </>
);
