
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useState } from "react";


const ReportPdf = (props,keyvaluebtn) => {
//  const [pdfDatas,setPdfData]=useState(props.sort((a,b) => a.Option - b.Option))

console.log("This is document");
// console.log(pdfDatas)
const optionValueFunction=(value)=>{
  if(value==1){
    return "No"
  }else if(value=="2"){
    return "Late"
  }else if(value=="3"){
    return "Yes"
  }else if(value=="4"){
    return "Yes"
  }
   }
  const doc = new jsPDF(
    {
      orientation: 'l', // landscape
    }
  );
  var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
  
  // define the columns we want and their titles
  const tableColumn = ["Class", "Subject", "Teacher", "Room","Lecture", "Day", "Date", "Option", "Comment"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  props.forEach(obj => {
    const pdfData = [
      obj.Classess,
      obj.Subjects,
      obj.Teacher,
      obj.Room,
      obj.Lecture,
      obj.Day,
      obj.Date,
      optionValueFunction(obj.Option),
      obj.Comment,
    
    ]
    // push each tickcet's info into a row
    tableRows.push(pdfData);
  });
  var img = new Image()
img.src = '../assets/images/logopng1231.png'
doc.addImage(img, 'png', 15, 13, 17, 17)
doc.text(10,10,"").setFont(undefined, 'bold');
  doc.text(33, 20, 'Comsats University Islamabad').setFont(undefined, 'normal');
  doc.text(33, 27, 'Sahiwal Campus').setFontSize(14).setFont(undefined, 'normal');
  const d=new Date();
 const todaydate= d.getDay()+"/"+d.getMonth()+"/"+d.getFullYear();
 var today = new Date();
 var dd = String(today.getDate()).padStart(2, '0');
 var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
 var yyyy = today.getFullYear();
 
 today = dd  + '/' + mm+ '/' + yyyy;

  doc.text(pageWidth-70, 20, `Date ${today}`).setFontSize(14).setFont(undefined, 'normal').setFont(undefined, 'bold');
  // doc.text(170, 27, today).setFont(undefined, 'bold');

  doc.text('Lectures Monnitering Report ', pageWidth / 2, pageHeight  -170 , {align: 'center'}).setFont(undefined, 'normal').setFontSize(12);
  // doc.text(70, 30, 'Monitering Timetable Report');

  doc.autoTable( tableColumn, tableRows,  { startY: 50, setFontSize:5 },).setFontSize(12);
  const pageCount = doc.internal.getNumberOfPages();
 
  // For each page, print the page number and the total pages
  for(var i = 1; i <= pageCount; i++) {
       // Go to page i
      doc.setPage(i);
       //Print Page 1 of 4 for example
      doc.text('Page ' + String(i) + ' of ' + String(pageCount),pageWidth-20, pageHeight  -8,"right");
  }
   
  if(keyvaluebtn==="openpdf"){
    window.open(doc.output('bloburl'))
  }else if(keyvaluebtn==="pdfsave"){
    doc.save("report.pdf");
  }

  // 

};


export default ReportPdf