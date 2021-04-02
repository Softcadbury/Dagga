export interface Investment {
    id: number;
    label: string;
    amount: string;
    amountNet: string;
    monthlyAmount: string;
    monthlyAmountNet: string;
    percentage: string;
    isVisible: boolean;
}

export interface InvestmentNumerical {
    amount: number;
    amountNet: number;
    monthlyAmount: number;
    monthlyAmountNet: number;
    percentage: number;
}

export interface InvestmentData {
    cumulatedAmounts: number[];
    cumulatedAmountsWithInterest: number[];
}
