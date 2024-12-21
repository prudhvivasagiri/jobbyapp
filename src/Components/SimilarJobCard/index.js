import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobCard = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob
  return (
    <li className="similar-job-card">
      <div className="logo-container">
        <img
          src={companyLogoUrl}
          className="logo"
          alt="similar job company logo"
        />
        <div>
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
      <div className="location-type-container">
        <div className="job-details">
          <IoLocationSharp className="icon" />
          <p className="job-detail">{location}</p>
        </div>
        <div className="job-details">
          <BsFillBriefcaseFill className="icon" />
          <p className="job-detail">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
