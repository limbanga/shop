import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Introduce"
            {...a11yProps(0)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            label="Details"
            {...a11yProps(1)}
            sx={{ textTransform: "none" }}
          />
          <Tab
            label="Preserve"
            {...a11yProps(2)}
            sx={{ textTransform: "none" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Typography variant="h5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          voluptatem illo optio cupiditate veniam autem nam necessitatibus, sit
          voluptatibus delectus? Dolores, assumenda et? Consequuntur, quae
          temporibus, suscipit velit deleniti quis repudiandae esse aliquam
          quibusdam eos odit tempora ipsum repellendus ea veniam cum sequi
          quisquam et? Nam numquam nihil quaerat voluptatibus?
        </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography variant="h5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor Lorem
          ipsum dolor sit amet consectetur, adipisicing elit. Nihil fugit amet
          quisquam animi tempora error.
        </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Typography variant="h5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Enim et sunt non
          iure vel officia at sed fugiat maxime velit.
        </Typography>
      </CustomTabPanel>
    </Box>
  );
}
