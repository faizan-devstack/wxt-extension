import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CredentialForm() {
    const [endpoint, setEndpoint] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        // store in browser storage (WXT friendly)
        localStorage.setItem(
            "api_credentials",
            JSON.stringify({ endpoint, apiKey })
        );
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="relative bg-canvas-bg flex min-h-screen items-center justify-center pt-12 p-6">
            <div className="absolute right-2 top-0">
                <ThemeSwitcher />
            </div>

            <div className="w-full min-w-sm max-w-md">
                <h1 className="text-3xl font-semibold text-canvas-text-contrast text-center mb-2">
                    API Configuration
                </h1>
                <p className="text-canvas-text text-center mb-8">
                    Enter your API credentials
                </p>

                {/* Card */}
                <div className="bg-canvas-bg-subtle border border-canvas-border/50 rounded-2xl p-6">
                    {/* Endpoint */}
                    <div className="mb-5">
                        <Label>
                            Endpoint
                        </Label>
                        <Input
                            type="text"
                            placeholder="https://api.example.com/v1"
                            value={endpoint}
                            onChange={(e) => setEndpoint(e.target.value)}
                        />
                    </div>

                    {/* API Key */}
                    <div className="mb-6">
                        <Label>
                            API Key
                        </Label>
                        <Input
                            type="password"
                            placeholder="Enter your API key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={handleSave}
                        variant='default'
                        className="w-full"
                        size='xs'
                    >
                        Save
                    </Button>

                    {saved && (
                        <p className="text-success-text text-sm font-medium text-center mt-3 animate-fade-in">
                            Saved successfully
                        </p>
                    )}
                </div>

                {/* Footer */}
                <p className="text-canvas-text/60 text-xs text-center mt-6">
                    Your API credentials are securely processed in browser storage
                </p>
                <p className="text-canvas-text/60 text-xs text-center mt-2">
                    Copyright Faizan © 2026
                </p>
            </div>
        </div>
    );
}