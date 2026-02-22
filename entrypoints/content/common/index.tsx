import { Toaster } from "@/components/ui/sonner";
import React from "react";
import ReactDOM from "react-dom/client";

export const CreateContentElement = (
    uiContainer: HTMLElement,
    shadowContainer: HTMLElement,
    callback: (root: ReactDOM.Root) => React.ReactNode
): ReactDOM.Root => {
    const app = document.createElement("div");
    uiContainer.append(app);

    const styles = {
        visibility: "visible",
        position: "fixed",
        top: "0",
        right: "0",
        left: "0",
        zIndex: "9999",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    };
    Object.assign(uiContainer.style, styles);

    const root = ReactDOM.createRoot(app);
    root.render(
        <React.StrictMode>
            <Toaster />
            {callback(root)}
        </React.StrictMode>
    );
    return root;
}