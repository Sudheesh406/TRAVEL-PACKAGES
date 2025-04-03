function DashboardCard({ title, count, onClick, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 rounded-full bg-indigo-50">
          {icon}
        </div>
        <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Last 30 days
        </span>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex items-end space-x-2">
          <p className="text-4xl font-bold text-indigo-600">{count}</p>
          <span className="text-green-500 text-sm font-medium mb-1">+12.5%</span>
        </div>
      </div>
      <button
        onClick={onClick}
        className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold"
      >
        <span>View Details</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default DashboardCard;