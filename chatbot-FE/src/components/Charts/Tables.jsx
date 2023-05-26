import Plot from "react-plotly.js";
import { excelExport } from "../../utils/ExcelExport";

const icons = {
  width: "1792",
  height: "1792",
  viewBox: "0 0 1792 1792",
  xmlns: "http://www.w3.org/2000/svg",
  path: "M1344 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zm-325-569q17 41-14 70l-448 448q-18 19-45 19t-45-19l-448-448q-31-29-14-70 17-39 59-39h256v-448q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z",
};

const Tables = ({ graphObject }) => {
  let finalArr = [];
  let values = [];
  for (let i = 0; i < graphObject.data[0].length; i++) {
    let newRow = graphObject.data.map((item) => item[i]);

    finalArr = [...finalArr, newRow];
    let valArr = [graphObject.columns[i]];

    values.push(valArr);
  }

  return (
    <div className="flex flex-column justify-left  w-full absolute top-20 ml-12">
      <Plot
        id="table-div"
        className="top-[40%] "
        data={[
          {
            type: "table",
            columnwidth: [1, 1],
            header: {
              values: values,
              align: ["center", "center"],
              height: 40,
              width: 60,
              line: { width: 1, color: "white" },
              fill: { color: "#0A1E34" },
              font: { family: "Arial", size: 24, color: "white" },
            },
            cells: {
              values: finalArr,
              align: ["center", "center"],
              height: 30,

              line: { color: "white", width: 1 },
              fill: { color: ["#12345a", "#12345a"] },
              font: { family: "Arial", size: 16, color: ["white"] },
            },
          },
        ]}
        layout={{
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",

          showlegend: true,
          // legend: {"orientation": "h"},

          font: {
            family: "Open Sans, verdana, arial, sans-serif",
            size: 12,
            color: "#DBD8D8",
          },

          title: {
            position: "bottom",
          },
        }}
        config={{
          responsive: true,
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToAdd: [
            {
              name: "Export to CSV",
              icon: icons,

              click: () => {
                excelExport(graphObject);
              },
            },
          ],
          modeBarButtonsToRemove: ["toImage", "zoom2d", "zoom3d"],
        }}
      />
    </div>
  );
};

export default Tables;
