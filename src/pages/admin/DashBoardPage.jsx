import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import { Add } from "@mui/icons-material";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { axiosInstance } from "../../api/AxiosInstance";
import { enqueueSnackbar } from "notistack";
import AntTab from "../../components/base/AntTab";
import AntTabs from "../../components/base/AntTabs";
import ProductTable from "../../components/DashBoardPage/ProductTable";

const HeaderSection = () => {
  return <Typography variant="h4">Dashboard</Typography>;
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return <Box sx={{ p: 3 }}>{value === index && <Box>{children}</Box>}</Box>;
};

export const DashBoardPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products/");
      const { data } = response;
      setProducts(data);
    } catch (error) {
      alert("Error fetching products");
      console.error(error);
    }
  };

  const createNewProduct = async () => {
    const product = {
      name: "Change this to product name.",
      code: "Product code",
      category: {
        id: 1,
      },
    };
    const response = await axiosInstance.post("/products/", product);
    const { data } = response;
    console.log(data);
    const { id } = data;
    navigate(`/admin/product/${id}`);
    enqueueSnackbar(<Typography>Product created successfully</Typography>, {
      variant: "success",
    });
  };

  useEffect(() => {
    // fetchProducts();
  }, []);

  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container sx={{ mt: "5rem" }}>
      <HeaderSection />
      <Box sx={{ bgcolor: "#fff" }}>
        <AntTabs
          value={tabIndex}
          onChange={handleChangeTab}
          aria-label="ant example"
        >
          <AntTab label="Order" />
          <AntTab label="Products" />
          <AntTab label="Categories" />
          <AntTab label="User" />
        </AntTabs>
      </Box>
      <TabPanel index={0} value={tabIndex}>
        Order
      </TabPanel>
      <TabPanel index={1} value={tabIndex}>
        <ProductTable />
      </TabPanel>
    </Container>
  );
};
