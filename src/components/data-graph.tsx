import { makeStyles } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const useStyles = makeStyles((theme) => {
    return {
        graph: {
            maxWidth: '1500px',
            margin: 'auto',
            padding: theme.spacing(10, 2, 4),
        },
    };
});

interface DataGraphProps {
    cumulatedAmounts: number[];
    cumulatedAmountsWithInterest: number[];
}

const DataGraph = ({
    cumulatedAmounts,
    cumulatedAmountsWithInterest,
}: DataGraphProps) => {
    const classes = useStyles();

    const options = {
        title: {
            text: '',
        },
        chart: {
            marginRight: 20,
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

    if (cumulatedAmounts.length === 0) {
        return <></>;
    }

    return (
        <div className={classes.graph}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default DataGraph;
