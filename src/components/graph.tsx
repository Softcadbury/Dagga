import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface GraphProps {
    value: number;
}

const Graph = ({ value }: GraphProps) => {
    const options = {
        title: {
            text: 'My chart',
        },
        series: [
            {
                data: [1, value, 3],
            },
        ],
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default Graph;
