import { apiFetch } from "./client";
import type { AskResult } from "../types";

export function askQuestion(
    question: string,
    policyEdition?: "CP-2024" | "CP-2025",
) {
    const body: { question: string; policyEdition?: string } = { question };
    if (policyEdition) body.policyEdition = policyEdition;

    return apiFetch<AskResult>("/api/ask", {
        method: "POST",
        body: JSON.stringify(body),
    });
}
