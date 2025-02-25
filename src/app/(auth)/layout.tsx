export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="auth-layout">
        {/* <h1>auth Hello</h1> */}
        {children}
      </div>
    );
  }