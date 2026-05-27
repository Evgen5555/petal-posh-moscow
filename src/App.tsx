import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { StoreProvider } from "@/context/StoreContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Delivery from "./pages/Delivery";
import Privacy from "./pages/Privacy";
import Offer from "./pages/Offer";
import Reviews from "./pages/Reviews";
import BirthdayPromo from "./pages/BirthdayPromo";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StoreProvider>
        <SiteContentProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename="/petal-posh-moscow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/offer" element={<Offer />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/birthday" element={<BirthdayPromo />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </SiteContentProvider>
      </StoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
