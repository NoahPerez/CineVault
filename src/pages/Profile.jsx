import StatsRow from "../components/StatsRow"
import {useState, useEffect} from "react"
import ProfileHeader from "../components/ProfileHeader"
import MoodBoard from "../components/MoodBoard"
import { useMovies } from "@/context/Movie.context"
import Footer from "../components/Footer"
import EditProfileModal from  "../components/EditProfileModal"

// hardcoded for you ali
const DefaultUser = {
  name: "Alex Mercer",
  username: "@alexmercer",
  joined: "March 2020",
  bio: "Cinema is life. Everything else is just details.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wendy",
}

export default function Profile() {
  const [user, setUser]= useState(DefaultUser)
  const {genres, getGenres} = useMovies()
  const [isEditing, setIsEditing] = useState(false)
  

  useEffect(() => {
    if (!genres.length) 
      getGenres()
  }, [])




  const handleSave = (updatedUser) => {
    setUser(updatedUser)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-8">
      <div className= "flex-1">
       <ProfileHeader user={user} onEditClick={() => setIsEditing(true)} />  
      <StatsRow/>
      <MoodBoard/>
      </div>

      <Footer />
      {isEditing && (
        <EditProfileModal
        user={user}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  )
}
