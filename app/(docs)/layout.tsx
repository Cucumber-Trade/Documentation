export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="prose prose-invert max-w-none px-6 py-12">
      {children}
    </article>
  );
}
