// src/utilities/calcPrice.js

// Define individual prices for each feature option
const prices = {
    exterior: {
        standard: 500,
        premium: 1000,
        deluxe: 1500,
    },
    roof: {
        standard: 200,
        panoramic: 500,
        convertible: 800,
    },
    wheels: {
        basic: 300,
        sport: 600,
        offroad: 900,
    },
    interior: {
        fabric: 400,
        leather: 700,
        luxury: 1200,
    }
};

// Function to calculate the price based on user selections
export const calculatePrice = (exterior, roof, wheels, interior) => {
    const exteriorPrice = prices.exterior[exterior] || 0;
    const roofPrice = prices.roof[roof] || 0;
    const wheelsPrice = prices.wheels[wheels] || 0;
    const interiorPrice = prices.interior[interior] || 0;

    // Total price calculation
    return exteriorPrice + roofPrice + wheelsPrice + interiorPrice;
};
