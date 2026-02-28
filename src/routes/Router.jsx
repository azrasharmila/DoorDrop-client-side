import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashBoardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())
      },
      {
        path: 'rider',
        element: <PrivateRoute><Rider></Rider></PrivateRoute>
      },
      {
        path: 'send-parcel',
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
         loader: () => fetch('/serviceCenters.json').then(res => res.json())
      }

    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
   {
    path: '/dashboard',
    element: 
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ,
    children: [
      {
        path: 'my-parcels', 
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      }, 
      {
        path: 'payment-success',
        Component: PaymentSuccess
      }, 
      {
        path: 'payment-cancelled', 
        Component: PaymentCancelled
      },
      {
        path:'payment-history',
        Component: PaymentHistory
      }
     
    ],
  },

]);
