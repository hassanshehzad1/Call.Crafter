import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSideBar from "@/modules/Dashboard/UI/Components/dashboard-sidebar";
import DashboardNavbar from "./dashboard-navbar";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <>
    {/* <p>Hello</p> */}
    <SidebarProvider>
      {/* <div className="flex h-screen"> */}
        <DashboardSideBar />
        <main className="flex-1 bg-muted overflow-auto">
          <DashboardNavbar/>
          {children}
          </main>
      {/* </div> */}
    </SidebarProvider>
    </>
  );
};

export default Layout;