'use client';

import styles from '../styles/manageStudent.module.scss';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [term, setTerm] = useState(searchParams.get('query') || '');

  // Debounce the search term to avoid excessive URL updates
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      if (term) {
        params.set('page', '1');
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300); // Adjust debounce timing as needed

    return () => clearTimeout(delayDebounceFn);
  }, [term, pathname, searchParams, replace]);

  return (
    <div className={styles.searchAndAdd}>
      <input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className={styles.searchInput} // Ensure this class exists in your SCSS
      />
    </div>
  );
}
