export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="prose-docs px-8 py-16 lg:px-12 max-w-4xl">
      {children}
    </article>
  );
}
