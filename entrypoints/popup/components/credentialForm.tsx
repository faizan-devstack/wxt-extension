import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData, useFormData } from "@/entrypoints/hooks/formData";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"

export default function CredentialForm() {
    const [showApiKey, setShowApiKey] = useState(false);
    const { formData, setFormData } = useFormData()

    const isValid = formData?.endpoint.trim() !== "" && formData?.apiKey.trim() !== "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        chrome.storage.local.set({ formData }, () => {
            toast.success("API credentials saved successfully");
        });
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

                <form onSubmit={handleSubmit} className="bg-canvas-bg-subtle border border-canvas-border/50 rounded-2xl p-6">
                    {/* Endpoint */}
                    <div className="mb-5">
                        <Label>Endpoint</Label>
                        <Input
                            required
                            name="endpoint"
                            type="url"
                            placeholder="https://api.example.com/v1"
                            value={formData?.endpoint}
                            onChange={handleChange}
                        />
                    </div>

                    {/* API Key */}
                    <div className="mb-6">
                        <Label>API Key</Label>
                        <div className="relative">
                            <Input
                                required
                                name="apiKey"
                                type={showApiKey ? "text" : "password"}
                                placeholder="Enter your API key"
                                value={formData?.apiKey}
                                onChange={handleChange}
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                variant='ghost'
                                size='icon-sm'
                                onClick={() => setShowApiKey((s) => !s)}
                                className="absolute inset-y-0 right-2 top-1 hover:bg-transparent cursor-pointer"
                            >
                                {showApiKey ? (
                                    <EyeOff size={18} className="text-canvas-text" />
                                ) : (
                                    <Eye size={18} className="text-canvas-text" />
                                )}
                            </Button>
                        </div>
                    </div>

                    <Button
                        disabled={!isValid}
                        type="submit"
                        variant="default"
                        className="w-full"
                    >
                        Save
                    </Button>
                </form>

                <p className="text-canvas-text/60 text-xs text-center mt-6">
                    Your API credentials are securely processed in browser storage
                </p>
                <p className="text-canvas-text/60 text-xs text-center mt-1">
                    Copyright Faizan © {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}
