import { validatePassword } from './utils';

describe('authentication module', () => {
    test('Password must be at least 8 characters', () => {
        // Arrange
        const password = 'abc123';

        // Act
        const validationResult = validatePassword(password);

        // Assert
        expect(validationResult.errors).toContain('Password must be at least 8 characters');
    });

    test('No restriction apply when there is more than 15 characters', () => {
        // Arrange
        const password = '1234567890123456';

        // Act
        const validationResult = validatePassword(password);

        // Assert
        expect(validationResult.isValid).toBeTruthy();
        expect(validationResult.errors).toBeFalsy();
    });

    test('Restriction apply where exactly 15 characters', () => {
        // Arrange
        const password = '123456789012345';

        // Act
        const validationResult = validatePassword(password);

        // Assert
        expect(validationResult.isValid).toBeFalsy();
        expect(validationResult.errors).toBeTruthy();
    });

    test('Password must have at least one number when its between 8 to 15 characters', () => {
        // Arrange
        const password = 'ABCabc@@';

        // Act
        const validationResult = validatePassword(password);

        // Assert
        expect(validationResult.isValid).toBeFalsy();
        expect(validationResult.errors).toBeTruthy();
    });

    test('Password must have at least two special characters when its between 8 to 15 characters', () => {
        // Arrange
        const password = 'ABCabc1@';

        // Act
        const validationResult = validatePassword(password);

        // Assert
        expect(validationResult.isValid).toBeFalsy();
        expect(validationResult.errors).toContain('Password must have at least two special characters');
    });

    test('Password is valid when there is at least two special characters, at least one number and between 8 to 15 characters', () => {
        // Arrange
        const password = 'ABCabc1@@';

        // Act
        const validationResult = validatePassword(password);

        // Assert
        expect(validationResult.isValid).toBeTruthy();
    });

    test('Password can have more than two special characters when between 8 to 15 characters', () => {
        // Arrange
        const password = 'ABCabc1@@@';

        // Act
        const validationResult = validatePassword(password);

        // Assert
        expect(validationResult.isValid).toBeTruthy();
        expect(validationResult.errors).toBeFalsy();
    });

    test('Password can have more than one number when between 8 to 15 characters', () => {
        // Arrange
        const password = 'ABCabc11@@';

        // Act
        const validationResult = validatePassword(password);

        // Assert
        expect(validationResult.isValid).toBeTruthy();
        expect(validationResult.errors).toBeFalsy();
    });

    test('Password could have multiple errors', () => {
        // Arrange
        const password = '';

        // Act
        const validationResult = validatePassword(password);

        // Assert
        expect(validationResult.isValid).toBeFalsy();
        expect(validationResult.errors?.length).toBeGreaterThan(1);
    });
});