import React, { useState } from 'react';
import { Grid, Paper, Slider, TextField } from '@material-ui/core';
import './app.css';
import Graph from '../components/graph';
import { useSlider, useTextField } from '../common/hooks';

function App() {
    const [
        initialAmount,
        setInitialAmount,
        onInitialAmountChange,
    ] = useTextField('1000');
    const [percentage, setPercentage, onPercentageChange] = useTextField('5');
    const [time, setTime, onTimeChange] = useSlider(5);

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
                            onChange={onTimeChange}
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
