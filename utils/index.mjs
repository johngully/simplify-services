import _ from "lodash";

// Convert a string to an integer greater than 0
//   '1' => 1
//   '0' => undefined
const toPositiveInteger = (value) => {
  const newValue = _.toInteger(value);
  return newValue ? newValue : undefined;
}

// Convert a string to a boolean value
//   'true' => true
//   'false' => false
//   undefined => false
const toBoolean = (value) => {
  if (value) {
    return JSON.parse(value.toLowerCase());
  }
  else {
    return false;
  }
}

// Add helper utilities as lodash mixins
_.mixin({
  toBoolean,
  toPositiveInteger
});

// Export lodash with mixins added and export helper functions for direct use
export {
  _,
  toBoolean,
  toPositiveInteger
}
