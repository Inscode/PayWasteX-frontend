// src/routes/ReportRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import NonPayersReport from "../pages/reports/NonPayersReport"; 
import PayersReport from "../pages/Reports/Payers";
import PerformanceSummery from "../pages/Reports/PerformanceSummery";
import CollectionSummery from "../pages/Reports/CollectionSummery";
import OutstandingBalance from "../pages/Reports/OutstandingBalance";
import ReceiptPreview from "../pages/Reports/ReceiptPreview";
import PayersReportDownload from "../pages/Reports/PayersReportDownload";
// import NonPayersReportDownload from "../pages/Reports/NonPayersReportDownload";


const ReportRoutes = () => {
  return (
    <Routes>
      <Route path="non-payers" element={<NonPayersReport />} />
      <Route path="payers" element={<PayersReport />} />
      <Route path="performance-summery" element={PerformanceSummery} />
      <Route path="collection-summery" element={CollectionSummery} />
      <Route path="outstanding-balance" element={OutstandingBalance} />
      <Route path="receipt-preview" element={<ReceiptPreview />} />
      <Route path="payers/download-payers-report" element={<PayersReportDownload />} />
    {/* <Route path="/non-payers/download-non-payers-report" element={<NonPayersReportDownload />} /> */}
      {/* Add more report routes here if needed */}
    </Routes>
  );
};

export default ReportRoutes;
