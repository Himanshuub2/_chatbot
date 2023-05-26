
import Plot from "react-plotly.js";
// import {Chart as ChartJS, layouts} from "chart.js/auto"
// import { Chart } from "react-chartjs-2";




const PieCharts = ({graphObject})=>{
    return(
        <Plot className="mt-28" data ={
            [{
                // title:"Segment Wise Data",
                
                labels:graphObject.data.map(item=>item[0]),
                values:graphObject.data.map(item=>item[1]),
                type:"pie",
              
            }]
           
            
    
        }
        layout={{
            paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
       
          showlegend: true,
          // legend: {"orientation": "h"},
         
          margin:{
            t:50,
             
           
            
          },
          

        
    
          font: {
            family: "Open Sans, verdana, arial, sans-serif",
            size:12,
            color: '#DBD8D8'
          },

          // title:{
            
          //   text:"Segment Wise Data",
          //   position:"bottom"
          // }
        }}

        config={{
         
            responsive: true,
            displayModeBar: true,
          displaylogo:false,

            

          }
      
          }



        />

       
    )
}

export default PieCharts;