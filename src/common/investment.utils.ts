import {
    Investment,
    InvestmentData,
    InvestmentNumerical,
} from '../types/investment';
import { toFixedNumber } from './utils';

export function convertInvestment(investment: Investment): InvestmentNumerical {
    return {
        amount: Number(investment.amount),
        amountNet: Number(investment.amountNet),
        monthlyAmount: Number(investment.monthlyAmount),
        monthlyAmountNet: Number(investment.monthlyAmountNet),
        percentage: Number(investment.percentage),
    };
}

export function computeInvestmentData(
    investment: InvestmentNumerical,
    time: number
): InvestmentData {
    const data: InvestmentData = {
        cumulatedAmounts: [],
        cumulatedAmountsWithInterest: [],
    };

    for (let i = 0; i <= time; i++) {
        if (i === 0) {
            data.cumulatedAmounts[i] = investment.amount;
            data.cumulatedAmountsWithInterest[i] = investment.amountNet;
        } else {
            const previousAmount = data.cumulatedAmounts[i - 1];
            const previousAmountWithInterest =
                data.cumulatedAmountsWithInterest[i - 1];

            data.cumulatedAmounts[i] =
                previousAmount + investment.monthlyAmount * 12;

            data.cumulatedAmountsWithInterest[i] =
                previousAmountWithInterest +
                previousAmountWithInterest * (investment.percentage / 100) +
                investment.monthlyAmountNet * 12;
        }
    }

    return data;
}

export function computeInvestmentsData(
    investments: Investment[],
    time: number
): InvestmentData[] {
    const data: InvestmentData[] = [];

    for (let i = 0; i < investments.length; i++) {
        data[i] = computeInvestmentData(
            convertInvestment(investments[i]),
            time
        );
    }

    return data;
}

export function reduceInvestmentsData(data: InvestmentData[], time: number) {
    const cumulatedAmounts: number[] = [];
    const cumulatedAmountsWithInterest: number[] = [];

    for (let i = 0; i <= time; i++) {
        cumulatedAmounts[i] = toFixedNumber(
            data.reduce((a, b) => a + b.cumulatedAmounts[i], 0)
        );
        cumulatedAmountsWithInterest[i] = toFixedNumber(
            data.reduce((a, b) => a + b.cumulatedAmountsWithInterest[i], 0)
        );
    }

    return {
        cumulatedAmounts,
        cumulatedAmountsWithInterest,
    };
}
