"use client";

import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface RefreshButtonProps {
  isLoading: boolean;
  onRefresh: () => void;
}

const RefreshButton = ({ isLoading, onRefresh }: RefreshButtonProps) => {
  return (
    <Button
      onClick={onRefresh}
      loading={isLoading}
      loadingText="در حال به‌روزرسانی..."
      icon={<RefreshCw className="w-5 h-5" />}
      size="md"
      variant="primary"
      className="gap-2"
    >
      {!isLoading && "به‌روزرسانی نرخ‌ها"}
    </Button>
  );
};

export default RefreshButton;
