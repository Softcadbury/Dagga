import { makeStyles } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Investment } from '../types/investment';

interface GraphProps {
    investments: Investment[];
    time: number;
}

const useStyles = makeStyles({
    graph: {
        margin: '40px',
    },
});

const Graph = ({ investments, time }: GraphProps) => {
    const classes = useStyles();
    const data: number[] = [];

    for (let i = 0; i <= time; i++) {
        data[i] = 0;

        if (i === 0) {
            for (let j = 0; j < investments.length; j++) {
                data[0] += Number(investments[j].amount);
            }
        } else {
            for (let j = 0; j < investments.length; j++) {
                data[i] +=
                    data[i - 1] +
                    data[i - 1] * (Number(investments[j].percentage) / 100); // todo - Apply percentage on correct amount
            }
        }
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
