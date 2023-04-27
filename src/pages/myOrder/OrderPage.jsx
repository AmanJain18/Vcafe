import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
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
import { authApi } from "../../utils/api";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { ContentWrapper } from "../../components";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await authApi.get('/my-orders');
                if (res) {
                    setOrders((res.data.orders));
                    // console.log(JSON.stringify(res.data.orders))
                }
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.error);
                    // console.log(error.response.data.error);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log(error.message);
                }
            }
        }
        fetchOrders();
    }, []);

    const rows = orders.map((row) => {
        return {
            id: row._id,
            name: row.userId.name,
            date: row.createdAt,
            amount: row.totalAmount,
            paymentIntent: row.paymentIntent[0].id,
            paymentStatus: row.paymentIntent[0].status,
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
        const [open, setOpen] = useState(false);
        const date = new Date(row.date);
        row.date = format(date, 'MMMM, dd yyyy');
        const statusClass = row.paymentStatus === "paid" ? "bg-green-400" : "bg-red-300";
        const statusClassOrder = row.orderStatus === "Order Placed" ? "bg-green-400" : row.orderStatus === "Cooking" ? "bg-yellow-400" : row.orderStatus === "Cancelled" ? "bg-red-300" : "bg-orange-500";
        return (
            <React.Fragment>
                <TableRow key={row.id} >
                    <TableCell component="th" >
                        {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell align="center">
                        <Typography className="rounded-md bg-blue-300 px-2 py-1" variant="body3">
                            {row.paymentIntent}
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography sx={{ width: 300 }} className={`${statusClass} px-2 py-1 rounded-md capitalize`} variant="body3">
                            {row.paymentStatus === 'paid' ? 'paid' : 'failed'}
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography sx={{ width: 300 }} className={`${statusClassOrder} px-2 py-1 rounded-md capitalize`} variant="body3">
                            {row.orderStatus}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(prev => !prev)}
                        >
                            {open ? <BsArrow90DegUp /> : <BsArrow90DegDown />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" component="div" marginBottom={1}>
                                    Order Items
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >Image</TableCell>
                                                <TableCell align="center">Name</TableCell>
                                                <TableCell align="center">Price&nbsp;(₹)</TableCell>
                                                <TableCell align="center">Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.OrderItems[0].map((historyRow) => (
                                                <TableRow key={historyRow.name}>
                                                    <TableCell >
                                                        <Avatar alt={historyRow.name} src={historyRow.image} sx={{ width: 45, height: 45 }} />
                                                    </TableCell>
                                                    <TableCell align="center">{historyRow.name}</TableCell>
                                                    <TableCell align="center">{historyRow.price}</TableCell>
                                                    <TableCell align="center">
                                                        {historyRow.quantity}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }


    return (
        <ContentWrapper className={"mt-10 mx-auto container"}>
            <h1 className="text-2xl font-semibold mb-5 text-center">My Orders</h1>
            {orders.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table" >
                        <TableHead >
                            <TableRow>
                                <TableCell>Order&nbsp;Id</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Amount&nbsp;(₹)</TableCell>
                                <TableCell align="center">Intent&nbsp;Id</TableCell>
                                <TableCell align="center">Payment&nbsp;Status</TableCell>
                                <TableCell align="center">Order&nbsp;Status</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <Row key={index} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <p>No orders found.</p>
            )}
        </ContentWrapper>
    );
};

export default OrderPage;
