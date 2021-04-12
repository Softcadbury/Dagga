import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { Investment, InvestmentData } from '../types/investment';

const useStyles = makeStyles((theme) => {
    return {
        table: {
            maxWidth: '1500px',
            margin: 'auto',
            marginTop: theme.spacing(3),
        },
        headCell: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
    };
});

interface BodyProps {
    computedInvestments: InvestmentData[];
    cumulatedAmountsWithInterest: number[];
    time: number;
}

const Body = ({
    computedInvestments,
    cumulatedAmountsWithInterest,
    time,
}: BodyProps) => {
    const rows = [];

    for (let i = 0; i <= time; i++) {
        rows.push(
            <TableRow key={i}>
                <TableCell component="th" scope="row">
                    {i}
                </TableCell>
                <TableCell component="th" scope="row">
                    {cumulatedAmountsWithInterest[i]}
                </TableCell>
                {computedInvestments.length > 1 &&
                    computedInvestments.map((computedInvestment, index) => {
                        return (
                            <TableCell key={index}>
                                {
                                    computedInvestment
                                        .cumulatedAmountsWithInterest[i]
                                }
                            </TableCell>
                        );
                    })}
            </TableRow>
        );
    }

    return <TableBody>{rows}</TableBody>;
};

interface HeaderProps {
    investments: Investment[];
}

const Header = ({ investments }: HeaderProps) => {
    const classes = useStyles();

    return (
        <TableHead>
            <TableRow>
                <TableCell className={classes.headCell}>Période</TableCell>
                <TableCell className={classes.headCell}>Cumul</TableCell>
                {investments.length > 1 &&
                    investments.map((investment, index) => {
                        return (
                            <TableCell key={index} className={classes.headCell}>
                                {investment.label}
                            </TableCell>
                        );
                    })}
            </TableRow>
        </TableHead>
    );
};

interface DataTableProps {
    investments: Investment[];
    computedInvestments: InvestmentData[];
    cumulatedAmountsWithInterest: number[];
    time: number;
}

const DataTable = ({
    investments,
    computedInvestments,
    cumulatedAmountsWithInterest,
    time,
}: DataTableProps) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table size="small">
                <Header investments={investments} />
                <Body
                    computedInvestments={computedInvestments}
                    cumulatedAmountsWithInterest={cumulatedAmountsWithInterest}
                    time={time}
                />
            </Table>
        </TableContainer>
    );
};

export default DataTable;
