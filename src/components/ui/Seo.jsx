import { createContext, useContext, useEffect } from 'react';
import { applyMeta, resolveMeta } from '@/lib/meta';

/**
 * During prerendering a collector function is provided, and each page's <Seo>
 * hands its descriptor to it instead of rendering anything. On the client
 * there is no collector, so the descriptor is applied to document.head after
 * paint — which is what keeps SPA navigation updating the title.
 *
 * Either way this component renders null, so metadata never takes part in
 * hydration and cannot cause a mismatch.
 */
export const MetaSink = createContext(null);

export function Seo(props) {
  const collect = useContext(MetaSink);
  const meta = resolveMeta(props);

  collect?.(meta);

  useEffect(() => {
    applyMeta(meta);
    // The descriptor is derived from these props alone.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(meta)]);

  return null;
}
