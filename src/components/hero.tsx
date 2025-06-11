export default function Hero({
    title,
    content
}: {
    title: string;
    content: string;
}) {
    return (
        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                <span className="border-b-4 border-pink-400 pb-1">{title}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
                {content}
            </p>
        </div>
    );
}