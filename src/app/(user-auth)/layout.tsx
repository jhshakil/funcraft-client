import Footer from "@/components/shared/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import TopBar from "@/components/topBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopBar />
      <div className="container min-h-[80vh] mx-auto px-2">{children}</div>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Layout;
