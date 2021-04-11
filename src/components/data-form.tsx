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
import FileCopyIcon from '@material-ui/icons/FileCopy';
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
        icon: {
            fontSize: '1.3rem',
        },
    };
});

interface InvestmentFormProps {
    investment: Investment;
    addInvestment: (investment: Investment) => void;
    deleteInvestment: (investment: Investment) => void;
    updateInvestment: (investment: Investment) => void;
}

const InvestmentForm = ({
    investment,
    addInvestment,
    deleteInvestment,
    updateInvestment,
}: InvestmentFormProps) => {
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

    const onDuplicateClick = useCallback(() => {
        addInvestment({
            ...investment,
            id: generateId(),
            label: investment.label + ' copie',
        });
    }, [addInvestment, investment]);

    useEffect(() => {
        if (
            investment.label !== label ||
            investment.amount !== amount ||
            investment.amountNet !== amountNet ||
            investment.monthlyAmount !== monthlyAmount ||
            investment.monthlyAmountNet !== monthlyAmountNet ||
            investment.percentage !== percentage ||
            investment.isVisible !== isVisible
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
        updateInvestment,
        investment,
        label,
        amount,
        amountNet,
        monthlyAmount,
        monthlyAmountNet,
        percentage,
        isVisible,
    ]);

    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            className={classes.investment}
        >
            <Grid item lg={2} md={4} sm={6} xs={12}>
                <TextField
                    label="Label"
                    value={label}
                    onChange={onLabelChange}
                />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
                <TextField
                    label="Versement initial"
                    value={amount}
                    onChange={onAmountChange}
                />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
                <TextField
                    label="Versement initial NET"
                    value={amountNet}
                    onChange={onAmountNetChange}
                />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
                <TextField
                    label="Mensualité"
                    value={monthlyAmount}
                    onChange={onMonthlyAmountChange}
                />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
                <TextField
                    label="Mensualité NET"
                    value={monthlyAmountNet}
                    onChange={onMonthlyAmountNetChange}
                />
            </Grid>
            <Grid item lg={1} md={4} sm={6} xs={12}>
                <TextField
                    label="Rendement"
                    value={percentage}
                    onChange={onPercentageChange}
                />
            </Grid>
            <Grid item lg={1} md={4} sm={6} xs={12}>
                <IconButton
                    color="primary"
                    onClick={toggleIsVisible}
                    size="small"
                >
                    {isVisible ? (
                        <VisibilityIcon className={classes.icon} />
                    ) : (
                        <VisibilityOffIcon className={classes.icon} />
                    )}
                </IconButton>
                <IconButton
                    color="primary"
                    onClick={onDuplicateClick}
                    size="small"
                >
                    <FileCopyIcon className={classes.icon} />
                </IconButton>
                <IconButton
                    color="primary"
                    onClick={onDeleteInvestmentClick}
                    size="small"
                >
                    <ClearIcon className={classes.icon} />
                </IconButton>
            </Grid>
        </Grid>
    );
};

interface DataFormProps {
    investments: Investment[];
    addInvestment: (investment: Investment) => void;
    deleteInvestment: (investment: Investment) => void;
    updateInvestment: (investment: Investment) => void;
    time: number;
    onTimeChange: SliderChangeCallbackType;
}

const DataForm = ({
    investments,
    addInvestment,
    deleteInvestment,
    updateInvestment,
    time,
    onTimeChange,
}: DataFormProps) => {
    const classes = useStyles();

    const onAddInvestmentClick = useCallback(() => {
        addInvestment({
            id: generateId(),
            label: `Investissement ${investments.length + 1}`,
            amount: '',
            amountNet: '',
            monthlyAmount: '',
            monthlyAmountNet: '',
            percentage: '',
            isVisible: true,
        });
    }, [addInvestment, investments.length]);

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
                        max={40}
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
                <InvestmentForm
                    key={investment.id}
                    investment={investment}
                    addInvestment={addInvestment}
                    deleteInvestment={deleteInvestment}
                    updateInvestment={updateInvestment}
                />
            ))}
        </Paper>
    );
};

export default DataForm;
