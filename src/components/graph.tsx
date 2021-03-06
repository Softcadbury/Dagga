import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface GraphProps {
    initialAmount: number;
    percentage: number;
    time: number;
}

const Graph = ({ initialAmount, percentage, time }: GraphProps) => {
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
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default Graph;
