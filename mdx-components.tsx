import type { MDXComponents } from 'mdx/types';
import Card from '@/components/mdx/Card';
import Callout from '@/components/mdx/Callout';
import Steps, { Step } from '@/components/mdx/Steps';
import CodeGroup, { Code } from '@/components/mdx/CodeGroup';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Card,
    Callout,
    Steps,
    Step,
    CodeGroup,
    Code,
    ...components,
  };
}
