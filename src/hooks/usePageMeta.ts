import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description?: string;
}

export const usePageMeta = ({ title, description }: PageMeta) => {
  useEffect(() => {
    document.title = `${title} | Strafion`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
};
