import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { Investment, InvestmentData } from '../types/investment';

const useStyles = makeStyles(() => {
    return {
        table: {
            maxWidth: '1500px',
            width: 'fit-content',
            margin: 'auto',
        },
    };
});

interface BodyProps {
    computedInvestments: InvestmentData[];
    cumulatedAmounts: number[];
    cumulatedAmountsWithInterest: number[];
    time: number;
}

const Body = ({
    computedInvestments,
    cumulatedAmounts,
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
                <TableCell component="th" scope="row">
                    {cumulatedAmounts[i]}
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
    return (
        <TableHead>
            <TableRow>
                <TableCell>Année</TableCell>
                <TableCell>Cumul NET avec intérêts</TableCell>
                <TableCell>Cumul</TableCell>
                {investments.length > 1 &&
                    investments.map((investment, index) => {
                        return (
                            <TableCell key={index}>
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
    cumulatedAmounts: number[];
    cumulatedAmountsWithInterest: number[];
    time: number;
}

const DataTable = ({
    investments,
    computedInvestments,
    cumulatedAmounts,
    cumulatedAmountsWithInterest,
    time,
}: DataTableProps) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.table}>
            <Table size="small">
                <Header investments={investments} />
                <Body
                    computedInvestments={computedInvestments}
                    cumulatedAmounts={cumulatedAmounts}
                    cumulatedAmountsWithInterest={cumulatedAmountsWithInterest}
                    time={time}
                />
            </Table>
        </TableContainer>
    );
};

export default DataTable;
