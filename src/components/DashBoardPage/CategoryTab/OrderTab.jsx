import {
  Box,
  Chip,
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
import { axiosInstance } from "../../../api/AxiosInstance";
import { ChildCare } from "@mui/icons-material";

const OrderTab = () => {
  const [orders, setOrders] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders/");
      const { data } = response;
      setOrders(data);
      console.log(data);
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
              <TableCell>#</TableCell>
              <TableCell align="right">Order at</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>

                <TableCell align="right">{row.created}</TableCell>
                <TableCell align="right">
                  {<Chip label={row.paymentStatus} color="primary" size="small" variant="outlined" />}
                </TableCell>

                <TableCell align="right">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(row.totalPay)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTab;
