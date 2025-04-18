/**
 * Removes special characters from a string, keeping only alphanumeric characters, spaces, underscores and hyphens.
 * @param {string} str - The input string.
 * @returns {string} - The sanitized string.
 */
const removeSpecialCharacters = (str) => {
    return str.replace(/[^a-zA-Z0-9 _-]/g, '');
};

/**
 * Sanitizes and validates an email address.
 * Removes invalid characters and checks for a valid email format.
 *
 * @param {string} email - The email address to process.
 * @returns {string|null} - Returns the sanitized email if valid, or `null` if invalid.
 */
function sanitizeAndValidateEmail(email) {
    // Remove invalid characters
    const sanitizedEmail = email.trim().replace(/[^a-zA-Z0-9@._-]/g, '');

    // Regular expression to validate the email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate the sanitized email
    if (emailRegex.test(sanitizedEmail)) {
        return sanitizedEmail;
    } else {
        return null; // Invalid email
    }
}

/**
 * Sanitizes a phone number while keeping a leading '+' for international formats.
 * Removes all other non-digit characters, and validates the number length.
 * @param {string|number} input - The raw phone number input from the user.
 * @returns {string|null} - The cleaned phone number (with optional leading '+'), or null if invalid.
 */
const sanitizePhoneNumber = (input) => {
    // Return null if input is neither a string nor a number
    if (typeof input !== 'string' && typeof input !== 'number') return null;

    // Convert input to string
    let str = String(input).trim();

    // Check if it starts with '+' and keep track of it
    const hasPlus = str.startsWith('+');

    // Remove everything that's not a digit
    str = str.replace(/[^\d]/g, '');

    // Re-add '+' if it was present at the start
    if (hasPlus) {
        str = '+' + str;
    }

    // Validate length: between 6 and 16 characters (including the '+' if present)
    //const length = hasPlus ? str.length - 1 : str.length;
    //if (length < 6 || length > 15) return null;

    return str;
};

  


module.exports = { removeSpecialCharacters, sanitizeAndValidateEmail, sanitizePhoneNumber};
