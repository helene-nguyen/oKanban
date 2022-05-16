function isValidHexadecimalColor(color) {
    return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);
  }
  
module.exports = { isValidHexadecimalColor };
  
/**
 * const { isValidHexadecimalColor } = require("./utils");
 * 
 * condition à mettre dans tag
 *   if (color && ! isValidHexadecimalColor(color)) {
    return res.status(400).json({ error: "Invalid type: 'color' should be a valid hexadecimal code." });
  }
 */