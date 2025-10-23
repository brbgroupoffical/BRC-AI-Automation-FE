import React, { useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, RotateCcw } from "lucide-react";
import { useGrnPayload } from "../hooks/useGrnPayload";
import InvoiceDetailModal from "../components/others/InvoiceDetailModal";


const StatusBadge = ({ status }) => {
  if (!status) return <span>-</span>;

  const color =
    status === "posted"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};


const InvoiceRow = ({ invoice, index, onViewClick }) => (
  <tr className="border-b hover:bg-gray-50 transition">
    <td className="px-6 py-3 text-gray-800">{index + 1}</td>
    <td className="px-6 py-3 text-gray-800">{invoice.id}</td>
    <td className="px-6 py-3 text-gray-800">{invoice.card_code || "-"}</td>
    <td className="px-6 py-3 text-gray-800">{invoice.doc_entry || "-"}</td>
    <td className="px-6 py-3 text-gray-800">
      <StatusBadge status={invoice.posting_status} />
    </td>

    <td className="px-6 py-3 text-gray-800">
      <div className="flex gap-3">
          <button
            title="View"
            onClick={() => onViewClick(invoice.id, invoice.posting_status)}
            className="p-2 rounded-md bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition"
          >
            <Eye className="w-4 h-4" />
          </button>
  
      </div>
    </td>
  </tr>
);

const GrnPayloadPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: payload, loading, error, getInvoiceDetail, handleUpdateInvoice } = useGrnPayload(id);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState(null);

  const invoices = useMemo(() => payload?.invoices || [], [payload]);

  const handleViewClick = useCallback(
    async (invoiceId, status) => {
      try {
        const detail = await getInvoiceDetail(invoiceId);
        setSelectedInvoice(detail);
        setStatus(status);
        setModalOpen(true);
      } catch (err) {
        console.error("Failed to fetch invoice detail:", err);
        
      }
    },
    [getInvoiceDetail]
  );

  return (
    <section className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            GRN Payload Details
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto bg-white shadow-sm rounded-xl border border-gray-200 p-6">
        {loading && <p className="text-gray-500">Loading GRN payload...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && invoices.length > 0 ? (
          <>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Invoices ({invoices.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    {["#", "Invoice ID", "Card Code", "Doc Entry", "Status", "Actions"].map(
                      (heading) => (
                        <th
                          key={heading}
                          className="px-6 py-3 text-left font-medium text-gray-600"
                        >
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <InvoiceRow
                      key={invoice.id || index}
                      invoice={invoice}
                      index={index}
                      onViewClick={handleViewClick}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          !loading &&
          !error && (
            <p className="text-gray-500 text-sm">
              No invoices found for this automation.
            </p>
          )
        )}
      </main>

      <InvoiceDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        invoice={selectedInvoice}
        onSave={handleUpdateInvoice}
        status={status}
      />
    </section>
  );
};

export default GrnPayloadPage;
