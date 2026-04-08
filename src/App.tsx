import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ScrollToTop } from "./components/ScrollToTop";
import { LoadingScreen } from "./components/LoadingScreen";
import { BackToTop } from "./components/BackToTop";
import { MobileBottomNav } from "./components/MobileBottomNav";
import LiveChat from "./components/LiveChat";

const Index = lazy(() => import("./pages/Index"));
const Keyboards = lazy(() => import("./pages/Keyboards"));
const Mice = lazy(() => import("./pages/Mice"));
const Audio = lazy(() => import("./pages/Audio"));
const Accessories = lazy(() => import("./pages/Accessories"));
const CustomBuild = lazy(() => import("./pages/CustomBuild"));
const Support = lazy(() => import("./pages/Support"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const Cart = lazy(() => import("./pages/Cart"));
const Search = lazy(() => import("./pages/Search"));
const ProductDetail = lazy(() => import("./pages/ProductDetail").then(m => ({ default: m.ProductDetail || m.default })));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Warranty = lazy(() => import("./pages/Warranty"));
const Returns = lazy(() => import("./pages/Returns"));
const Checkout = lazy(() => import("./pages/Checkout"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading…</div>
  </div>
);

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
            <Suspense fallback={<PageFallback />}>
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
            </Suspense>
            <LiveChat />
            <MobileBottomNav />
            <BackToTop />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
