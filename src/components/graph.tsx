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
    const computation: number[][] = [];

    for (let i = 0; i <= time; i++) {
        computation[i] = [];
        if (i === 0) {
            for (let j = 0; j < investments.length; j++) {
                computation[i][j] = Number(investments[j].amount);
            }
        } else {
            for (let j = 0; j < investments.length; j++) {
                computation[i][j] =
                    computation[i - 1][j] +
                    computation[i - 1][j] *
                        (Number(investments[j].percentage) / 100);
            }
        }
    }

    const data = [];

    for (let i = 0; i < computation.length; i++) {
        data.push(computation[i].reduce((a, b) => a + b, 0));
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
                data: data,
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
