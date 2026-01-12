// src/app/dashboard/page.tsx

import DashboardHeader from "./components/DashboardHeader";
import SummaryCards from "./components/SummaryCards";
import SalesChart from "./components/SalesChart";
import ProfitChart from "./components/ProfitChart";
import ExpenseChart from "./components/ExpenseChart";
import RecentTransactions from "./components/RecentTransactions";
import Notifications from "./components/Notifications";
import InventorySummary from "./components/InventorySummary";
import MarketSummaryHeader from "./components/MarketSummaryHeader";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <MarketSummaryHeader />
      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <ProfitChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart />
        <Notifications />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions />
        <InventorySummary />
      </div>
    </div>
  );
}