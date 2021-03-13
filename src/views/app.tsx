import Graph from '../components/graph';
import Form from '../components/form';
import { makeStyles } from '@material-ui/core';
import { Investment } from '../types/investment';
import { useState } from 'react';
import { useSlider } from '../common/hooks';

const useStyles = makeStyles({
    app: {
        margin: '20px 40px',
    },
});

function App() {
    const classes = useStyles();
    const [time, , onTimeChange] = useSlider(5);
    const [investments, setInvestments] = useState<Investment[]>([]);

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

    return (
        <div className={classes.app}>
            <Form
                investments={investments}
                addInvestment={addInvestment}
                deleteInvestment={deleteInvestment}
                updateInvestment={updateInvestment}
                time={time}
                onTimeChange={onTimeChange}
            ></Form>
            <Graph investments={investments} time={time}></Graph>
        </div>
    );
}

export default App;
