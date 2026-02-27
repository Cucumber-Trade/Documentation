import PageNavigation from '@/components/PageNavigation';
import PageFeedback from '@/components/PageFeedback';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="prose-docs px-8 py-16 lg:px-12 max-w-4xl">
      {children}
      <PageFeedback />
      <PageNavigation />
    </article>
  );
}
