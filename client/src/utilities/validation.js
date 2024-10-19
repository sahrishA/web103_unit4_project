// src/utilities/validation.js

// Function to validate if the selected features are compatible
export const validateCombination = (exterior, roof, wheels, interior) => {
    // Example validation logic
    if (exterior === 'deluxe' && roof === 'convertible') {
        return 'Deluxe exterior cannot have a convertible roof';
    }
    
    if (wheels === 'offroad' && interior === 'luxury') {
        return 'Offroad wheels are not compatible with a luxury interior';
    }

    // If all combinations are valid, return null (no errors)
    return null;
};
