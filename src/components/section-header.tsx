import Link from "next/link";
import { Button } from "./ui/button";

export default function SectionHeader({ title, subtitle, ctaUrl

}: { title: string; subtitle: string; ctaUrl: string }) {
    return (
        <div className="mb-2">
            <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-foregroud">{title}</h2>
                <Button variant="link" asChild>
                    <Link href={ctaUrl}>See all</Link>
                </Button>
            </div>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>

    );

}
