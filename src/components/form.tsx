import { ChangeEvent } from 'react';
import { Grid, makeStyles, Paper, Slider, TextField } from '@material-ui/core';

interface FormProps {
    initialAmount: string;
    onInitialAmountChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    percentage: string;
    onPercentageChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onTimeChange: (
        event: React.ChangeEvent<{}>,
        newValue: number | number[]
    ) => void;
    time: number;
}

const useStyles = makeStyles({
    form: {
        maxWidth: '1000px',
        margin: 'auto',
        padding: '16px',
    },
    timeContainer: {
        marginTop: 20,
    },
    sliderContainer: {
        width: 'calc(100% - 130px)',
    },
});

const Form = ({
    initialAmount,
    onInitialAmountChange,
    percentage,
    onPercentageChange,
    time,
    onTimeChange,
}: FormProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.form}>
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
            <Grid container spacing={4} className={classes.timeContainer}>
                <Grid item>Période</Grid>
                <Grid item className={classes.sliderContainer}>
                    <Slider
                        value={time}
                        onChange={onTimeChange}
                        aria-labelledby="continuous-slider"
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Form;
