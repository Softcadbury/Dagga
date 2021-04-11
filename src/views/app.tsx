import DataGraph from '../components/data-graph';
import DataForm from '../components/data-form';
import { makeStyles } from '@material-ui/core';
import { Investment } from '../types/investment';
import { useEffect } from 'react';
import { useLocalStorage, useSlider } from '../common/hooks';

const useStyles = makeStyles({
    app: {
        margin: '20px 40px',
    },
    '@media screen and (max-width: 600px)': {
        app: {
            margin: '10px',
        },
    },
});

function useTime() {
    const [time, setTime] = useLocalStorage<number>('time', 15);
    const [sliderTime, , onTimeChange] = useSlider(time);

    useEffect(() => {
        setTime(sliderTime);
    }, [setTime, sliderTime]);

    return {
        time: sliderTime,
        onTimeChange,
    };
}

function useInvestment() {
    const [investments, setInvestments] = useLocalStorage<Investment[]>(
        'investments',
        []
    );

    const addInvestment = (investment: Investment) => {
        setInvestments([...investments, investment]);
    };

    const deleteInvestment = (investment: Investment) => {
        setInvestments(investments.filter((p) => p.id !== investment.id));
    };

    const updateInvestment = (investment: Investment) => {
        const newInvestments = [...investments];
        const indexToUpdate = newInvestments.findIndex(
            (p) => p.id === investment.id
        );
        newInvestments[indexToUpdate] = investment;
        setInvestments(newInvestments);
    };

    return {
        investments,
        addInvestment,
        deleteInvestment,
        updateInvestment,
    };
}

function App() {
    const classes = useStyles();
    const { time, onTimeChange } = useTime();
    const {
        investments,
        addInvestment,
        deleteInvestment,
        updateInvestment,
    } = useInvestment();

    return (
        <div className={classes.app}>
            <DataForm
                investments={investments}
                addInvestment={addInvestment}
                deleteInvestment={deleteInvestment}
                updateInvestment={updateInvestment}
                time={time}
                onTimeChange={onTimeChange}
            />
            <DataGraph
                investments={investments.filter((p) => p.isVisible)}
                time={time}
            />
        </div>
    );
}

export default App;
