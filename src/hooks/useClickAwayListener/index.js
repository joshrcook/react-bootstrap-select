import React from "react";

const useClickAwayListener = (el, onClickAway = () => {}) => {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (el && !el.contains(event.target)) {
        onClickAway(event);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [el, onClickAway]);
};

export default useClickAwayListener;
