import { Grid, Paper, Slider, TextField } from '@material-ui/core';
import React from 'react';
import './App.css';
import Graph from './components/graph';

function App() {
    const [value, setValue] = React.useState<number>(30);

    const handleChange = (
        event: React.ChangeEvent<{}>,
        newValue: number | number[]
    ) => {
        if (Array.isArray(newValue)) {
            setValue(newValue[0]);
        } else {
            setValue(newValue);
        }
    };

    return (
        <div className="app">
            <Paper style={{ padding: 16 }} className="form">
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>test</Grid>
                        <Grid item xs>
                            <Slider
                                value={value}
                                onChange={handleChange}
                                aria-labelledby="continuous-slider"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <div className="app">
                <Graph value={value}></Graph>
            </div>
        </div>
    );
}

export default App;
