"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./Button"; // adjust path if needed

type RefreshButtonProps = Omit<
    React.ComponentProps<typeof Button>,
    "icon" | "onClick"
> & {
    label?: string;
};

export const RefreshButton = React.forwardRef<
    HTMLButtonElement,
    RefreshButtonProps
>(({ label = "تازه‌سازی", children, ...props }, ref) => {
    const router = useRouter();

    const handleRefresh = () => {
        window.location.reload();
    };


    return (
        <Button
            ref={ref}
            icon={<RotateCcw className="w-4 h-4" />}
            variant="secondary"
            onClick={handleRefresh}
            {...props}
        >
            {children ?? label}
        </Button>
    );
});

RefreshButton.displayName = "RefreshButton";
