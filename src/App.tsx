import { FC, useEffect} from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/cities";
import { AuthProvider, useAuth } from "./contexts/fakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

const App:FC = () =>{
  const {isAuthenticated, user} = useAuth()
  
  useEffect(()=>{
    console.log("APP USER: ", user, isAuthenticated)
  }, [user, isAuthenticated])

  return (
    // <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    // </AuthProvider>
  )
}

export default App
