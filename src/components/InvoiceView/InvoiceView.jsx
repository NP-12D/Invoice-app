import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import InvoiceDetail from "./InvoiceDetail";
import SideBar from "../../layout/SideBar";
import { useRecoilState } from "recoil";
import { invoicesState } from "../../utilis/invoicesAtom";

export default function InvoiceView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useRecoilState(invoicesState);

  const invoice = invoices.find((inv) => inv.id === id);

  const handleSaveEdit = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv)),
    );
  };

  const handleDelete = (id) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    navigate("/");
  };

  const handleMarkAsPaid = (id) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "paid" } : inv)),
    );
  };

  if (!invoice) return <p>Invoice not found</p>;

  return (
    <>
      <SideBar />
      <InvoiceDetail
        invoice={invoice}
        onDelete={handleDelete}
        onMarkAsPaid={handleMarkAsPaid}
        onSaveEdit={handleSaveEdit}
       
      />
    </>
  );
}
