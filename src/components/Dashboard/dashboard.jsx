// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
// import { Activity, CheckCircle, XCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// export default function Dashboard() {
//   const [selectedCaseType, setSelectedCaseType] = useState('one_to_one');

//   // Overall data
//   const overallData = {
//     total_count: 120,
//     total_success: 90,
//     total_failed: 30
//   };

// const casesData = {
//      one_to_one: { case_type: "one_to_one", total: 60, success: 50, failed: 10 },
//      one_to_many: { case_type: "one_to_many", total: 25, success: 20, failed: 5 },
//      many_to_one: { case_type: "many_to_one", total: 15, success: 10, failed: 5 },
//      invoice_not_matching: {
//        case_type: "invoice_not_matching",
//        total: 10,
//        success: 5,
//        failed: 5,
//      },
//      foreign_suppliers_invoices: {
//        case_type: "foreign_suppliers_invoices",
//        total: 5,
//        success: 3,
//        failed: 2,
//      },
//      landed_cost: { case_type: "landed_cost", total: 3, success: 1, failed: 2 },
//      services_invoices: {
//        case_type: "services_invoices",
//        total: 2,
//        success: 1,
//        failed: 1,
//      },
//    }

//   const currentCaseData = casesData[selectedCaseType];

//   // Chart data for Overall
//   const overallChartData = [
//     { name: 'Success', value: overallData.total_success, color: '#10b981' },
//     { name: 'Failed', value: overallData.total_failed, color: '#ef4444' }
//   ];

//   // Chart data for Cases
//   const casesChartData = [
//     { name: 'Success', value: currentCaseData.success, color: '#8b5cf6' },
//     { name: 'Failed', value: currentCaseData.failed, color: '#f59e0b' }
//   ];

//   const successRate = ((overallData.total_success / overallData.total_count) * 100).toFixed(1);
//   const caseSuccessRate = ((currentCaseData.success / currentCaseData.total) * 100).toFixed(1);

//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl border border-gray-700">
//           <p className="font-semibold">{payload[0].payload.name}</p>
//           <p className="text-2xl font-bold mt-1">{payload[0].value}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200">
//         <div className="px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
//               <p className="text-gray-500 mt-1">Monitor your performance metrics in real-time</p>
//             </div>
            
//           </div>
//         </div>
//       </header>

//       <div className="p-8 space-y-12">
//         {/* Overall Section */}
//         <div className="space-y-6">
//           <div className="flex items-center space-x-3">
//             <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
//             <h2 className="text-2xl font-bold text-gray-900">Overall Statistics</h2>
//           </div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//             {/* Overall Count Card */}
//             <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
//               <div className="flex items-start justify-between mb-6">
//                 <div>
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Count</p>
//                   <p className="text-5xl font-bold text-gray-900 mt-3">{overallData.total_count}</p>
//                 </div>
//                 <div className="bg-blue-100 p-4 rounded-xl">
//                   <Activity className="w-7 h-7 text-blue-600" />
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
//                   <div className="flex items-center space-x-3">
//                     <div className="bg-emerald-500 p-2 rounded-lg">
//                       <CheckCircle className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-emerald-600 font-medium">Success</p>
//                       <p className="text-2xl font-bold text-emerald-700">{overallData.total_success}</p>
//                     </div>
//                   </div>
//                   <ArrowUpRight className="w-5 h-5 text-emerald-600" />
//                 </div>
                
//                 <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
//                   <div className="flex items-center space-x-3">
//                     <div className="bg-red-500 p-2 rounded-lg">
//                       <XCircle className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-red-600 font-medium">Failed</p>
//                       <p className="text-2xl font-bold text-red-700">{overallData.total_failed}</p>
//                     </div>
//                   </div>
//                   <ArrowDownRight className="w-5 h-5 text-red-600" />
//                 </div>
//               </div>

//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">Success Rate</span>
//                   <span className="text-xl font-bold text-blue-600">{successRate}%</span>
//                 </div>
//                 <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
//                   <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${successRate}%` }}></div>
//                 </div>
//               </div>
//             </div>

