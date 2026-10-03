import { apiFetch } from "./client";

export function approveAssessment(runId: string, token: string) {
    return apiFetch<{ message: string; status: string; runId: string }>(
        `/api/assessments/${runId}/approve`,
        { method: "POST", body: JSON.stringify({}) },
        token,
    );
}

export function rejectAssessment(
    runId: string,
    token: string,
    comment: string,
) {
    return apiFetch<{ message: string; status: string; runId: string }>(
        `/api/assessments/${runId}/reject`,
        {
            method: "POST",
            body: JSON.stringify({ comment }),
        },
        token,
    );
}
