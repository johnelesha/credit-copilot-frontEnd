import { apiFetch } from "./client";
import type { AssessmentResult } from "../types";

export function assessApplication(applicationId: string, token: string) {
    return apiFetch<AssessmentResult>(
        "/api/assess",
        {
            method: "POST",
            body: JSON.stringify({ applicationId }),
        },
        token,
    );
}
