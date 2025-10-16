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

  return { data, loading, error };
}
