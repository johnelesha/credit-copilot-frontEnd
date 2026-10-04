import type { ReactNode } from "react";
import Header from "./Header";

export default function Layout({
    children,
    maxWidth = "max-w-4xl",
}: {
    children: ReactNode;
    maxWidth?: string;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className={`${maxWidth} mx-auto p-4 space-y-6`}>{children}</main>
        </div>
    );
}
