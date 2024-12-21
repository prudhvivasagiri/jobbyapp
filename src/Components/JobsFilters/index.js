import './index.css'
import ProfileCard from '../ProfileCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobsFilters = props => {
  const {changeEmploymentType, changeSalaryRange} = props
  const onChangeSalaryRange = event => {
    changeSalaryRange(event.target.id)
  }

  const onChangeType = event => {
    changeEmploymentType(event.target.value)
  }

  return (
    <div className="jobs-sidebar">
      <ProfileCard />
      <hr className="line" />
      <div>
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="filters">
          {employmentTypesList.map(each => (
            <li className="filter-list-item" key={each.employmentTypeId}>
              <input
                type="checkbox"
                id={each.employmentTypeId}
                onChange={onChangeType}
                value={each.employmentTypeId}
                className="filter-input"
              />
              <label htmlFor={each.employmentTypeId} className="label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="line" />
      <div>
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="filters">
          {salaryRangesList.map(each => (
            <li className="filter-list-item" key={each.salaryRangeId}>
              <input
                type="radio"
                id={each.salaryRangeId}
                name="salary"
                onChange={onChangeSalaryRange}
                className="filter-input"
              />
              <label htmlFor={each.salaryRangeId} className="label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default JobsFilters
