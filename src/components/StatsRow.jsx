import { Film, Tv, Bookmark } from "lucide-react"; 

const icons = {
    "Movies Watched": Film,
    "TV Shows": Tv,
    Watchlist: Bookmark,
  }

function StatsRow({ stats = [], isLoading = false }) {
    if (isLoading) {
        return <p className="text-gray-400 mb-10">Loading profile stats...</p>
    }

    // hardcoded for you Ali to replace it with real data from the backend / Ali : DONE
//  const stats = [
//   { label: 'Movies Watched', value: 127 },
//   { label: 'TV Shows', value: 48 },
//   { label: 'Watchlist', value: 24 },
//   { label: 'Reviews', value: 16 },
//  ]

 return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = icons[stat.label]

          return (
            <div
              key={stat.label}
              className="bg-[#161b22] border border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#dfff00]/10 border border-[#dfff00]/20 flex items-center justify-center text-[#dfff00]">
                  {Icon && <Icon size={20} />}
                </div>
              </div>

              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          )
        })}
      </div>
    )
  }




export default StatsRow;