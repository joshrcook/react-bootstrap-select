import React from "react";
import classNames from "classnames";

const DropdownItem = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <div
      className={classNames("dropdown-item", className)}
      {...otherProps}
      ref={ref}
    />
  );
});

export default DropdownItem;
