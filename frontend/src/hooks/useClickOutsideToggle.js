import { useEffect, useRef, useState } from 'react';

/**
 * useClickOutsideToggle
 *
 * A hook that provides state and refs to implement a dropdown toggle that can
 * be toggled on and off by clicking outside of it.
 *
 * The hook returns an object with the following keys:
 * - `expanded`: a boolean indicating whether the dropdown is currently expanded
 * - `setExpanded`: a function to set the expanded state
 * - `toggleRef`: a ref to be used on the toggle element
 * - `dropdownRef`: a ref to be used on the dropdown element
 *
 * @return {{expanded: boolean, setExpanded: Function, toggleRef: Ref, dropdownRef: Ref}}
 */
const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        if (dropdownRef.current) {
          if (!dropdownRef.current.contains(event.target)) setExpanded(false);
        } else setExpanded(false);
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [toggleRef]);

  return { expanded, setExpanded, toggleRef, dropdownRef };
};

export default useClickOutsideToggle;
