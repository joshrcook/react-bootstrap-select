function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import classNames from "classnames";
import { usePopper } from "react-popper";
import DropdownMenu from "./components/DropdownMenu";
import DropdownItem from "./components/DropdownItem";
import useClickAwayListener from "./hooks/useClickAwayListener";
import useMergedRefs from "./hooks/useMergedRefs";
const Select = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    className,
    children,
    value: valueProp,
    onChange,
    multiple,
    ...otherProps
  } = props;
  if (!valueProp) throw new Error("Select component must always have a value.");

  if (multiple) {
    if (valueProp && !Array.isArray(valueProp)) throw new Error("Select value must be an array");
  }

  const [isDropdownShown, setIsDropdownShown] = React.useState(false);
  const [selectElement, setSelectElement] = React.useState();
  const [popperElement, setPopperElement] = React.useState();
  const wrapperRef = React.useRef();
  const mergedRefs = useMergedRefs(ref, wrapperRef);
  useClickAwayListener(wrapperRef.current, () => {
    setIsDropdownShown(false);
  });
  const selectElementWidth = selectElement ? selectElement.offsetWidth : undefined;
  const {
    styles,
    attributes
  } = usePopper(selectElement, popperElement, {
    placement: "bottom-start"
  });

  const handleClickSelect = () => {
    setIsDropdownShown(curr => !curr);
  };

  const handleClickItem = (e, {
    value
  }) => {
    e.persist();

    if (multiple) {
      const newValue = valueProp.indexOf(value) === -1 ? [...valueProp, value] : valueProp.filter(val => val !== value);
      e.target.value = newValue;
      onChange && onChange(e);
    } else {
      if (value !== valueProp) {
        e.target.value = value;
        onChange && onChange(e);
      }

      setIsDropdownShown(false);
    }
  };

  const isItemActive = child => {
    const value = child.props.value || child.props.children;

    if (multiple) {
      return valueProp.indexOf(value) > -1;
    } else {
      return valueProp === value;
    }
  };

  const getSelectText = () => multiple ? valueProp.map(value => React.Children.toArray(children).filter(child => {
    const childVal = child.props.value || child.props.children;
    return value === childVal;
  }).map(child => child.props.children).shift()).join(", ") : React.Children.toArray(children).filter(child => (child.props.value || child.props.children) === valueProp).map(child => child.props.children).shift();

  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames(className)
  }, otherProps, {
    ref: mergedRefs
  }), /*#__PURE__*/React.createElement("div", {
    className: "custom-select",
    ref: setSelectElement,
    onClick: handleClickSelect
  }, getSelectText()), /*#__PURE__*/React.createElement(DropdownMenu, _extends({
    show: isDropdownShown,
    ref: setPopperElement,
    style: {
      width: selectElementWidth,
      ...styles.popper
    }
  }, attributes.popper), React.Children.map(children, child => /*#__PURE__*/React.createElement(DropdownItem, {
    className: classNames({
      active: isItemActive(child)
    }),
    onClick: e => {
      handleClickItem(e, {
        value: child.props.value || child.props.children
      });
    }
  }, child.props.children))));
});
export default Select;