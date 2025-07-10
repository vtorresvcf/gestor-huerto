export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Page para usuarios registrados</h1>
      {children}
    </div>
  );
}
