import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Keyboards from "./pages/Keyboards";
import Mice from "./pages/Mice";
import Audio from "./pages/Audio";
import Accessories from "./pages/Accessories";
import CustomBuild from "./pages/CustomBuild";
import Support from "./pages/Support";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import { ProductDetail } from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Warranty from "./pages/Warranty";
import Returns from "./pages/Returns";
import Checkout from "./pages/Checkout";
import LiveChat from "./components/LiveChat";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { ScrollToTop } from "./components/ScrollToTop";
import { LoadingScreen } from "./components/LoadingScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <LoadingScreen />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/keyboards" element={<Keyboards />} />
              <Route path="/mice" element={<Mice />} />
              <Route path="/audio" element={<Audio />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/custom-build" element={<CustomBuild />} />
              <Route path="/support" element={<Support />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<Search />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/warranty" element={<Warranty />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <LiveChat />
            <MobileBottomNav />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
