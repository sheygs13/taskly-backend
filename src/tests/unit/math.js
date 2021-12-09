const calculateTip = (total, tipPercent = 5) => Math.round(total * (1 + tipPercent / 100));

const fahrenheitToCelcius = (F = 212) => (F - 32) / 1.8;

const celciusToFahrenheit = (C = 100) => 1.8 * C + 32;

const add = (a, b) => {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                        if (a < 0 || b < 0) {
                                reject(new Error('a or b cannot be negative'));
                                return;
                        }
                        resolve(a + b);
                }, 2000);
        });
};

module.exports = {
        calculateTip,
        fahrenheitToCelcius,
        celciusToFahrenheit,
        add,
};
