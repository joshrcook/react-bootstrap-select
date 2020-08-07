import React from "react";
import classNames from "classnames";

const DropdownMenu = React.forwardRef((props, ref) => {
  const { className, show, ...otherProps } = props;
  return (
    <div
      className={classNames(
        "dropdown-menu",
        {
          show: Boolean(show)
        },
        className
      )}
      {...otherProps}
      ref={ref}
    />
  );
});

export default DropdownMenu;
