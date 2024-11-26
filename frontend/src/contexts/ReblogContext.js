import React, { createContext, useContext, useState } from 'react';

export const ReblogContext = createContext();
export const SetReblogContext = createContext();

export const useReblog = () => useContext(ReblogContext);
export const useSetReblog = () => useContext(SetReblogContext);

export const ReblogProvider = ({ children }) => {
  const [reblog, setReblog] = useState(null);

  return (
    <SetReblogContext.Provider value={setReblog}>
      <ReblogContext.Provider value={reblog}>{children}</ReblogContext.Provider>
    </SetReblogContext.Provider>
  );
};
