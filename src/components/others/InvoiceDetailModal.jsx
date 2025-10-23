import React, { useEffect, useState, useCallback, useMemo } from "react";
import { X, Edit3, Check, XCircle } from "lucide-react";


const ModalWrapper = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden animate-fadeIn relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="max-h-[80vh] overflow-y-auto">{children}</div>
    </div>
  </div>
);

const EditableField = ({ label, value, editable, onChange }) => (
  <div className="flex justify-between text-sm items-center">
    <span className="font-medium text-gray-600">{label}</span>
    {editable ? (
      <input
        type="datetime-local"
        className="border border-gray-300 rounded-md px-2 py-1 text-gray-800 text-sm w-48"
        value={
          value ? new Date(value).toISOString().slice(0, 16) : ""
        }
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <span className="text-gray-800">
        {value
          ? new Date(value).toLocaleString()
          : "-"}
      </span>
    )}
  </div>
);

const LineItemRow = ({ line, index, editable, onLineChange }) => (
  <tr className="border-t">
    <td className="px-12 py-2">{line.id}</td>
    <td className="px-12 py-2">
      {editable ? (
        <input
          type="number"
          className="border border-gray-300 rounded-md px-2 py-1 text-sm w-20"
          value={line.line_num || ""}
          onChange={(e) =>
            onLineChange(index, "line_num", Number(e.target.value))
          }
        />
      ) : (
        line.line_num
      )}
    </td>

    <td className="px-12 py-2">
      {editable ? (
        <input
          type="number"
          className="border border-gray-300 rounded-md px-2 py-1 text-sm w-24"
          value={line.remaining_open_quantity || ""}
          onChange={(e) =>
            onLineChange(index, "remaining_open_quantity", e.target.value)
          }
        />
      ) : (
        line.remaining_open_quantity
      )}
    </td>
  </tr>
);

const InvoiceDetailModal = ({ isOpen, onClose, invoice, onSave, status }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableInvoice, setEditableInvoice] = useState(null);

  // Clone invoice when opened
  useEffect(() => {
    if (invoice) {
      setEditableInvoice(
        JSON.parse(JSON.stringify(invoice.invoice))
      );
    }
  }, [invoice]);

  const handleInputChange = useCallback((field, value) => {
    setEditableInvoice((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleLineChange = useCallback((index, field, value) => {
    const updated = [...editableInvoice.document_lines];
    updated[index][field] = value;
    setEditableInvoice((prev) => ({
      ...prev,
      document_lines: updated,
    }));
  }, [editableInvoice]);

  const handleSave = useCallback(() => {
    try {
      const updated = { ...editableInvoice };
      if (updated.invoice_date) {
        updated.invoice_date = new Date(updated.invoice_date)
          .toISOString()
          .split("T")[0];
      }
      onSave?.(updated);
      setIsEditing(false);
    } catch (error) {
      console.log(error)
    }
  }, [editableInvoice, onSave]);

  const topFields = useMemo(
    () => [
      { label: "Card Code", key: "card_code" },
      { label: "Doc Entry", key: "doc_entry" },
      { label: "Doc Date", key: "doc_date" },
      { label: "Invoice Date", key: "invoice_date" },
      { label: "Created At", key: "created_at" },
    ],
    []
  );

  if (!isOpen) return null;

  if (!invoice || !editableInvoice) {
    return (
      <ModalWrapper onClose={onClose}>
        <div className="w-full max-w-sm mx-auto text-center p-6">
          <p className="text-gray-600 text-sm">
            Loading invoice details...
          </p>
        </div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper onClose={onClose}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Invoice Details
        </h2>
      </div>

      {/* Top Fields */}
      <div className="p-6 grid grid-cols-2 gap-4">
        {topFields.map((f) => (
          <EditableField
            key={f.key}
            label={f.label}
            value={editableInvoice[f.key]}
            editable={isEditing && f.key === "invoice_date"}
            onChange={(val) => handleInputChange(f.key, val)}
          />
        ))}
      </div>

      {/* Line Items */}
      {Array.isArray(editableInvoice.document_lines) &&
        editableInvoice.document_lines.length > 0 ? (
        <div className="px-6 pb-6">
          <h3 className="text-base font-semibold text-gray-700 mb-3">
            Line Items
          </h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-medium">
                <tr>
                  <th className="px-12 py-2">ID</th>
                  <th className="px-12 py-2">Line #</th>
                  <th className="px-12 py-2">Remaining Quantity</th>
                </tr>
              </thead>
              <tbody>
                {editableInvoice.document_lines.map((line, i) => (
                  <LineItemRow
                    key={i}
                    line={line}
                    index={i}
                    editable={isEditing}
                    onLineChange={handleLineChange}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="px-6 pb-6 text-gray-500 text-sm">
          No line items found.
        </p>
      )}

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition text-sm font-medium"
            >
              <Check className="w-4 h-4" /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm font-medium"
            >
              <XCircle className="w-4 h-4" /> Cancel
            </button>
          </>
        ) : (
          status !== "posted" && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition text-sm font-medium"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
          )
        )}

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm font-medium"
        >
          Close
        </button>
      </div>
    </ModalWrapper>
  );
};

export default InvoiceDetailModal;
