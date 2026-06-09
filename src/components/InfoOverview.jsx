import "./InfoOverview.css"

function InfoOverview({ movie }) {
  if (!movie) return null

  const overview = movie.overview || "No overview available."
  const language = movie.spoken_languages?.map((lang) => lang.english_name || lang.name).join(", ") || movie.original_language || "N/A"
  const countries = movie.production_countries?.map((country) => country.name).join(", ") || "N/A"
  const production = movie.production_companies?.map((company) => company.name).join(", ") || "N/A"
  const boxOffice = movie.revenue
    ? movie.revenue.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "N/A"

  return (
    <section className="info-overview">
      <div className="info-overview__inner">
        <p className="info-overview__eyebrow">About</p>
        <p className="info-overview__text">{overview}</p>

        <div className="info-overview__grid">
          <article className="info-overview__card">
            <span className="info-overview__label">Language</span>
            <p className="info-overview__value">{language}</p>
          </article>

          <article className="info-overview__card">
            <span className="info-overview__label">Country</span>
            <p className="info-overview__value">{countries}</p>
          </article>

          <article className="info-overview__card">
            <span className="info-overview__label">Production</span>
            <p className="info-overview__value">{production}</p>
          </article>

          <article className="info-overview__card">
            <span className="info-overview__label">Box Office</span>
            <p className="info-overview__value">{boxOffice}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default InfoOverview
