import { Grid, Slider, TextField } from '@material-ui/core';
import React from 'react';
import './App.css';
import Graph from './components/graph';

function App() {
    const [value, setValue] = React.useState<number | number[]>(30);

    const handleChange = (
        event: React.ChangeEvent<{}>,
        newValue: number | number[]
    ) => {
        setValue(newValue);
    };

    return (
        <div className="App">
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
            />
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
            <Graph></Graph>
        </div>
    );
}

export default App;
