import { makeStyles } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface GraphProps {
    initialAmount: number;
    percentage: number;
    time: number;
}

const useStyles = makeStyles({
    graph: {
        margin: '40px',
    },
});

const Graph = ({ initialAmount, percentage, time }: GraphProps) => {
    const classes = useStyles();
    const data: number[] = [initialAmount];

    for (let i = 1; i <= time; i++) {
        data[i] = data[i - 1] + data[i - 1] * (percentage / 100);
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
                data,
            },
        ],
    };

    return (
        <div className={classes.graph}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default Graph;
