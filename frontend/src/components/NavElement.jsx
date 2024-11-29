import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';

/**
 * MobileContent is a component that renders a Material symbol and the hint
 * next to it. It is meant to be used for mobile devices, where the symbol is
 * displayed, and the hint is displayed next to it. The hint is not displayed
 * for larger devices.
 *
 * @param {string} symbol The symbol to be displayed.
 * @param {string} hint The hint to be displayed next to the symbol.
 * @returns {React.ReactElement} A React element that renders a Material symbol
 * and the hint.
 */
const MobileContent = ({ symbol, hint }) => {
  return (
    <>
      <span className='material-symbols-outlined'>{symbol}</span>
      <span className='d-lg-none d-inline-block m-2'>{hint}</span>
    </>
  );
};

MobileContent.propTypes = {
  symbol: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
};

/**
 * NavElement is a component that wraps a NavDropdown.Item with a Material symbol and a tooltip.
 * For mobile devices, it renders the Material symbol and the hint next to it.
 * For larger devices, it renders the Material symbol and the hint is displayed as a tooltip.
 *
 * @param {string} symbol The Material symbol to be displayed.
 * @param {string} hint The hint to be displayed next to the symbol or as a tooltip.
 * @param {React.ReactElement} children The child element to be wrapped.
 * @returns {React.ReactElement} A React element that wraps the child element and renders the Material symbol and the hint.
 */
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

NavElement.propTypes = {
  symbol: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default NavElement;
