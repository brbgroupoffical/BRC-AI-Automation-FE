import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useGrnPayload } from "../hooks/useGrnPayload";

const GrnPayloadPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: payload, loading, error } = useGrnPayload(id);

    const invoices = payload?.invoices || [];

    return (
        <section className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
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
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-xl border border-gray-200 p-6">
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
                                        <th className="px-6 py-3 text-left font-medium text-gray-600">
                                            #
                                        </th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-600">
                                            Invoice ID
                                        </th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-600">
                                            Card Code
                                        </th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-600">
                                            Doc Entry
                                        </th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-600">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {invoices.map((inv, index) => (
                                        <tr
                                            key={inv.id || index}
                                            className="border-b hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-3 text-gray-800">{index + 1}</td>
                                            <td className="px-6 py-3 text-gray-800">{inv.id}</td>
                                            <td className="px-6 py-3 text-gray-800">
                                                {inv.card_code || "-"}
                                            </td>
                                            <td className="px-6 py-3 text-gray-800">
                                                {inv.doc_entry || "-"}
                                            </td>
                                            <td className="px-6 py-3 text-gray-800">
                                                {inv.posting_status ? (
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${inv.posting_status === "posted"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                    >
                                                        {inv.posting_status.slice(0, 1).toUpperCase() + inv.posting_status.slice(1)}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-3 text-gray-800">
                                                <div className="flex gap-2 w-full">
                                                    <button
                                                        className="w-full bg-green-100 text-green-700 border border-green-300 py-2 rounded-md hover:bg-green-200 transition font-medium"
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        className="w-full bg-blue-100 text-blue-700 border border-blue-300 py-2 rounded-md hover:bg-blue-200 transition font-medium"
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="w-full bg-red-100 text-red-700 border border-red-300 py-2 rounded-md hover:bg-red-200 transition font-medium"
                                                    >
                                                        Retry
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
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
            </div>
        </section>
    );
};

export default GrnPayloadPage;
