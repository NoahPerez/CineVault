import loadingIcon from "../assets/loading.svg"
import "./loading.css"

export default function Loading({ message = "Loading..." }) {
  return (
    <div className="loading-state">
      <img src={loadingIcon} alt="" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}
