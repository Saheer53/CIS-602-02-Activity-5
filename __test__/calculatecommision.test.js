const calculateCommissionFunction = require('../CalculateComission');
describe('calculateCommissionFunction: Commission Calculation Based on Sales with AND logic', () => {

    test('TC1: Basic sales calculation', () => {
        const [totalSales, commission] = calculateCommissionFunction(1, 1, 1);
        expect(totalSales).toBe(100);
        expect(commission).toBe(5.5);
    });

    test('TC2: Sales at maximum limits', () => {
        const [totalSales, commission] = calculateCommissionFunction(70, 80, 90);
        expect(totalSales).toBe(7650);
        expect(commission).toBe(1521);
    });

    test('TC3: Sales just over first commission threshold', () => {
        const [totalSales, commission] = calculateCommissionFunction(8, 10, 10);
        expect(totalSales).toBe(8 * 45 + 10 * 30 + 10 * 25);
        expect(commission).toBe(totalSales * 0.1 - 45 * 0.1);
    });

    test('TC4: Sales just over second commission threshold', () => {
        const [totalSales, commission] = calculateCommissionFunction(20, 20, 20);
        expect(totalSales).toBe(20 * 45 + 20 * 30 + 20 * 25);
        expect(commission).toBe(totalSales * 0.15 - 45 * 0.15);
    });

    test('TC5: Sales well over the highest commission threshold', () => {
        const [totalSales, commission] = calculateCommissionFunction(30, 30, 30);
        expect(totalSales).toBe(30 * 45 + 30 * 30 + 30 * 25);
        expect(commission).toBe(totalSales * 0.2 - 45 * 0.2);
    });

    test('TC6: Lock quantity exceeds limits', () => {
        const [totalSales, commission] = calculateCommissionFunction(71, 10, 10);
        expect(totalSales).toBeGreaterThan(0);
        expect(commission).toBeLessThan(totalSales * 0.1);
    });

    test('TC7: Stock quantity exceeds limits', () => {
        const [totalSales, commission] = calculateCommissionFunction(10, 81, 10);
        expect(totalSales).toBeGreaterThan(0);
        expect(commission).toBeLessThan(totalSales * 0.1);
    });

    test('TC8: Barrel quantity exceeds limits', () => {
        const [totalSales, commission] = calculateCommissionFunction(10, 10, 91);
        expect(totalSales).toBeGreaterThan(0);
        expect(commission).toBeLessThan(totalSales * 0.1);
    });

    test('TC9: All quantities exceed limits', () => {
        const result = calculateCommissionFunction(71, 81, 91);
        expect(result).toBe("Sales quantities exceed maximum limits.");
    });

    test('TC10: Zero quantities', () => {
        const [totalSales, commission] = calculateCommissionFunction(0, 0, 0);
        expect(totalSales).toBe(0);
        expect(commission).toBe(0);
    });

    test('TC11: Negative quantities', () => {
        const [totalSales, commission] = calculateCommissionFunction(-1, -1, -1);
        expect(totalSales).toBe(-100);
        expect(commission).toBe(-5.5);
    });

    test('TC12: Mixed positive and negative quantities', () => {
        const [totalSales, commission] = calculateCommissionFunction(10, -10, 10);
        expect(totalSales).toBe(10 * 45 - 10 * 30 + 10 * 25);
        expect(commission).toBe(totalSales * 0.1 - 45 * 0.1);
    });

    test('TC13: Sales exactly at first commission threshold', () => {
        const [totalSales, commission] = calculateCommissionFunction(10, 5, 7);
        expect(totalSales).toBe(1000);
        expect(commission).toBe(95); // 100 - 5 (deduction for one lock)
    });

    test('TC14: Sales exactly at second commission threshold', () => {
        const [totalSales, commission] = calculateCommissionFunction(15, 10, 12);
        expect(totalSales).toBe(1800);
        expect(commission).toBe(265.5); // 270 - 4.5 (deduction for one lock)
    });

    test('TC15: High quantities within limits', () => {
        const [totalSales, commission] = calculateCommissionFunction(50, 60, 70);
        expect(totalSales).toBe(50 * 45 + 60 * 30 + 70 * 25);
        expect(commission).toBe(totalSales * 0.2 - 45 * 0.2);
    });

});
