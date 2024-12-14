import Sidebar from "../../admin-components/Sidebar";
import AppBar from "../../admin-components/Appbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with h-full to take full height */}
      <Sidebar className="h-[120%]" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* AppBar stays on top */}
        <AppBar />

        {/* Main Content Layout */}
        <main className="px-12 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
