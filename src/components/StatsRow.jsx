 function StatsRow() {

    // hardcoded for you Ali to replace it with real data from the backend
 const stats = [
  { label: 'Movies Watched', value: 127 },
  { label: 'TV Shows', value: 48 },
  { label: 'Watchlist', value: 24 },
  { label: 'Reviews', value: 16 },
 ]

 return (
    <div className="grid grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
            <div key={stat.label} className="bg-[#161b22] rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
            </div>
        ))}
    </div>
 )
}




export default StatsRow;