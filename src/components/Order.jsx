import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { BsArrow90DegUp, BsArrow90DegDown } from 'react-icons/bs';

const Order = ({ data }) => {
    console.log("🚀 ~ file: Order.jsx:18 ~ Order ~ data", data)
    // console.log("🚀 ~ file: Order.jsx:18 ~ Order ~ data1:", data1)
    // const { _id, createdAt, customerId, orderStatus, totalAmount, orderItems, userId } = data;
    // console.log(orderItems)

    const rows = data.map((row) => {
        return {
            id: row._id,
            name: row.userId.name,
            date: row.createdAt,
            amount: row.totalItems,
            paymentIntent: row.paymentIntent.id,
            paymentStatus: row.paymentIntent.status,
            orderStatus: row.orderStatus,
            OrderItems:
                [
                    row.orderItems.map((item) => {
                        return {
                            name: item.productId.name,
                            price: item.productId.price,
                            quantity: item.quantity,
                            image: item.productId.image,
                        }
                    })
                ]
        }
    })

    function Row (props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <BsArrow90DegUp /> : <BsArrow90DegDown />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.paymentIntent}</TableCell>
                    <TableCell>{row.paymentStatus}</TableCell>
                    <TableCell>{row.orderStatus}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Order Items
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Price ($)</TableCell>
                                            <TableCell>Quantity</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.image}
                                                </TableCell>
                                                <TableCell>{historyRow.name}</TableCell>
                                                <TableCell>{historyRow.price}</TableCell>
                                                <TableCell>
                                                    {historyRow.quantity}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Order&nbsp;Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Intent&nbsp;Id</TableCell>
                        <TableCell>Order&nbsp;Status</TableCell>
                        <TableCell>Payment&nbsp;Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
};

export default Order;
