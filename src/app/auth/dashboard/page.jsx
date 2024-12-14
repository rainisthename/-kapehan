import AppBar from "../../admin-components/Appbar";
import StatsCards from "../../admin-components/StatCards";
import TopPerformer from "../../admin-components/TopPerformers";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* AppBar stays on top */}

        {/* Main Content Layout */}
        <main className="p-6 flex-1 overflow-auto">
          <div className="w-full pb-5">
            <StatsCards />
          </div>
          <div className="w-full">
            <TopPerformer />
          </div>
        </main>
      </div>
    </div>
  );
}
