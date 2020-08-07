const useMergedRefs = (...refs) => {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        return ref(value);
      } else if (ref) {
        ref.current = value;
      }
    });
  };
};

export default useMergedRefs;
