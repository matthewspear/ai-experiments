export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
}
