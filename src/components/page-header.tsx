interface PageHeaderProps {
  title: string;
  description: string;
  details?: string;
}

export function PageHeader({ title, description, details }: PageHeaderProps) {
  return (
    <header className="page-heading">
      <h1 className="page-heading-title">{title}</h1>
      <div className="max-w-md">
        <p className="text-base leading-7 text-muted-foreground">
          {description}
        </p>
        {details && (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {details}
          </p>
        )}
      </div>
    </header>
  );
}
