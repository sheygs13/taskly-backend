const { calculateTip, fahrenheitToCelcius, celciusToFahrenheit, add } = require('./math');

test('Should calculate total with tip', () => {
        const total = calculateTip(50, 10);
        expect(total).toBe(55);
});

test('Should calculate total with default tip', () => {
        const total = calculateTip(60);
        expect(total).toBe(63);
});

test('Should convert 132F to C', () => {
        const C = fahrenheitToCelcius(132);
        expect(C).toBe(55.55555555555556);
});

test('Should convert celcius to fahrenheit with a default value', () => {
        const F = celciusToFahrenheit();
        expect(F).toBe(212);
});

test('Should convert fahrenheit to celcius with a default value', () => {
        const C = fahrenheitToCelcius();
        expect(C).toBe(100);
});

test('Asynchronous tests', (done) => {
        setTimeout(() => {
                expect(2).toBe(0.5 + 1.5);
                done();
        }, 2000);
});

test('Should add two numbers', (done) => {
        add(1, 2)
                .then((data) => {
                        expect(data).toBe(3);
                        done();
                })
                .catch((error) => {
                        done(error);
                });
});
