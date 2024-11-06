// tests/helpers/generatePassword.js

// Function to generate a valid password
export function generatePassword() {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*';
    
    // Choose at least 3 character types
    const passwordArray = [
        lower[Math.floor(Math.random() * lower.length)],
        upper[Math.floor(Math.random() * upper.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        special[Math.floor(Math.random() * special.length)],
    ];
    
    // Fill the rest of the password with random characters from all types
    const allCharacters = lower + upper + numbers + special;
    for (let i = 4; i < 8; i++) { // Add remaining characters to reach at least 8
        passwordArray.push(allCharacters[Math.floor(Math.random() * allCharacters.length)]);
    }

    // Shuffle the password array to mix character types
    return passwordArray.sort(() => Math.random() - 0.5).join('');
}
