import { useState, useEffect } from "react";

export interface FormData {
    apiKey: string;
}

export const useFormData = () => {
    const [formData, setFormData] = useState<FormData>({
        apiKey: ""
    });

    useEffect(() => {
        chrome.storage.local.get(["formData"], (result) => {
            if (result.formData) {
                setFormData(result.formData as FormData);
            }
        });
    }, []);

    return { formData, setFormData };
};
