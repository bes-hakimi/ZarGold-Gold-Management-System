import { DollarSign, Gem } from "lucide-react";
import { TabType } from "@/types/market-rates/rates";
import { Button } from "@/components/ui/Button";

interface TabSwitcherProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabSwitcher = ({ activeTab, onTabChange }: TabSwitcherProps) => {
  const tabs = [
    {
      id: "currencies" as TabType,
      label: "نرخ اسعار",
      icon: DollarSign,
    },
    {
      id: "jewelries" as TabType,
      label: "نرخ جواهرات",
      icon: Gem,
    },
  ];

  return (
    <div className="flex bg-secondary-100 border border-border rounded-lg p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            variant={isActive ? "primary" : "ghost"}
            size="sm"
            icon={<tab.icon className="w-5 h-5" />}
            className="flex items-center"
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

export default TabSwitcher;
