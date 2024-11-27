import React, { Children, cloneElement } from 'react';

import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';
import MobileContent from './MobileContent';

const NavElement = ({ symbol, hint, children }) => {
  const childrenWithMobileContent = Children.map(children, (child) => {
    return cloneElement(child, {
      children: <MobileContent symbol={symbol} hint={hint} />,
    });
  });

  return (
    <OverlayTrigger
      placement='bottom'
      overlay={<Tooltip>{hint}</Tooltip>}
      trigger='hover'>
      {childrenWithMobileContent[0]}
    </OverlayTrigger>
  );
};

export default NavElement;
