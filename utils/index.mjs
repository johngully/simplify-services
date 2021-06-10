import _ from "lodash";

// Convert a string to an integer greater than 0
//   '1' => 1
//   '0' => undefined
//   undefined || error => undefined
const toPositiveInteger = (value) => {
  try {
    const newValue = _.toInteger(value);
    return newValue ? newValue : undefined;
  }
  catch {
    return undefined;
  }
}

// Convert a string to a boolean value
//   'true' => true
//   'false' => false
//   undefined || error => undefined
const toBoolean = (value) => {
  try {
    return JSON.parse(value.toLowerCase());
  }
  catch {
    return undefined;
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
