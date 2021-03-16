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
import {
    SliderChangeCallbackType,
    useTextField,
    useToggleState,
} from '../common/hooks';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { generateId } from '../common/utils';

const useStyles = makeStyles((theme) => {
    return {
        form: {
            maxWidth: '1500px',
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
        investment: {
            marginBottom: theme.spacing(2),
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
    const classes = useStyles();

    const [label, , onLabelChange] = useTextField(investment.label);
    const [amount, , onAmountChange] = useTextField(investment.amount);
    const [amountNet, , onAmountNetChange] = useTextField(investment.amountNet);
    const [monthlyAmount, , onMonthlyAmountChange] = useTextField(
        investment.monthlyAmount
    );
    const [monthlyAmountNet, , onMonthlyAmountNetChange] = useTextField(
        investment.monthlyAmountNet
    );
    const [percentage, , onPercentageChange] = useTextField(
        investment.percentage
    );
    const [isVisible, toggleIsVisible] = useToggleState(investment.isVisible);

    const onDeleteInvestmentClick = useCallback(() => {
        deleteInvestment(investment);
    }, [deleteInvestment, investment]);

    useEffect(() => {
        if (
            investment.amount !== amount ||
            investment.percentage !== percentage
        ) {
            updateInvestment({
                id: investment.id,
                label,
                amount,
                amountNet,
                monthlyAmount,
                monthlyAmountNet,
                percentage,
                isVisible,
            });
        }
    }, [
        investment,
        amount,
        percentage,
        updateInvestment,
        label,
        amountNet,
        monthlyAmount,
        monthlyAmountNet,
        isVisible,
    ]);

    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            className={classes.investment}
        >
            <Grid item xs={2}>
                <TextField
                    label="Label"
                    value={label}
                    onChange={onLabelChange}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    label="Versement initial"
                    value={amount}
                    onChange={onAmountChange}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    label="Versement initial NET"
                    value={amountNet}
                    onChange={onAmountNetChange}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    label="Mensualité"
                    value={monthlyAmount}
                    onChange={onMonthlyAmountChange}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    label="Mensualité NET"
                    value={monthlyAmountNet}
                    onChange={onMonthlyAmountNetChange}
                />
            </Grid>
            <Grid item xs={1}>
                <TextField
                    label="Rendement"
                    value={percentage}
                    onChange={onPercentageChange}
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton
                    color={'primary'}
                    onClick={toggleIsVisible}
                    size="small"
                >
                    {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                <IconButton
                    color="primary"
                    onClick={onDeleteInvestmentClick}
                    size="small"
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
            label: '',
            amount: '',
            amountNet: '',
            monthlyAmount: '',
            monthlyAmountNet: '',
            percentage: '',
            isVisible: true,
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
