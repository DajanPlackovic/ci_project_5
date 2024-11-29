import React, { createContext, useContext } from 'react';

export const PostContext = createContext();
export const SetPostContext = createContext();

export const usePostContext = () => useContext(PostContext);
export const useSetPostContext = () => useContext(SetPostContext);

export const PostContextProvider = ({ children }) => {
  const [post, setPost] = React.useState(null);

  return (
    <PostContext.Provider value={post}>
      <SetPostContext.Provider value={setPost}>
        {children}
      </SetPostContext.Provider>
    </PostContext.Provider>
  );
};