//             {/* Overall Chart */}
//             <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">Performance Distribution</h3>
//                   <p className="text-sm text-gray-500 mt-1">Success vs Failed breakdown</p>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
//                     <span className="text-sm font-medium text-gray-600">Success</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                     <span className="text-sm font-medium text-gray-600">Failed</span>
//                   </div>
//                 </div>
//               </div>
//               <ResponsiveContainer width="100%" height={320}>
//                 <BarChart data={overallChartData} barSize={120}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
//                   <XAxis 
//                     dataKey="name" 
//                     stroke="#9ca3af" 
//                     tick={{ fill: '#6b7280', fontSize: 14, fontWeight: 600 }}
//                     axisLine={{ stroke: '#e5e7eb' }}
//                   />
//                   <YAxis 
//                     stroke="#9ca3af" 
//                     tick={{ fill: '#6b7280', fontSize: 12 }}
//                     axisLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
//                   <Bar dataKey="value" radius={[12, 12, 0, 0]}>
//                     {overallChartData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Cases Section */}
//         <div className="space-y-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-1 h-8 bg-purple-600 rounded-full"></div>
//               <h2 className="text-2xl font-bold text-gray-900">Case Type Analysis</h2>
//             </div>
            
//             {/* Dropdown */}
//             <div className="relative">
//               <select
//                 value={selectedCaseType}
//                 onChange={(e) => setSelectedCaseType(e.target.value)}
//                 className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-6 py-3.5 pr-12 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer hover:border-purple-300 transition-all shadow-sm text-base"
//               >
//                 <option value="one_to_one">One to One</option>
//          <option value="one_to_many">One to Many</option>
//                <option value="many_to_one">Many to One</option>
//                <option value="invoice_not_matching">Invoice Not Matching</option>
//                <option value="foreign_suppliers_invoices">
//                  Foreign Suppliers Invoices
//                </option>
//                <option value="landed_cost">Landed Cost</option>
//                <option value="services_invoices">Services Invoices</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-purple-600">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//             {/* Case Count Card */}
//             <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
//               <div className="flex items-start justify-between mb-6">
//                 <div>
//                   <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Count</p>
//                   <p className="text-5xl font-bold text-gray-900 mt-3">{currentCaseData.total}</p>
//                 </div>
//                 <div className="bg-purple-100 p-4 rounded-xl">
//                   <Activity className="w-7 h-7 text-purple-600" />
//                 </div>
//               </div>
              
//               <div className="mb-6 p-4 bg-purple-50 rounded-xl border-l-4 border-purple-600">
//                 <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-1">Case Type</p>
//                 <p className="text-lg font-bold text-purple-900 capitalize">{currentCaseData.case_type.replace(/_/g, ' ')}</p>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 bg-violet-50 rounded-xl">
//                   <div className="flex items-center space-x-3">
//                     <div className="bg-violet-500 p-2 rounded-lg">
//                       <CheckCircle className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-violet-600 font-medium">Success</p>
//                       <p className="text-2xl font-bold text-violet-700">{currentCaseData.success}</p>
//                     </div>
//                   </div>
//                   <ArrowUpRight className="w-5 h-5 text-violet-600" />
//                 </div>
                
//                 <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
//                   <div className="flex items-center space-x-3">
//                     <div className="bg-amber-500 p-2 rounded-lg">
//                       <XCircle className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-xs text-amber-600 font-medium">Failed</p>
//                       <p className="text-2xl font-bold text-amber-700">{currentCaseData.failed}</p>
//                     </div>
//                   </div>
//                   <ArrowDownRight className="w-5 h-5 text-amber-600" />
//                 </div>
//               </div>

//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">Success Rate</span>
//                   <span className="text-xl font-bold text-purple-600">{caseSuccessRate}%</span>
//                 </div>
//                 <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
//                   <div className="bg-purple-600 h-2.5 rounded-full transition-all" style={{ width: `${caseSuccessRate}%` }}></div>
//                 </div>
//               </div>
//             </div>

