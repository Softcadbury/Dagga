import { makeStyles } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Investment } from '../types/investment';

const useStyles = makeStyles({
    graph: {
        margin: '40px',
    },
});

interface InvestmentData {
    cumulatedAmounts: number[];
    cumulatedAmountsWithInterest: number[];
}

function computeInvestmentData(
    investment: Investment,
    time: number
): InvestmentData {
    const data: InvestmentData = {
        cumulatedAmounts: [],
        cumulatedAmountsWithInterest: [],
    };

    for (let i = 0; i <= time; i++) {
        if (i === 0) {
            data.cumulatedAmounts[i] = Number(investment.amount);
            data.cumulatedAmountsWithInterest[i] = Number(investment.amount);
        } else {
            data.cumulatedAmounts[i] = data.cumulatedAmounts[i - 1];
            data.cumulatedAmountsWithInterest[i] =
                data.cumulatedAmountsWithInterest[i - 1] +
                data.cumulatedAmountsWithInterest[i - 1] *
                    (Number(investment.percentage) / 100);
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
        cumulatedAmounts[i] = data.reduce(
            (a, b) => a + b.cumulatedAmounts[i],
            0
        );
        cumulatedAmountsWithInterest[i] = data.reduce(
            (a, b) => a + b.cumulatedAmountsWithInterest[i],
            0
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
            title: {
                text: 'Montant (€)',
            },
        },
        series: [
            {
                name: 'Cumul',
                data: cumulatedAmounts,
            },
            {
                name: 'Cumul avec intérêts',
                data: cumulatedAmountsWithInterest,
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
