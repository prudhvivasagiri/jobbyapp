import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {jobItem} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem
  return (
    <Link to={`/jobs/${id}`} className="job-item-link">
      <li className="job-item-card">
        <div className="logo-container">
          <img src={companyLogoUrl} className="logo" alt="company logo" />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-container">
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
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div>
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
