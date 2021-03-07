import Graph from '../components/graph';
import { useSlider, useTextField } from '../common/hooks';
import Form from '../components/form';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    app: {
        margin: '20px 40px',
    },
});

function App() {
    const classes = useStyles();
    const [initialAmount, , onInitialAmountChange] = useTextField('1000');
    const [percentage, , onPercentageChange] = useTextField('5');
    const [time, , onTimeChange] = useSlider(5);

    return (
        <div className={classes.app}>
            <Form
                initialAmount={initialAmount}
                onInitialAmountChange={onInitialAmountChange}
                percentage={percentage}
                onPercentageChange={onPercentageChange}
                time={time}
                onTimeChange={onTimeChange}
            ></Form>
            <Graph
                initialAmount={Number(initialAmount)}
                percentage={Number(percentage)}
                time={time}
            ></Graph>
        </div>
    );
}

export default App;
