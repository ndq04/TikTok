import {useState, useReducer, useEffect} from 'react'

const ACTIONS = {
  ADD_JOB: 'ADD_JOB',
  REMOVE_JOB: 'REMOVE_JOB',
  TOOGLE_COMPLE: 'TOOGLE_COMPLE',
}

const reducer = (jobs, action) => {
  const {type, payload} = action

  switch (type) {
    case ACTIONS.ADD_JOB:
      const newJobs = [...jobs]
      newJobs.push(newJob(payload.name))
      return newJobs
    case ACTIONS.REMOVE_JOB:
      return jobs.filter((job) => job.id !== payload.id)
    case ACTIONS.TOOGLE_COMPLE:
      return jobs.map((job) => {
        if (job.id === payload.id) {
          return {...job, complete: !job.complete}
        }
        return job
      })
    default:
      return jobs
  }
}

const newJob = (name) => {
  return {id: Date.now(), name, complete: false}
}

const TodoList = () => {
  const [name, setName] = useState('')
  const [jobs, dispatch] = useReducer(reducer, [], () => {
    const initialState = JSON.parse(
      localStorage.getItem('jobs')
    )

    return initialState ?? []
    // ??: Must is null or undefined
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name) {
      dispatch({type: ACTIONS.ADD_JOB, payload: {name}})
    }
    setName('')
    // inputRef.current.focus()
  }

  const handleRemove = (id) => {
    dispatch({type: ACTIONS.REMOVE_JOB, payload: {id}})
  }

  const hanleToogle = (id) => {
    dispatch({type: ACTIONS.TOOGLE_COMPLE, payload: {id}})
  }

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs))
  }, [jobs])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <p
              style={{
                color: job.complete ? 'gray' : '',
                textDecoration: job.complete
                  ? 'line-through'
                  : '',
              }}
            >
              {job.name}
            </p>
            <button onClick={() => handleRemove(job.id)}>
              Remove
            </button>
            <input
              type='checkbox'
              checked={job.complete}
              onChange={() => hanleToogle(job.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
