import BarChartIcon from "@mui/icons-material/BarChart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import {
  barGraphImage,
  tableGraphImage,
} from "../../assets/imageLinks/graphImages";
import pie from "../../assets/pie.png";

const SideDrawer = ({ setChart, flag }) => {
  const sampleObj = [
    {
      flag: "true",
      graphType: "Table",
      key: "table",
      image: tableGraphImage,
    },
    {
      flag: flag,
      graphType: "Bar Chart",
      key: "bar",
      image: barGraphImage,
    },
    {
      flag: flag,
      graphType: "Pie Chart",
      key: "pie",
      image: pie,
    },
  ];

  const [sideDrawer, setSideDrawer] = useState(false);
  const [buttonIcon, setButtonIcon] = useState(false);

  const handleDrawer = () => {
    setSideDrawer(!sideDrawer);
    setButtonIcon(!buttonIcon);
  };

  const handleChart = (val) => {
    setChart(val);
  };

  return (
    <div className="flex flex-row  justify-center top-[25%] mt-48 fixed  right-2 mr-[-10px] ">
      <button
        className="bg-cyanBlue border-cyanBlue  rounded-full w-8 h-8 "
        onClick={handleDrawer}
      >
        {buttonIcon ? (
          <ChevronRightIcon style={{ color: "white" }} />
        ) : (
          <BarChartIcon style={{ color: "white" }} />
        )}
      </button>

      <div
        id="side-drawer"
        className="w-32 h-content border border-fontGray rounded-sm bg-lighterBlue  overflow-scroll mt-[-135px] mb-[-90px] pb-[23px] scrollbar-thin scrollbar-track-lightBlue "
        style={{
          width: sideDrawer ? "8rem" : 0,
          marginLeft: sideDrawer ? "-15px" : "",
          transition: "width 0.3s ease-in",
        }}
        onMouseLeave={handleDrawer}
      >
        {
          // ----> CSS for below applied in index.css <-----//
          sideDrawer &&
            sampleObj.map((item, idx) =>
              item.flag ? (
                <div
                  id="side-div"
                  className="mt-5 w-30 h-content flex justify-center items-center   "
                  key={idx}
                  onClick={(e) => handleChart(item.key)}
                >
                  <img
                    className="customCSS"
                    src={item.image}
                    style={{
                      width: sideDrawer ? "100px" : "0",
                      transition: "width 0.4s ease-in",
                    }}
                    alt="graph"
                  />
                  <div className="text" style={{ overFlow: "hidden" }}>
                    {item.graphType}{" "}
                  </div>
                </div>
              ) : (
                <div
                  id="side-div"
                  className="mt-5 w-36 h-content flex justify-center items-center mt-5 "
                  key={idx}
                >
                  <img
                    className="customCSS"
                    src={item.image}
                    style={{
                      width: sideDrawer ? "110px" : "0",
                      opacity: "0.1",
                      transition: "width 0.4s ease-in",
                    }}
                    alt="graph"
                  />
                  <div className="text">Not Available </div>
                </div>
              )
            )
        }
      </div>
    </div>
  );
};

export default SideDrawer;