//             {/* Case Chart */}
//             <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">Performance Distribution</h3>
//                   <p className="text-sm text-gray-500 mt-1 capitalize">{currentCaseData.case_type.replace(/_/g, ' ')} breakdown</p>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
//                     <span className="text-sm font-medium text-gray-600">Success</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
//                     <span className="text-sm font-medium text-gray-600">Failed</span>
//                   </div>
//                 </div>
//               </div>
//               <ResponsiveContainer width="100%" height={320}>
//                 <BarChart data={casesChartData} barSize={120}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
//                   <XAxis 
//                     dataKey="name" 
//                     stroke="#9ca3af" 
//                     tick={{ fill: '#6b7280', fontSize: 14, fontWeight: 600 }}
//                     axisLine={{ stroke: '#e5e7eb' }}
//                   />
//                   <YAxis 
//                     stroke="#9ca3af" 
//                     tick={{ fill: '#6b7280', fontSize: 12 }}
//                     axisLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
//                   <Bar dataKey="value" radius={[12, 12, 0, 0]}>
//                     {casesChartData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, CheckCircle, XCircle, TrendingUp, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const [selectedCaseType, setSelectedCaseType] = useState('one_to_one');

  // Overall data
  const overallData = {
    total_count: 120,
    total_success: 90,
    total_failed: 30
  };

  const casesData = {
    one_to_one: { case_type: "one_to_one", total: 60, success: 50, failed: 10 },
    one_to_many: { case_type: "one_to_many", total: 25, success: 20, failed: 5 },
    many_to_one: { case_type: "many_to_one", total: 15, success: 10, failed: 5 },
    invoice_not_matching: {
      case_type: "invoice_not_matching",
      total: 10,
      success: 5,
      failed: 5,
    },
    foreign_suppliers_invoices: {
      case_type: "foreign_suppliers_invoices",
      total: 5,
      success: 3,
      failed: 2,
    },
    landed_cost: { case_type: "landed_cost", total: 3, success: 1, failed: 2 },
    services_invoices: {
      case_type: "services_invoices",
      total: 2,
      success: 1,
      failed: 1,
    },
  };

  const currentCaseData = casesData[selectedCaseType];

  // Chart data for Overall
  const overallChartData = [
    { name: 'Success', value: overallData.total_success, color: '#10b981' },
    { name: 'Failed', value: overallData.total_failed, color: '#ef4444' }
  ];

  // Chart data for Cases
  const casesChartData = [
    { name: 'Success', value: currentCaseData.success, color: '#059669' },
    { name: 'Failed', value: currentCaseData.failed, color: '#f59e0b' }
  ];

  const successRate = ((overallData.total_success / overallData.total_count) * 100).toFixed(1);
  const caseSuccessRate = ((currentCaseData.success / currentCaseData.total) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl border-2 border-gray-700">
          <p className="font-bold text-sm text-gray-300">{payload[0].payload.name}</p>
          <p className="text-3xl font-black mt-1">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-emerald-500">
        <div className="px-8 py-7">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2 font-medium">Monitor your performance metrics in real-time</p>
            </div>
            <div className="flex items-center space-x-3 bg-emerald-100 px-5 py-2.5 rounded-full shadow-sm">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-emerald-700">Live Data</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-10">
        {/* Overall Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-10 bg-emerald-600 rounded-full shadow-lg"></div>
            <h2 className="text-3xl font-black text-gray-900">Overall Statistics</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Overall Count Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl shadow-xl border-2 border-emerald-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Total Count</p>
                  <p className="text-4xl font-black text-gray-900 mt-4">{overallData.total_count}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-2xl shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="relative overflow-hidden flex items-center justify-between p-5 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl border-2 border-emerald-200 hover:shadow-lg transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500 p-3 rounded-xl shadow-md">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-700 font-bold uppercase">Success</p>
                      <p className="text-2xl font-black text-emerald-800">{overallData.total_success}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-emerald-600" />
                </div>
                
                <div className="relative overflow-hidden flex items-center justify-between p-5 bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border-2 border-red-200 hover:shadow-lg transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-500 p-3 rounded-xl shadow-md">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-red-700 font-bold uppercase">Failed</p>
                      <p className="text-3xl font-black text-red-800">{overallData.total_failed}</p>
                    </div>
                  </div>
                  <ArrowDownRight className="w-6 h-6 text-red-600" />
                </div>
              </div>

              <div className="pt-6 border-t-2 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-700">Success Rate</span>
                  <span className="text-2xl font-black text-emerald-600">{successRate}%</span>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-lg transition-all duration-1000 ease-out" 
                    style={{ width: `${successRate}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Overall Charts */}
            <div className="lg:col-span-8">
              {/* Bar Chart */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-emerald-100 p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 p-3 rounded-xl">
                      <BarChart3 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900">Performance Distribution</h3>
                      <p className="text-sm text-gray-500 font-medium">Success vs Failed comparison</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-700">Success</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-red-50 px-3 py-1.5 rounded-full">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-700">Failed</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={overallChartData} barSize={80}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9ca3af" 
                      tick={{ fill: '#374151', fontSize: 13, fontWeight: 700 }}
                      axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }} />
                    <Bar dataKey="value" radius={[16, 16, 0, 0]}>
                      {overallChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Cases Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-10 bg-green-600 rounded-full shadow-lg"></div>
              <h2 className="text-3xl font-black text-gray-900">Case Type Analysis</h2>
            </div>
            
            {/* Dropdown */}
            <div className="relative">
              <select
                value={selectedCaseType}
                onChange={(e) => setSelectedCaseType(e.target.value)}
                className="appearance-none bg-white border-3 border-green-200 rounded-2xl px-8 py-4 pr-14 text-gray-900 font-bold focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-400 cursor-pointer hover:border-green-400 hover:shadow-lg transition-all shadow-md text-base"
              >
                <option value="one_to_one">One to One</option>
                <option value="one_to_many">One to Many</option>
                <option value="many_to_one">Many to One</option>
                <option value="invoice_not_matching">Invoice Not Matching</option>
                <option value="foreign_suppliers_invoices">Foreign Suppliers Invoices</option>
                <option value="landed_cost">Landed Cost</option>
                <option value="services_invoices">Services Invoices</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Case Count Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl shadow-xl border-2 border-green-100 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Total Count</p>
                  <p className="text-4xl font-black text-gray-900 mt-4">{currentCaseData.total}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-2xl shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="mb-8 p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-l-4 border-green-600 shadow-sm">
                <p className="text-xs text-green-700 font-black uppercase tracking-wider mb-2">Case Type</p>
                <p className="text-xl font-black text-green-900 capitalize">{currentCaseData.case_type.replace(/_/g, ' ')}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="relative overflow-hidden flex items-center justify-between p-5 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl border-2 border-emerald-200 hover:shadow-lg transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-600 p-3 rounded-xl shadow-md">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-700 font-bold uppercase">Success</p>
                      <p className="text-3xl font-black text-emerald-800">{currentCaseData.success}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-emerald-600" />
                </div>
                
                <div className="relative overflow-hidden flex items-center justify-between p-5 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl border-2 border-amber-200 hover:shadow-lg transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="bg-amber-500 p-3 rounded-xl shadow-md">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-700 font-bold uppercase">Failed</p>
                      <p className="text-3xl font-black text-amber-800">{currentCaseData.failed}</p>
                    </div>
                  </div>
                  <ArrowDownRight className="w-6 h-6 text-amber-600" />
                </div>
              </div>

              <div className="pt-6 border-t-2 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-700">Success Rate</span>
                  <span className="text-2xl font-black text-green-600">{caseSuccessRate}%</span>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg transition-all duration-1000 ease-out" 
                    style={{ width: `${caseSuccessRate}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Case Charts */}
            <div className="lg:col-span-8">
              {/* Bar Chart */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-green-100 p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900">Performance Distribution</h3>
                      <p className="text-sm text-gray-500 font-medium capitalize">{currentCaseData.case_type.replace(/_/g, ' ')} analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full">
                      <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-700">Success</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-amber-50 px-3 py-1.5 rounded-full">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-700">Failed</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={casesChartData} barSize={80}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9ca3af" 
                      tick={{ fill: '#374151', fontSize: 13, fontWeight: 700 }}
                      axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
                    />
                    <YAxis 
                      stroke="#9ca3af" 
                      tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(5, 150, 105, 0.1)' }} />
                    <Bar dataKey="value" radius={[16, 16, 0, 0]}>
                      {casesChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}