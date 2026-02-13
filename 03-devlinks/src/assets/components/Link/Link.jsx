import React, { Children } from 'react';
import styles from "./Link.module.css";


const Link = ({url, children}) => {
  return (
    <li>
       <a hraf={url}>{children}</a>
    </li>
  );
};

export default Link;