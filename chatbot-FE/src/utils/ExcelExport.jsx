


import * as XLSX from "xlsx";


export const excelExport = (data)=>{

    data.data.unshift(data.columns)
    
   
        const worksheet = XLSX.utils.aoa_to_sheet(data.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
     
        XLSX.writeFile(workbook, "DataSheet.xlsx");
 
}   