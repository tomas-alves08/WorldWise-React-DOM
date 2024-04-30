import { FC, Suspense, lazy, useEffect} from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/cities";
import { useAuth } from "./contexts/fakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Home from "./pages/Home";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Home = lazy(()=>import("./pages/Home"))
const Product = lazy(()=>import("./pages/Product"))
const Pricing = lazy(()=>import("./pages/Pricing"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound"))
const AppLayout = lazy(()=>import("./pages/AppLayout"))
const Login = lazy(()=>import("./pages/Login"))

// dist/index.html                   0.46 kB │ gzip:   0.29 kB
// dist/assets/index-BjU_oigt.css   29.89 kB │ gzip:   5.04 kB
// dist/assets/index-Ba57u_a-.js   512.71 kB │ gzip: 147.96 kB

const App:FC = () =>{
  const {isAuthenticated, user} = useAuth()
  
  useEffect(()=>{
    console.log("APP USER: ", user, isAuthenticated)
  }, [user, isAuthenticated])

  return (
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="Product" element={<Product />} />
              <Route path="Pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="app" 
                     element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form/*" element={<Form />} />
                <Route path="*" element={<CityList />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
  )
}

export default App
