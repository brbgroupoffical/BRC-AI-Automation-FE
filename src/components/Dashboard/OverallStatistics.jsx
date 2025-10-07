
import React, { memo } from "react"
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    Cell,
} from "recharts"
import {
    Activity,
    CheckCircle,
    XCircle,
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
} from "lucide-react"

 function OverallStatistics({
    data,
    loading,
    error,
    overallDaysFilter,
    setOverallDaysFilter,
}) {
    const successRate =
        data?.total_count > 0
            ? ((data?.total_success / data?.total_count) * 100).toFixed(1)
            : "0.0"

    const overallChartData = [
        { name: "Success", value: data?.total_success ?? 0, color: "#10b981" },
        { name: "Failed", value: data?.total_failed ?? 0, color: "#ef4444" },
    ]

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl border-2 border-gray-700">
                    <p className="font-bold text-sm text-gray-300">
                        {payload[0].payload.name}
                    </p>
                    <p className="text-3xl font-black mt-1">{payload[0].value}</p>
                </div>
            )
        }
        return null
    }

    if (error) {
        return (
            <div className="text-center text-red-600 font-bold">
                Failed to load stats: {error}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-3xl font-black text-gray-900">Overall Statistics</h2>
                <div className="flex items-center space-x-3">
                    {[1, 5, 7].map((day) => (
                        <button
                            key={day}
                            onClick={() => setOverallDaysFilter(day)}
                            className={`px-4 py-2 rounded-xl font-bold text-sm ${overallDaysFilter === day
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {day}D
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 bg-white rounded-3xl shadow-xl border-2 border-emerald-100 p-8">
                    <div className="flex justify-between mb-6">
                        <div>
                            <p className="text-xs font-black text-gray-500 uppercase">
                                Total Count
                            </p>
                            <p className="text-4xl font-black text-gray-900 mt-4">
                                {data?.total_count ?? 0}
                            </p>
                        </div>
                        <div className="bg-emerald-600 h-12 p-3 flex items-center rounded-2xl">
                            <Activity className="w-6 h-full text-white" />
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between bg-emerald-50 p-4 rounded-xl">
                            <div className="flex items-center space-x-4">
                                <div className="bg-emerald-500 p-3 rounded-xl">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-emerald-700 font-bold">Success</p>
                                    <p className="text-2xl font-black text-emerald-800">
                                        {data?.total_success ?? 0}
                                    </p>
                                </div>
                            </div>
                            <ArrowUpRight className="w-6 h-6 text-emerald-600" />
                        </div>

                        <div className="flex justify-between bg-red-50 p-4 rounded-xl">
                            <div className="flex items-center space-x-4">
                                <div className="bg-red-500 p-3 rounded-xl">
                                    <XCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-red-700 font-bold">Failed</p>
                                    <p className="text-3xl font-black text-red-800">
                                        {data?.total_failed ?? 0}
                                    </p>
                                </div>
                            </div>
                            <ArrowDownRight className="w-6 h-6 text-red-600" />
                        </div>
                    </div>

                    <div className="pt-6 border-t-2">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-bold">Success Rate</span>
                            <span className="text-2xl font-black text-emerald-600">
                                {successRate}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                            <div
                                className="bg-emerald-600 h-full"
                                style={{ width: `${successRate}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl border-2 border-emerald-100 p-8">
                    <div className="flex justify-between" >
                        <h3 className="text-xl font-black mb-4 flex items-center">
                            <BarChart3 className="w-6 h-6 text-emerald-600 mr-2" /> Performance
                            Distribution
                        </h3>

                        <div className="flex items-center space-x-3">
                            <div className="flex items-center gap-1" >
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-sm font-bold text-gray-700">Failed</span>
                            </div>
                            <div className="flex items-center gap-1" >
                                <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                                <span className="text-sm font-bold text-gray-700">Success</span>
                            </div>
                        </div>


                    </div>
                    <div className="relative w-full h-[300px] flex items-center justify-center">
                        {loading ? (
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600 border-solid"></div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <Legend
                                    verticalAlign="top"
                                    align="right"
                                    iconType="circle"
                                    wrapperStyle={{ fontWeight: 600 }}
                                    payload={[
                                        { value: "Success", type: "circle", color: "#10b981", id: "success" },
                                        { value: "Failed", type: "circle", color: "#ef4444", id: "failed" },
                                    ]}
                                />
                                <BarChart data={overallChartData} barSize={80}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />

                                    <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                                        {overallChartData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}






export default memo(OverallStatistics)