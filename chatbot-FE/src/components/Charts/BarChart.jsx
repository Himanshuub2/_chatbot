


// import {Chart as ChartJS} from "chart.js/auto"
// import { Chart } from "react-chartjs-2";
import Plot from "react-plotly.js";
import "../../../src/index.css";




const BarChart = ({graphObject,key})=>{
 

 

    return(
      <>

      <div key = {key}className="flex flex-column justify-center relative fixed">

        
                      
        <Plot key = {key} className="plot" style={{top:"-50px"}}
        data={[
          {
            name:"User's Accross Segment",
            type: 'bar',
        
            x:graphObject.data.map(arr=>arr[0]),

            y:graphObject.data.map(arr=>arr[1]),
          
            marker:{
              color:"rgb(138 138 242)",
 

            },
          
            hoverinfo: 'y',
            fill: 'tozeroy',
            
          },
      
        ]}
      
      
        layout={{
         
           
            xaxis:{
            
                
                title:{
                    text:graphObject.columns[0],
                    showgrid:false,
                    font:{
                        family: "Arial",
                        size:16
                    }
                },
                
            

                
            },
            
            yaxis:{
             
                title:{
                    text:graphObject.columns[1],
                    font:{
                        family: "Arial",
                        size:16,

                    },

                },
                showgrid: true,
            

              
               
            },
          
        
          automargin: true,
          
          showlegend: true,
         
          legend: {"orientation": "h",
            x:1,
            y:1.2,
            xanchor:"center",
            size:18
        },
         
          xanchor: 'right',
    
          font: {
            family: "Open Sans, verdana, arial, sans-serif",
            size:11,
            color: '#DBD8D8'
          },
          
          modebar:{
            orientation:"h"
          },
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
        }}
        config={{
          responsive: true,
          displayModeBar: true,
          displaylogo:false,
          modeBarButtonsToRemove:["pan2d","zoomIn2d","zoomOut2d","lasso2d","select2d",]

          
          
        
        }

        
    
        }/>


        

</div>
</>
    )
}

export  default BarChart;



