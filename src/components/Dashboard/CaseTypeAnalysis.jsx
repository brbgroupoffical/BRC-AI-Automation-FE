import { Activity, BarChart3 } from "lucide-react"
import { memo } from "react"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function CaseTypeAnalysis({
    selectedCaseType,
    setSelectedCaseType,
    casesDaysFilter,
    caseData,
    setCasesDaysFilter, loading
}) {

    const caseSuccessRate =
        caseData?.total > 0 ? ((caseData?.success / caseData?.total) * 100).toFixed(1) : "0.0"

    const casesChartData = [
        { name: "Success", value: caseData?.success, color: "#059669" },
        { name: "Failed", value: caseData?.failed, color: "#f59e0b" },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-3xl font-black text-gray-900">Case Type Analysis</h2>

                <div className="flex items-center space-x-4">
                    {[1, 5, 7].map((day) => (
                        <button
                            key={day}
                            onClick={() => setCasesDaysFilter(day)}
                            className={`px-4 py-2 rounded-xl font-bold text-sm ${casesDaysFilter === day ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {day}D
                        </button>
                    ))}

                    <select
                        value={selectedCaseType}
                        onChange={(e) => setSelectedCaseType(e.target.value)}
                        className="border-2 border-green-300 rounded-xl px-4 py-2 font-bold"
                    >
                        <option value="one_to_one">One to One</option>
                        <option value="one_to_many">One to Many</option>
                        <option value="many_to_many">Many to One</option>

                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 bg-white rounded-3xl shadow-xl border-2 border-green-100 p-8">
                    <div className="flex justify-between mb-6">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Total Count</p>
                            <p className="text-4xl font-black">{caseData?.total}</p>
                        </div>
                        <div className="bg-emerald-600 p-3 h-12 flex items-center rounded-2xl">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between bg-emerald-50 p-4 rounded-xl">
                            <p className="font-bold text-emerald-700">Success</p>
                            <span className="font-black text-emerald-800">{caseData?.success}</span>
                        </div>
                        <div className="flex justify-between bg-amber-50 p-4 rounded-xl">
                            <p className="font-bold text-amber-700">Failed</p>
                            <span className="font-black text-amber-800">{caseData?.failed}</span>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">Success Rate</p>
                        <p className="text-green-600 font-black text-xl">{caseSuccessRate}%</p>
                    </div>
                </div>

                {/* Chart */}
                <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl border-2 border-green-100 p-8">
                    <div className="flex justify-between items-center" >
                        <h3 className="text-xl font-black mb-4 flex items-center">
                            <BarChart3 className="w-6 h-6 text-green-600 mr-2" /> Case Performance
                        </h3>


                        <div className="flex items-center space-x-3">
                            <div className="flex items-center gap-1" >
                                <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                                <span className="text-sm font-bold text-gray-700">Failed</span>
                            </div>
                            <div className="flex items-center gap-1" >
                                <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                                <span className="text-sm font-bold text-gray-700">Success</span>
                            </div>
                        </div>

                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600 border-solid"></div>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={casesChartData} barSize={80}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                                    {casesChartData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(CaseTypeAnalysis)
