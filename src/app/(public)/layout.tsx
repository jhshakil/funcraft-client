import ScrollToTop from "@/components/shared/ScrollToTop";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <ScrollToTop />
    </div>
  );
};

export default Layout;
