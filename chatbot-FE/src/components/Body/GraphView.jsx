// import Drawer from "../../utils/Drawer";
import CustomTabs from "../Tab-Drawer/CustomTabs";
import { useSelector } from "react-redux";

const GraphView = () => {
  const finalData = useSelector((state) => state.main.chat);

  const graphObject = finalData[finalData.length - 1].response.charts;

  // const graphObject = finalData.slice(3).filter(item=>item.side==="Assistant" ).map(item=>item.response.charts).flat(1);

  return (
    <div className=" w-[70%] flex flex-row ">
      <div
        className=" flex justify-center align-center w-full bg-darkBlue  w-full mt-4  h-4/5 mr-4  rounded-sm relative"
        style={{
          boxShadow: "0px 0px  30px 8px rgb(0 0 0 / 0.4)",
          overflow: "hidden",
        }}
      >
        {
          graphObject &&
        <CustomTabs graphObject={graphObject} />

        }
      </div>
    </div>
  );
};

export default GraphView;
