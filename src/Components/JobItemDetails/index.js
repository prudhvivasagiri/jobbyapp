import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItem: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemdetails()
  }

  retry = () => {
    this.getJobItemdetails()
  }

  getJobItemdetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map(eachSkill => ({
          skillImageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        imageUrl: data.job_details.image_url,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobItem: updatedData,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProgressView = () => (
    <div className="job-item-details-bg-container">
      <Header />
      <div className="loader-container-job-item-details" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="job-item-details-bg-container">
      <Header />
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" onClick={this.retry} className="retry-btn">
          Retry
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {jobItem, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItem
    return (
      <div className="job-item-details-bg-container">
        <Header />
        <div className="job-item-details-container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              className="logo"
              alt="job details company logo"
            />
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
            <div className="description-visit-header">
              <h1 className="description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="visit-link">
                Visit
                <FiExternalLink className="external-link" />
              </a>
            </div>
            <p className="description">{jobDescription}</p>
          </div>
          <div>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-container">
              {skills.map(each => {
                const {skillImageUrl, name} = each
                return (
                  <li key={name} className="skill">
                    <img
                      src={skillImageUrl}
                      className="skill-logo"
                      alt={name}
                    />
                    <p className="skill-title">{name}</p>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h1 className="skills-heading">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="description life-at-company-description">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                className="image-at-company"
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container-main">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(each => (
              <SimilarJobCard key={each.id} similarJob={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderProgressView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default JobItemDetails
