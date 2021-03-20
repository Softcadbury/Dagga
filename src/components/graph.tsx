import { makeStyles } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Investment } from '../types/investment';

const useStyles = makeStyles((theme) => {
    return {
        graph: {
            maxWidth: '1500px',
            margin: 'auto',
            paddingTop: theme.spacing(3),
        },
    };
});

function toFixedNumber(num: number): number {
    var pow = Math.pow(10, 2);
    return Math.round(num * pow) / pow;
}

interface InvestmentData {
    cumulatedAmounts: number[];
    cumulatedAmountsWithInterest: number[];
}

function convertInvestmentData(investment: Investment) {
    return {
        amount: Number(investment.amount),
        amountNet: Number(investment.amountNet),
        monthlyAmount: Number(investment.monthlyAmount),
        monthlyAmountNet: Number(investment.monthlyAmountNet),
        percentage: Number(investment.percentage),
    };
}

function computeInvestmentData(
    investment: Investment,
    time: number
): InvestmentData {
    const data: InvestmentData = {
        cumulatedAmounts: [],
        cumulatedAmountsWithInterest: [],
    };

    const {
        amount,
        amountNet,
        monthlyAmount,
        monthlyAmountNet,
        percentage,
    } = convertInvestmentData(investment);

    for (let i = 0; i <= time; i++) {
        if (i === 0) {
            data.cumulatedAmounts[i] = amount;
            data.cumulatedAmountsWithInterest[i] = amountNet;
        } else {
            const previousAmount = data.cumulatedAmounts[i - 1];
            const previousAmountWithInterest =
                data.cumulatedAmountsWithInterest[i - 1];

            data.cumulatedAmounts[i] = previousAmount + monthlyAmount * 12;

            data.cumulatedAmountsWithInterest[i] =
                previousAmountWithInterest +
                previousAmountWithInterest * (percentage / 100) +
                monthlyAmountNet * 12;
        }
    }

    return data;
}

interface GraphProps {
    investments: Investment[];
    time: number;
}

const Graph = ({ investments, time }: GraphProps) => {
    const classes = useStyles();
    const data: InvestmentData[] = [];

    for (let i = 0; i < investments.length; i++) {
        data[i] = computeInvestmentData(investments[i], time);
    }

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

    const options = {
        title: {
            text: '',
        },
        credits: {
            enabled: false,
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Montant (€)',
            },
        },
        xAxis: {
            allowDecimals: false,
        },
        plotOptions: {
            series: {
                lineWidth: 3,
            },
        },
        tooltip: {
            formatter: function (): string {
                var amount = (this as any).y as number;
                var year = (this as any).x as number;
                var displayedYear =
                    year === 1
                        ? `${year} an<br/>`
                        : year > 1
                        ? `${year} ans<br/>`
                        : '';
                return `${displayedYear}<b>${amount}€</b>`;
            },
            borderWidth: 2,
        },
        series: [
            {
                name: 'Cumul',
                data: cumulatedAmounts,
                color: '#DF5353',
            },
            {
                name: 'Cumul NET avec intérêts',
                data: cumulatedAmountsWithInterest,
                color: '#55BF3B',
            },
        ],
    };

    return (
        <>
            {investments.length !== 0 && (
                <div className={classes.graph}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
            )}
        </>
    );
};

export default Graph;
