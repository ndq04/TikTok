import {useState} from 'react'

const courses1 = [
  {id: 1, name: 'HTML'},
  {id: 2, name: 'React JS'},
  {id: 3, name: 'Node JS'},
]
const courses2 = [
  {id: 1, name: 'CSS'},
  {id: 2, name: 'SASS'},
  {id: 3, name: 'Bootstrap'},
]

const TwoWayBinding = () => {
  const [radio, setRadio] = useState(1)
  const [checkBox, setCheckBox] = useState([])

  const handleCheckBox = (id) => {
    setCheckBox((prev) => {
      const isChecked = checkBox.includes(id)
      if (isChecked) {
        return checkBox.filter((item) => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleSubmit = () => {
    console.log({
      radio,
      checkBox,
    })
  }
  return (
    <>
      <div style={{padding: 50}}>
        {courses1.map((course) => (
          <div key={course.id}>
            <label>
              <input
                type='radio'
                checked={radio === course.id}
                onChange={() => setRadio(course.id)}
              />
              {course.name}
            </label>
          </div>
        ))}
      </div>
      <div>
        {courses2.map((course) => (
          <div key={course.id}>
            <label>
              <input
                type='checkbox'
                checked={checkBox.includes(course.id)}
                onChange={() => handleCheckBox(course.id)}
              />
              {course.name}
            </label>
          </div>
        ))}
      </div>
      <button style={{margin: 50}} onClick={handleSubmit}>
        Submit
      </button>
    </>
  )
}

export default TwoWayBinding
