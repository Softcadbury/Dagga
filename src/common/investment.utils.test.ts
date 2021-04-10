import {
    Investment,
    InvestmentData,
    InvestmentNumerical,
} from '../types/investment';
import {
    computeInvestmentData,
    computeInvestmentsData,
    convertInvestment,
    reduceInvestmentsData,
} from './investment.utils';

test('convertInvestment', () => {
    // Arrange
    const investment: Investment = {
        id: 1000,
        label: 'label',
        amount: '1',
        amountNet: '2',
        monthlyAmount: '3',
        monthlyAmountNet: '4',
        percentage: '5',
        isVisible: true,
    };

    // Act
    const result: InvestmentNumerical = convertInvestment(investment);

    // Assert
    expect(result.amount).toEqual(1);
    expect(result.amountNet).toEqual(2);
    expect(result.monthlyAmount).toEqual(3);
    expect(result.monthlyAmountNet).toEqual(4);
    expect(result.percentage).toEqual(5);
});

test('computeInvestmentData', () => {
    // Arrange
    const time = 5;
    const investment: InvestmentNumerical = {
        amount: 1000,
        amountNet: 100,
        monthlyAmount: 100,
        monthlyAmountNet: 10,
        percentage: 10,
    };

    // Act
    const result: InvestmentData = computeInvestmentData(investment, time);

    // Assert
    expect(result.cumulatedAmounts.length).toEqual(time + 1);
    expect(result.cumulatedAmountsWithInterest.length).toEqual(time + 1);

    [1000, 2200, 3400, 4600, 5800, 7000].forEach((value, index) => {
        expect(result.cumulatedAmounts[index]).toEqual(value);
    });

    [100, 230, 373, 530, 703, 894].forEach((value, index) => {
        expect(Math.round(result.cumulatedAmountsWithInterest[index])).toEqual(
            value
        );
    });
});

test('computeInvestmentsData', () => {
    // Arrange
    const time = 2;
    const investment1: Investment = {
        id: 1001,
        label: 'label 1',
        amount: '10',
        amountNet: '10',
        monthlyAmount: '10',
        monthlyAmountNet: '10',
        percentage: '10',
        isVisible: true,
    };

    const investment2: Investment = {
        id: 1002,
        label: 'label 1',
        amount: '20',
        amountNet: '20',
        monthlyAmount: '20',
        monthlyAmountNet: '20',
        percentage: '20',
        isVisible: true,
    };

    // Act
    const result: InvestmentData[] = computeInvestmentsData(
        [investment1, investment2],
        time
    );

    // Assert investment 1
    expect(result[0].cumulatedAmounts.length).toEqual(time + 1);
    expect(result[0].cumulatedAmountsWithInterest.length).toEqual(time + 1);

    [10, 130, 250].forEach((value, index) => {
        expect(result[0].cumulatedAmounts[index]).toEqual(value);
    });

    [10, 131, 264].forEach((value, index) => {
        expect(
            Math.round(result[0].cumulatedAmountsWithInterest[index])
        ).toEqual(value);
    });

    // Assert investment 2
    expect(result[1].cumulatedAmounts.length).toEqual(time + 1);
    expect(result[1].cumulatedAmountsWithInterest.length).toEqual(time + 1);

    [20, 260, 500].forEach((value, index) => {
        expect(result[1].cumulatedAmounts[index]).toEqual(value);
    });

    [20, 264, 557].forEach((value, index) => {
        expect(
            Math.round(result[1].cumulatedAmountsWithInterest[index])
        ).toEqual(value);
    });
});

test('reduceInvestmentsData', () => {
    // Arrange
    const time = 2;
    const investment1: InvestmentData = {
        cumulatedAmounts: [1, 1, 1],
        cumulatedAmountsWithInterest: [2, 2, 2],
    };
    const investment2: InvestmentData = {
        cumulatedAmounts: [3, 3, 3],
        cumulatedAmountsWithInterest: [4, 4, 4],
    };

    // Act
    const {
        cumulatedAmounts,
        cumulatedAmountsWithInterest,
    } = reduceInvestmentsData([investment1, investment2], time);

    // Assert
    [4, 4, 4].forEach((value, index) => {
        expect(cumulatedAmounts[index]).toEqual(value);
    });

    [6, 6, 6].forEach((value, index) => {
        expect(cumulatedAmountsWithInterest[index]).toEqual(value);
    });
});
