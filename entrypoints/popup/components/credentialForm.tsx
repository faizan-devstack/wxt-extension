import { ThemeSwitcher } from "@/components/theme-switcher";
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
            <div className="absolute right-6 top-6 ">
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
                <div className="bg-canvas-bg-subtle border border-canvas-border rounded-2xl p-6">
                    {/* Endpoint */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-canvas-text mb-2">
                            Endpoint
                        </label>
                        <input
                            type="text"
                            placeholder="https://api.example.com/v1"
                            value={endpoint}
                            onChange={(e) => setEndpoint(e.target.value)}
                            className="
                w-full rounded-lg 
                bg-canvas-base 
                border border-canvas-border 
                px-4 py-2.5 text-sm 
                text-canvas-text 
                placeholder-canvas-text/50 
                focus:outline-none 
                focus:border-primary-border-hover 
                focus:ring-2 focus:ring-primary-solid/30
                transition-all duration-200
              "
                        />
                    </div>

                    {/* API Key */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-canvas-text mb-2">
                            API Key
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your API key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="
                w-full rounded-lg 
                bg-canvas-base 
                border border-canvas-border 
                px-4 py-2.5 text-sm 
                text-canvas-text 
                placeholder-canvas-text/50 
                focus:outline-none 
                focus:border-primary-border-hover 
                focus:ring-2 focus:ring-primary-solid/30
                transition-all duration-200
              "
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="
              w-full flex items-center justify-center gap-2 
              bg-primary-solid hover:bg-primary-solid-hover 
              text-primary-on-primary 
              font-medium py-2.5 rounded-xl 
              transition-all duration-200 
              active:scale-[0.98]
            "
                    >
                        Save
                    </button>

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
                <p className="text-canvas-text/50 text-xs text-center mt-2">
                    Copyright Hasan-py © 2025
                </p>
            </div>
        </div>
    );
}