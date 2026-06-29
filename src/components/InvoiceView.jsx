import { useParams} from "react-router-dom";
import {useRecoilValue} from "recoil"
import InvoiceDetail  from "./InvoiceDetail";
  import { invoicesState } from "../utilis/invoicesAtom";
import SideBar from "../layout/SideBar";

export default function InvoiceView({ onEdit, onDelete, onMarkPaid }) {
  const { id } = useParams();

  
  const invoices = useRecoilValue(invoicesState);

  const invoice = invoices.find((inv) => inv.id === id);
  if (!invoice) return <p>Invoice not found</p>;

  return (
    <>
    <SideBar/>
    <InvoiceDetail
      invoice={invoice}
      onEdit={() => onEdit(invoice)}
      onDelete={() => onDelete(invoice.id)}
      onMarkPaid={onMarkPaid}
    />
    </>
  );
}
