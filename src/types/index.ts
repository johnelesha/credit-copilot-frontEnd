export interface User {
    username: string;
    role: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface Citation {
    sourceFile: string;
    clauseId?: string;
    policyEdition?: string;
    snippet: string;
}

export interface AskResult {
    answer: string;
    citations: Citation[];
    reason?: string;
}

export interface RuleResult {
    rule: string;
    result: "pass" | "fail" | "refer";
    citation: string;
    details?: string;
}

export interface StepLog {
    step: number;
    name: string;
    status: "ok" | "refer" | "fail";
    detail?: string;
}

export interface AssessmentResult {
    applicationId: string;
    policyEdition: string;
    protectedAttributesRemoved: string[];
    calculation: {
        monthlyInstalment: number;
        debtBurdenRatio: number;
        maximumEligibleAmount: number;
        annualRatePercent: number;
    };
    ruleResults: RuleResult[];
    recommendation: "approve" | "decline" | "refer";
    recommendedAmount: number;
    status: string;
    runId: string;
    memo?: string;
    steps: StepLog[];
}
