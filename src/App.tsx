import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import CustomCursor from '@/components/CustomCursor';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ProcessPage from '@/pages/ProcessPage';
import AboutPage from '@/pages/AboutPage';
import FAQPage from '@/pages/FAQPage';
import ContactPage from '@/pages/ContactPage';
import QuotePage from '@/pages/QuotePage';
import PrivacyPage from '@/pages/PrivacyPage';
import CookiePage from '@/pages/CookiePage';
import NotFoundPage from '@/pages/NotFoundPage';

function Layout() {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <CustomCursor />
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diensten" element={<ServicesPage />} />
          <Route path="/diensten/:slug" element={<ServiceDetailPage />} />
          <Route path="/projecten" element={<ProjectsPage />} />
          <Route path="/werkwijze" element={<ProcessPage />} />
          <Route path="/over-ons" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/offerte" element={<QuotePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookiebeleid" element={<CookiePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
