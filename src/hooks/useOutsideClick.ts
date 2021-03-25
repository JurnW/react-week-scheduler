import { MutableRefObject, useEffect } from 'react';

const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: Event) => void,
): void => {
  useEffect(() => {
    const callback = (event: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
      if (!ref || !ref.current || ref.current.contains((event as any).target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', callback);
    return () => {
      document.removeEventListener('mousedown', callback);
    };
  }, [ref, handler]);
};

export default useOutsideClick;
