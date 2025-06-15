export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white print:py-0">
      <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
        <div className="min-h-[297mm] p-8 print:min-h-0 print:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
