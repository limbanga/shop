import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/AxiosInstance";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

function Row(props) {
  const { row: order } = props;
  const [open, setOpen] = React.useState(false);
  const [orderdetails, setOrderDetails] = useState(null);
  const getPaymentStatusColor = () => {
    const status = order.paymentStatus;
    switch (status) {
      case "PAID":
        return "success";
      case "UNPAID":
        return "error";
      case "InCart":
        return "info";
      case "PENDING":
        return "warning";
      default:
        return "default";
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await axiosInstance.get(`/orders/items/${order.id}`);
      const { data } = response;
      setOrderDetails(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchOrderDetails();
    }
    fetchOrderDetails();
  }, []);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {order.id}
        </TableCell>

        <TableCell align="right">
          {order.arriveDate ? order.arriveDate : <Typography>-</Typography>}
        </TableCell>
        <TableCell align="right">
          {
            <Chip
              label={order.paymentStatus}
              size="small"
              color={getPaymentStatusColor()}
            />
          }
        </TableCell>
        <TableCell align="right">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(order.totalPay)}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderdetails &&
                    orderdetails.map((orderdetail) => (
                      <TableRow key={orderdetail.id}>
                        <TableCell component="th" scope="row">
                          {orderdetail.size.variant.product.name +
                            " - size " +
                            orderdetail.size.productSize}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(orderdetail.size.price)}
                        </TableCell>
                        <TableCell align="right">
                          {orderdetail.quantity}
                        </TableCell>
                        <TableCell align="right">
                          {orderdetail.total ? (
                            new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(orderdetail.total)
                          ) : (
                            <Chip
                              label="Not pay"
                              size="small"
                              color="warning"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const OrderTab = () => {
  const [orders, setOrders] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders/");
      const { data } = response;
      const cleaned = data.filter((order) => order.paymentStatus !== "InCart");
      setOrders(cleaned);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box>
      {!orders && <Typography>No order found</Typography>}
      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>#</TableCell>
              <TableCell align="right">Order at</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.map((row) => <Row key={row.id} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTab;
