import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Resume from '../pages/Resume';

const DownloadPDF = () => {
  const contentRef = useRef(null);

  // useEffect(() => {
  //   downloadPdf(); // Trigger downloadPdf function when component mounts
  // }, []); 
 
  const downloadPdf = () => {
    const input = contentRef.current;
  
    html2canvas(input, {
      scale: 2, // Increase scale to improve image quality and reduce image size
      logging: false, // Disable logging for better performance
    }).then((canvas) => {
      const pdf = new jsPDF({
        unit: 'px', // Use pixels as units for PDF dimensions
        format: 'a4', // Set PDF page format to A4
      });
  
      const imgData = canvas.toDataURL('image/jpeg', 0.8); // Convert canvas to JPEG with 80% quality
      const imgWidth = pdf.internal.pageSize.getWidth(); // Use full page width
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
  
      pdf.save('myportfolio.pdf');
    });
  };

  return (
    <div>
      <div ref={contentRef}>
        <Resume/>
        {/* <h1>Content to be converted to PDF</h1>
        <p>You can add any content here that you want to convert into PDF.</p> */}
      </div>
      <button onClick={downloadPdf}>Download PDF</button>
    </div>
  );
};

export default DownloadPDF;
