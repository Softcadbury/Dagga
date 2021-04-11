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

const useStyles = makeStyles((theme) => {
    return {
        table: {
            maxWidth: '1500px',
            margin: 'auto',
            paddingTop: theme.spacing(3),
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
                    computedInvestments.map((computedInvestment) => {
                        return (
                            <TableCell>
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
                <TableCell>Cumul</TableCell>
                {investments.length > 1 &&
                    investments.map((investment) => {
                        return <TableCell>{investment.label}</TableCell>;
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

    if (investments.length === 0) {
        return <></>;
    }

    return (
        <TableContainer className={classes.table}>
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
