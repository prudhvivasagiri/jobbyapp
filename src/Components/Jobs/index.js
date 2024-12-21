import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import JobsFilters from '../JobsFilters'
import JobItem from '../JobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    salaryRange: '',
    employmentTypes: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  changeEmploymentType = employmentType => {
    const {employmentTypes} = this.state
    const isChecked = employmentTypes.includes(employmentType)
    const updatedData = isChecked
      ? employmentTypes.filter(each => each !== employmentType)
      : [...employmentTypes, employmentType]
    this.setState({employmentTypes: updatedData}, this.getJobsList)
  }

  changeSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobsList)
  }

  getJobsList = async () => {
    const {employmentTypes, salaryRange, searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retryJobs = () => {
    this.getJobsList()
  }

  onSearch = () => {
    this.getJobsList()
  }

  onEnter = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="jobs-failure">
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="failure-img"
            />
            <h1 className="failure-heading">No Jobs Found</h1>
            <p className="failure-description">
              We could not find any jobs. Try other filters
            </p>
          </div>
        </div>
      )
    }
    return (
      <ul className="job-item-list">
        {jobsList.map(each => (
          <JobItem jobItem={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="jobs-failure">
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
        <button type="button" onClick={this.retryJobs} className="retry-btn">
          Retry
        </button>
      </div>
    </div>
  )

  renderProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderProgressView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-container">
          <JobsFilters
            changeSalaryRange={this.changeSalaryRange}
            changeEmploymentType={this.changeEmploymentType}
          />
          <div className="jobs-results-container">
            <div className="search-container">
              <input
                type="search"
                className="search"
                value={searchInput}
                onChange={this.changeSearchInput}
                placeholder="Search"
                onKeyDown={this.onEnter}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon"
                onClick={this.onSearch}
              >
                <BsSearch />
              </button>
            </div>
            <div>{this.renderJobsList()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
