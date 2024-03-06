const calculateCommissionFunction = require('../CalculateComission');

describe('calculateCommissionFunction Tests', () => {

    test('TC1: Under all limits with minimal sales', () => {
        const [totalSales, commission] = calculateCommissionFunction(1, 1, 1);
        expect(totalSales).toBe(100);
        expect(commission).toBe(5.5); // 10 - 4.5 (deduction for one lock)
    });

    test('TC2: Under all limits with no sales', () => {
        const [totalSales, commission] = calculateCommissionFunction(0, 0, 0);
        expect(totalSales).toBe(0);
        expect(commission).toBe(0);
    });

    test('TC3: At limit for locks, under limit for others', () => {
        const [totalSales, commission] = calculateCommissionFunction(70, 1, 1);
        expect(totalSales).toBe(3225);
        expect(commission).toBe(322.5 - 4.5); // Correct commission minus commission for one lock
    });

    test('TC4: At limit for stocks, under limit for others', () => {
        const [totalSales, commission] = calculateCommissionFunction(1, 80, 1);
        expect(totalSales).toBe(2625);
        expect(commission).toBe(262.5 - 4.5);
    });

    test('TC5: At limit for barrels, under limit for others', () => {
        const [totalSales, commission] = calculateCommissionFunction(1, 1, 90);
        expect(totalSales).toBe(2475);
        expect(commission).toBe(247.5 - 4.5);
    });

    test('TC6: Just over limit for locks, under limit for others', () => {
        const [totalSales, commission] = calculateCommissionFunction(71, 1, 1);
        expect(totalSales).toBe(3260);
        expect(commission).toBe(326 - 4.5);
    });

    test('TC7: Well over limits for all', () => {
        const result = calculateCommissionFunction(71, 81, 91);
        expect(result).toEqual("Sales quantities exceed maximum limits.");
    });

    test('TC8: Maximum sales for commission rate 10%', () => {
        const [totalSales, commission] = calculateCommissionFunction(5, 14, 15);
        expect(totalSales).toBe(1000);
        expect(commission).toBe(95); // 100 - 5 (deduction for one lock)
    });

    test('TC9: Just over commission rate 10%', () => {
        const [totalSales, commission] = calculateCommissionFunction(6, 14, 15);
        expect(totalSales).toBe(1075);
        expect(commission).toBe(161.25 - 4.5);
    });

    test('TC10: Maximum sales for commission rate 15%', () => {
        const [totalSales, commission] = calculateCommissionFunction(10, 19, 20);
        expect(totalSales).toBe(1800);
        expect(commission).toBe(270 - 4.5);
    });

    test('TC11: Just over commission rate 15%', () => {
        const [totalSales, commission] = calculateCommissionFunction(11, 19, 20);
        expect(totalSales).toBe(1925);
        expect(commission).toBe(385 - 4.5);
    });

    test('TC12: High sales for commission rate 20%', () => {
        const [totalSales, commission] = calculateCommissionFunction(20, 30, 40);
        expect(totalSales).toBe(3650);
        expect(commission).toBe(730 - 4.5);
    });

    test('TC13: Over all limits individually but not together', () => {
        const [totalSales, commission] = calculateCommissionFunction(71, 79, 89);
        expect(totalSales).toBeGreaterThan(0);
        expect(commission).toBeLessThan(totalSales * 0.2);
    });

    test('TC14: At all limits', () => {
        const [totalSales, commission] = calculateCommissionFunction(70, 80, 90);
        expect(totalSales).toBe(7650);
        expect(commission).toBe(1530 - 4.5);
    });

    test('TC15: Over lock limit, at stock and barrel limits', () => {
        const [totalSales, commission] = calculateCommissionFunction(71, 80, 90);
        expect(totalSales).toBeGreaterThan(0);
        expect(commission).toBeLessThan((71 * 45 + 80 * 30 + 90 * 25) * 0.2);
    });
});
