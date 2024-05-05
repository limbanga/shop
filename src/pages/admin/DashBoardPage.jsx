import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";

import AntTab from "../../components/base/AntTab";
import AntTabs from "../../components/base/AntTabs";
import ProductTab from "../../components/DashBoardPage/ProductTab";
import CategoryTab from "../../components/DashBoardPage/CategoryTab";

const HeaderSection = () => {
  return <Typography variant="h4">Dashboard</Typography>;
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return <Box >{value === index && <Box>{children}</Box>}</Box>;
};

export const DashBoardPage = () => {
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
        <ProductTab />
      </TabPanel>
      <TabPanel index={2} value={tabIndex}>
        <CategoryTab />
      </TabPanel>
      <TabPanel index={3} value={tabIndex}>
        User
      </TabPanel>
    </Container>
  );
};
