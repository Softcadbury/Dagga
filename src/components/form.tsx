import { useCallback, useEffect } from 'react';
import {
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Slider,
    TextField,
    Typography,
} from '@material-ui/core';
import { Investment } from '../types/investment';
import { SliderChangeCallbackType, useTextField } from '../common/hooks';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { generateId } from '../common/utils';

const useStyles = makeStyles((theme) => {
    return {
        form: {
            maxWidth: '1000px',
            margin: 'auto',
            padding: theme.spacing(2),
        },
        timeContainer: {
            marginTop: theme.spacing(1),
        },
        sliderContainer: {
            width: 'calc(100% - 130px)',
        },
        addButton: {
            marginLeft: theme.spacing(1),
        },
    };
});

interface RenderInvestmentProps {
    investment: Investment;
    deleteInvestment: (investment: Investment) => void;
    updateInvestment: (investment: Investment) => void;
}

const RenderInvestment = ({
    investment,
    deleteInvestment,
    updateInvestment,
}: RenderInvestmentProps) => {
    const [amount, , onAmountChange] = useTextField(investment.amount);
    const [percentage, , onPercentageChange] = useTextField(
        investment.percentage
    );

    const onDeleteInvestmentClick = useCallback(() => {
        deleteInvestment(investment);
    }, [deleteInvestment, investment]);

    useEffect(() => {
        updateInvestment({
            id: investment.id,
            amount: amount,
            percentage: percentage,
        });
    }, [investment, amount, percentage, updateInvestment]);

    return (
        <Grid container spacing={4} alignItems="center">
            <Grid item>
                <TextField
                    label="Montant initial (€)"
                    value={amount}
                    onChange={onAmountChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Rendement (%)"
                    value={percentage}
                    onChange={onPercentageChange}
                />
            </Grid>
            <Grid item>
                <IconButton
                    color="primary"
                    aria-label="Supprimer un investissement"
                    onClick={onDeleteInvestmentClick}
                >
                    <ClearIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

interface FormProps {
    investments: Investment[];
    addInvestment: (investment: Investment) => void;
    deleteInvestment: (investment: Investment) => void;
    updateInvestment: (investment: Investment) => void;
    time: number;
    onTimeChange: SliderChangeCallbackType;
}

const Form = ({
    investments,
    addInvestment,
    deleteInvestment,
    updateInvestment,
    time,
    onTimeChange,
}: FormProps) => {
    const classes = useStyles();

    const onAddInvestmentClick = useCallback(() => {
        addInvestment({
            id: generateId(),
            amount: '1000',
            percentage: '1',
        });
    }, [addInvestment]);

    return (
        <Paper className={classes.form}>
            <Grid container spacing={4} className={classes.timeContainer}>
                <Grid item>
                    <Typography variant="h5">Durée</Typography>
                </Grid>
                <Grid item className={classes.sliderContainer}>
                    <Slider
                        value={time}
                        onChange={onTimeChange}
                        aria-labelledby="continuous-slider"
                        marks={true}
                        min={1}
                        max={30}
                        valueLabelDisplay="on"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={4} alignItems="center">
                <Grid item>
                    <Typography variant="h5">Investissements</Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        color="primary"
                        aria-label="Ajouter un investissement"
                        onClick={onAddInvestmentClick}
                    >
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
            {investments.map((investment) => (
                <RenderInvestment
                    key={investment.id}
                    investment={investment}
                    deleteInvestment={deleteInvestment}
                    updateInvestment={updateInvestment}
                />
            ))}
        </Paper>
    );
};

export default Form;
