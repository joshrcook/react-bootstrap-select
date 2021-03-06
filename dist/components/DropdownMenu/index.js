function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import classNames from "classnames";
const DropdownMenu = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    className,
    show,
    ...otherProps
  } = props;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames("dropdown-menu", {
      show: Boolean(show)
    }, className)
  }, otherProps, {
    ref: ref
  }));
});
export default DropdownMenu;