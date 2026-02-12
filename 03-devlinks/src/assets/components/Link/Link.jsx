import React, { Children } from 'react'


const Link = ({url, children}) => {
  return (
    <li>
       <a hraf={url}>{children}</a>
    </li>
  );
};

export default Link;