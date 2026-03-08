export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white py-8 text-black [color-scheme:light] print:py-0">
      <div className="mx-auto max-w-[210mm] bg-white text-black shadow-lg print:max-w-none print:shadow-none">
        <div className="min-h-[297mm] bg-white p-8 text-black print:min-h-0 print:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
