import { ArrowRightAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { axiosInstance } from "../../api/AxiosInstance";

const OrderCard = ({ order }) => {
  const isInCart = order.paymentStatus !== "InCart";
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h6" component="h2">
          Order: #{order.id}
        </Typography>
        <Typography variant="body1" component="p">
          Status: {order.paymentStatus}
        </Typography>
        {isInCart && (
          <>
            <Typography variant="body1" component="p">
              Order date:{" "}
              {new Date(order?.shippingDate).toLocaleDateString("vi-VN")}
            </Typography>
            <Typography variant="body1" component="p">
              Total:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order?.totalPay)}
            </Typography>
          </>
        )}
      </Box>

      <Box>
        {isInCart ? (
          <Button
            LinkComponent={RouterLink}
            to={`/orders/${order.id}`}
            color="inherit"
            endIcon={<ArrowRightAlt />}
          >
            View detail
          </Button>
        ) : (
          <Button
            LinkComponent={RouterLink}
            to={`/cart`}
            color="inherit"
            endIcon={<ArrowRightAlt />}
          >
            Go to cart
          </Button>
        )}
      </Box>
    </Paper>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = React.useState(null);

  React.useEffect(() => {
    const fectchOrders = async () => {
      const response = await axiosInstance.get("/orders/owner");
      const { data } = response;
      console.log(data);
      setOrders(data);
    };
    fectchOrders();
  }, []);

  return (
    <>
      <Container sx={{ mt: "5rem" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My orders
        </Typography>

        <Stack spacing={2}>
          {!orders && <Typography variant="body1">Loading...</Typography>}
          {orders && orders.map((x) => <OrderCard key={x.id} order={x} />)}
        </Stack>
      </Container>
    </>
  );
};

export default OrdersPage;
