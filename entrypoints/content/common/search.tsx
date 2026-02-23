import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import React, { JSX } from "react";

export default function Search({
    handleSearch,
}: {
    handleSearch: (searchQuery: string) => void;
}): JSX.Element {
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleButtonClick = () => {
        handleSearch(searchQuery);
    };

    return (
        <div className="p-3 border-b z-10 shadow-md shadow-canvas-border/50 border-canvas-border/50 flex items-center">
            <div className="flex items-center w-full space-x-2">
                <Input
                    type="text"
                    placeholder="Ask anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleButtonClick();
                        }
                    }}
                />
                <Button
                    onClick={handleButtonClick}
                    size={"default"}
                >
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Search
                </Button>
            </div>
        </div>
    );
}