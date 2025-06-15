import Link from "next/link";
import { Button } from "./ui/button";

export default function SectionHeader({ title, subtitle, ctaUrl }: { 
    title: string; 
    subtitle: string; 
    ctaUrl: string 
}) {
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                    <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
                </div>
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                    <Link href={ctaUrl} className="flex items-center gap-1">
                        See all
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </Button>
            </div>
        </div>
    );
}
