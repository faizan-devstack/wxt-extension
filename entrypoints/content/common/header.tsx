import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HeaderProps {
    title: string;
    count: number;
    onRemove: () => void;
    className?: string;
}

export default function Header({
    title,
    count,
    onRemove,
    className = "",
}: HeaderProps) {
    return (
        <div
            className={`px-3 pt-2 bg-canvas-base flex items-center justify-between ${className}`}
        >
            <h2 className="text-lg font-semibold text-canvas-text-contrast flex items-center gap-2">
                {title}
                <span className="text-sm font-normal text-canvas-text">
                    ({count})
                </span>
            </h2>

            <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                aria-label="Close modal"
                className="cursor-pointer group"
            >
                <X className="h-5 w-5 text-canvas-text group-hover:text-canvas-text-contrast transition-colors duration-300" />
            </Button>
        </div>
    );
}