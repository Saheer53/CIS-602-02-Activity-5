const calculateCommissionFunction = require('../CalculateComission');

describe('calculateCommissionFunction: Commission Calculation Based on Sales', () => {

    test('should handle sales under commission threshold', () => {
        const [totalSales, commission] = calculateCommissionFunction(5, 5, 5);
        expect(totalSales).toBe(5 * 45 + 5 * 30 + 5 * 25);
        expect(commission).toBe(totalSales * 0.1);
    });

    test('should handle sales just over commission threshold', () => {
        const [totalSales, commission] = calculateCommissionFunction(10, 10, 10);
        expect(totalSales).toBe(10 * 45 + 10 * 30 + 10 * 25);
        expect(commission).toBe(totalSales * 0.15);
    });

    test('should handle sales well over commission threshold', () => {
        const [totalSales, commission] = calculateCommissionFunction(20, 20, 20);
        expect(totalSales).toBe(20 * 45 + 20 * 30 + 20 * 25);
        expect(commission).toBe(totalSales * 0.2);
    });

    test('should return error when lock quantity exceeds limits', () => {
        const result = calculateCommissionFunction(71, 10, 10);
        expect(result).toBe("Sales quantities exceed maximum limits.");
    });

    test('should return error when stock quantity exceeds limits', () => {
        const result = calculateCommissionFunction(10, 81, 10);
        expect(result).toBe("Sales quantities exceed maximum limits.");
    });

    test('should return error when barrel quantity exceeds limits', () => {
        const result = calculateCommissionFunction(10, 10, 91);
        expect(result).toBe("Sales quantities exceed maximum limits.");
    });

    test('should calculate commission correctly without subtracting lock commission', () => {
        const [totalSales, commission] = calculateCommissionFunction(10, 10, 10);
        // The expected total commission should not subtract the lock commission
        const expectedCommission = (10 * 45 + 10 * 30 + 10 * 25) * 0.15;
        expect(commission).toBe(expectedCommission);
    });
});
