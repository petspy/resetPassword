export const validatePassword = (value: string): PasswordValidationResult => {
    const errors = [];
    if (value.length > 15) {
        return { isValid: true };
    }

    if (value.length < 8) {
        errors.push('Password must be at least 8 characters');
    }

    const matchedNumberCharacters = value.match(/[0-9]/g);
    if (!matchedNumberCharacters?.length) {
        errors.push('Password must have at least one number');
    }

    // Assuming all non-alphanumeric characters are special characters
    const matchedSpecialCharacters = value.match(/[^\w]/g);
    if (matchedSpecialCharacters?.length === undefined || matchedSpecialCharacters.length < 2) {
        errors.push('Password must have at least two special characters');
    }


    if (errors.length > 0) {
        return {
            isValid: false,
            errors
        };
    }

    return {
        isValid: true
    };
};