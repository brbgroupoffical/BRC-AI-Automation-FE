import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../utils/endpoint";
import { useSelector } from "react-redux";

export function useGrnPayload(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { access } = useSelector((state) => state.user);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    const fetchPayload = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${ENDPOINTS.GRN_PAYLOAD}${id}/invoices/`;
        const response = await axios.get(url, {
          headers: {
            Authorization: access ? `Bearer ${access}` : "",
          },
          signal: controller.signal,
        });

        console.log("Fetched GRN Payload:", response.data);
        setData(response.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPayload();
    return () => controller.abort();
  }, [id, access]);


  const getInvoiceDetail = async (invoiceId) => {
    try {
      if (!invoiceId) throw new Error("Invoice ID is required");
      const url = `${ENDPOINTS.INVOICE_PAYLOAD}${invoiceId}/`;
      const response = await axios.get(url, {
        headers: {
          Authorization: access ? `Bearer ${access}` : "",
        },
      });

      console.log("Fetched Invoice Detail:", response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching invoice detail:", err);
      throw err.response?.data?.message || err.message;
    }
  };

  const handleUpdateInvoice = async (updatedInvoice) => {
    try {
      const url = `${ENDPOINTS.INVOICE_PAYLOAD}${updatedInvoice.id}/update/`;

      const payload = {
        invoice_date: updatedInvoice.invoice_date,
        doc_date: updatedInvoice.doc_date,
        document_lines: updatedInvoice.document_lines.map((line) => ({
          id: line.id,
          line_num: Number(line.line_num),
          remaining_open_quantity: Number(line.remaining_open_quantity),
        })),
      };

      // 1️⃣ Update invoice
      const updateResponse = await axios.patch(url, payload, {
        headers: {
          Authorization: access ? `Bearer ${access}` : "",
          "Content-Type": "application/json",
        },
      });

      console.log("Invoice updated successfully ✅", updateResponse.data);

      // 2️⃣ Then call retry API
      const retryUrl = `${ENDPOINTS.INVOICE_PAYLOAD}${updatedInvoice.id}/retry/`;
      const retryResponse = await axios.post(
        retryUrl,
        {},
        {
          headers: {
            Authorization: access ? `Bearer ${access}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Retry triggered successfully ✅", retryResponse.data);

    } catch (err) {
      console.error("Failed to update or retry invoice:", err);
      alert("Failed to update or retry invoice ❌");
      throw err;
    }
  };


  return { data, loading, error, getInvoiceDetail, handleUpdateInvoice };
}
