import { useEffect, useRef, useState } from 'react';

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
