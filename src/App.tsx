import { Grid, Paper, Slider, TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import './App.css';
import Graph from './components/graph';

function useTextField(
    initialValue: string
): [
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    onChangeCallback: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
] {
    const [value, setValue] = useState(initialValue);

    const onChangeCallback = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(event.currentTarget.value);
    };

    return [value, setValue, onChangeCallback];
}

function App() {
    const [
        initialAmount,
        setInitialAmount,
        onInitialAmountChange,
    ] = useTextField('1000');
    const [percentage, setPercentage, onPercentageChange] = useTextField('5');
    const [time, setTime] = useState<number>(5);

    const handleTimeChange = (
        event: React.ChangeEvent<{}>,
        newValue: number | number[]
    ) => {
        if (Array.isArray(newValue)) {
            setTime(newValue[0]);
        } else {
            setTime(newValue);
        }
    };

    return (
        <div className="app">
            <Paper className="form">
                <Grid container spacing={4}>
                    <Grid item>
                        <TextField
                            label="Montant initial (€)"
                            value={initialAmount}
                            onChange={onInitialAmountChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Rendement (%)"
                            value={percentage}
                            onChange={onPercentageChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4} style={{ marginTop: 20 }}>
                    <Grid item>Période</Grid>
                    <Grid item style={{ width: 'calc(100% - 130px)' }}>
                        <Slider
                            value={time}
                            onChange={handleTimeChange}
                            aria-labelledby="continuous-slider"
                        />
                    </Grid>
                </Grid>
            </Paper>
            <div className="graph-container">
                <Graph
                    initialAmount={Number(initialAmount)}
                    percentage={Number(percentage)}
                    time={time}
                ></Graph>
            </div>
        </div>
    );
}

export default App;
