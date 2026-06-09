 function ProfileHeader({ user, onEditClick }) {
  return (
    <div className="flex items-center justify-between mb-8">
      
      <div className="flex items-center gap-5">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-20 h-20 rounded-full border-2 border-yellow-400 object-cover bg-gray-700"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-400 text-sm">{user.username}</p>
          <p className="text-gray-500 text-xs mt-1">Joined {user.joined}</p>
        </div>
      </div>

      <button
        onClick={onEditClick}
        className="border border-white/20 text-white text-xs px-4 py-2 rounded-lg font-black uppercase tracking-wide hover:bg-[#dfff00] hover:text-[#070907] hover:border-[#dfff00] transition"
        >
        Edit Profile
        </button>
    </div>
  )
}

export default ProfileHeader;