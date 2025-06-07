import React, { Suspense, lazy, useMemo } from 'react';
import Loader from '@components/loader/Loader';

// Helper to dynamically import components from '@src/pages'
const importPageComponent = (componentName) =>
  lazy(() => import(`../../pages/${componentName.charAt(0).toLowerCase() + componentName.slice(1)}/${componentName}`));

const Navigation = ({ pages, currentPage }) => {
  // Memoize the mapping of page names to lazy components
  const pageComponents = useMemo(() => {
    const mapping = {};
    pages.forEach((name) => {
      mapping[name] = importPageComponent(name);
    });
    return mapping;
  }, [pages]);

  const PageComponent = pageComponents[currentPage] || importPageComponent('NotFound');

  return (
    <Suspense fallback={<Loader />}>
      <PageComponent />
    </Suspense>
  );
};

export default Navigation;