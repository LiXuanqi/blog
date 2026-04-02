export default function Hero({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="mb-12">
      <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
        <span className="border-b-4 border-title-accent pb-1">{title}</span>
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">{content}</p>
    </div>
  );
}
