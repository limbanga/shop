import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../api/AxiosInstance";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = React.useState(null);
  const [orderItems, setOrderItems] = React.useState([]);

  React.useEffect(() => {
    const fetchOrder = async () => {
      const response = await axiosInstance.get(`/orders/${id}`);
      const { data } = response;
      console.log(data);
      setOrder(data);
    };

    id && fetchOrder();
  }, [id]);

  React.useEffect(() => {
    const fetchOrderItems = async () => {
      const response = await axiosInstance.get(`/orders/items/${id}`);
      const { data } = response;
      console.log(data);
      setOrderItems(data);
    };

    id && fetchOrderItems();
  }, [order]);

  return (
    <>
      <Container sx={{ mt: "5rem" }}>
        <Typography variant="h2" gutterBottom>
          Thank you for believing in us!
        </Typography>

        <Stack sx={{ mt: 2 }}>
          <Typography variant="body1">
            We have sent you an email with the order details. If you have any
            questions, please contact us via ours
            <Link href="mailto:thliem143@gmail.com">
              {" "}
              email: thliem143@gmail.com{" "}
            </Link>{" "}
            or phone number: 0-123-456-789.
          </Typography>
          <Typography variant="h6">Order Id: {id}</Typography>

          <Typography variant="h6">
            Total (include VAT):{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(order?.totalPay)}
          </Typography>
          <Typography variant="h6">
            Order time: {" "}
            {new Date(order?.shippingDate).toLocaleDateString("vi-VN")}
          </Typography>

          <Typography variant="h6">
            Arrive date:{" "}
            {new Date(order?.arriveDate).toLocaleDateString("vi-VN")}
          </Typography>

          <Typography variant="caption" gutterBottom>
            We will ship the products to you as soon as possible.
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {orderItems.map((x) => (
            <Grid key={x.id} item xs={12} md={6}>
              <Paper
                variant="outlined"
                elevation={0}
                sx={{ display: "flex", p: 1 }}
              >
                {/* img */}
                <Box
                  component={"img"}
                  src={x.size.variant.image}
                  alt="image of product"
                  sx={{ width: "100px", height: "100px" }}
                />
                {/* Info */}
                <Box flexGrow={1}>
                  <Typography variant="body1">
                    {x.size.variant.product.name}
                  </Typography>
                  <Typography variant="body2">
                    Size {x.size.productSize}
                  </Typography>
                  <Typography variant="body1">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(x.size.price)}{" "}
                    x {x.quantity}
                  </Typography>
                  <Typography variant="body1">
                    Total:{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(x.total)}
                  </Typography>
                </Box>
              </Paper>
              <Divider />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default OrderDetailPage;
