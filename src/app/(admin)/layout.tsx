
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-muted/40 min-h-screen">{children}</div>;
}
