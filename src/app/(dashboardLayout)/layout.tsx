import { Metadata } from "next";
import "../globals.css";
import Sidebar from "@/components/Dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Usedify | Dashboard",
  description: "Generated by create next app",
};
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Sidebar children={children} />
    </div>
  );
};

export default DashboardLayout;
