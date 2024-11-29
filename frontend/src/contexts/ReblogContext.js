import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ReblogContext = createContext();
export const SetReblogContext = createContext();

export const useReblog = () => useContext(ReblogContext);
export const useSetReblog = () => useContext(SetReblogContext);

/**
 * ReblogProvider is a React context provider that manages the state of a reblogged post.
 * It uses the useState hook to store the reblogged post in state and provides the
 * current reblogged post and a setReblog function to its children.
 *
 * @param {{ children: React.ReactNode }} props - The props passed to ReblogProvider.
 * @returns {JSX.Element} - The rendered ReblogProvider component.
 */
export const ReblogProvider = ({ children }) => {
  const [reblog, setReblog] = useState(null);

  return (
    <SetReblogContext.Provider value={setReblog}>
      <ReblogContext.Provider value={reblog}>{children}</ReblogContext.Provider>
    </SetReblogContext.Provider>
  );
};

ReblogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
