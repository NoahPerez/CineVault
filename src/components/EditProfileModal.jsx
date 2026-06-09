import { useState } from "react"
 function EditProfileModal({user, onSave, onCancel})  {
    const [formData, setFormData] = useState(user)

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#161b22] rounded-2xl p-6 w-full max-w-md border border-white/10">

        
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-black uppercase tracking-widest text-[#dfff00]">
            Edit Profile
          </h2>
          <div className="flex-1 h-[1px] bg-[#dfff00]/30 ml-2" />
        </div>

        <div className="flex flex-col gap-4">


        {/* harcoded for you Ali */}
          
          <div>
            <label className="text-gray-400 text-xs mb-1 block uppercase tracking-wide">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              // spread operator keeps all other fields, only updates name
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0d1117] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#dfff00] transition"
            />
          </div>

          
          <div>
            <label className="text-gray-400 text-xs mb-1 block uppercase tracking-wide">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-[#0d1117] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#dfff00] transition"
            />
          </div>

          
          <div>
            <label className="text-gray-400 text-xs mb-1 block uppercase tracking-wide">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full bg-[#0d1117] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#dfff00] transition resize-none"
            />
          </div>

        </div>

        
        <div className="flex gap-3 mt-6">

          <button
            onClick={() => onSave(formData)}
            className="flex-1 bg-[#dfff00] text-black text-xs font-black uppercase tracking-widest py-2 rounded-lg hover:brightness-110 transition"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex-1 border border-white/20 text-white text-xs font-black uppercase tracking-widest py-2 rounded-lg hover:bg-white/10 transition"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
    )
 }

















export default EditProfileModal;