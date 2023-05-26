import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tables from "../Charts/Tables";
import BarChart from "../Charts/BarChart";
import PieCharts from "../Charts/PieCharts";
import "../../../src/index";
import { useState } from "react";
import SideDrawer from "./SideDrawer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
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

export default function CustomTabs({ graphObject }) {
  const [chart, setChart] = useState("table");

  // const [chartArray,setChartArray] = useState(graphObject);

  //setting id to match sidedrawer id with correct btn id

  const [value, setValue] = React.useState(0);

  const ShowAllChart = ({ item }) => {
    switch (chart) {
      case "table":
        return <Tables graphObject={item} />;
      case "bar":
        return <BarChart graphObject={item} />;
      case "pie":
        return <PieCharts graphObject={item} />;
      default:
        return null;
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(graphObject);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: "5px",
          height: "12px",
          position: "absolute",
          zIndex: "200",
        }}
      >
        <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: { backgroundColor: "rgb(23 186 159)", height: "4px" },
            }}
          >
            {graphObject.map((item, idx) => (
              <Tab
                label={"Report - " + (Number(idx) + Number(1))}
                {...a11yProps(0)}
                style={{
                  backgroundColor: "#4B719D",
                  marginLeft: "8px",
                  color: "white",
                }}
                key={idx}
              />
            ))}
          </Tabs>
        </Box>

        {graphObject.map((item, idx) => (
          <TabPanel value={value} index={idx} key={idx}>
            {item.enable_chart && item.columns.length > 1 ? (
              <>
                <ShowAllChart item={item} />
                <SideDrawer
                  setChart={setChart}
                  graphObject={graphObject}
                  index={idx}
                  flag={item.enable_chart}
                />
              </>
            ) : (
              <Tables graphObject={item} />
            )}
          </TabPanel>
        ))}
      </Box>
    </>
  );
}
