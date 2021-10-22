// Riêng
// 1. useEffect(callback)
// - Gọi callback mỗi khi component re-render
// - Gọi callback sau khi component thêm element vào DOM
// 2. useEffect(callback,[])
// - Chỉ gọi callback 1 lần sau khi component mounted
// 3. useEffect(callback,[deps])
// - Callback sẽ được gọi lại mỗi khi deps thay đổi

//-----------------------------
// Chung
// 1. Callback luôn được gọi sau khi component mounted
// 2. Cleanup fanction luôn được gọi  trước khi component unmounted

import {useEffect, useState} from 'react'

function Content() {
  const [toogle, setToogle] = useState(false)
  const [title, setTitle] = useState('')
  const [apis, setApis] = useState([])
  const [showGoToTop, setShowGoToTop] = useState(false)
  const [countDown, setCountDown] = useState(60)

  const tabs = [
    'posts',
    'comments',
    'albums',
    'photos',
    'todos',
    'users',
  ]
  const [btn, setBtn] = useState('posts')

  useEffect(() => {
    document.title = title
  })

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${btn}`)
      .then((res) => res.json())
      // .then((apis) => console.log(apis))
      .then((apis) => setApis(apis))
  }, [btn])

  useEffect(() => {
    const handleScroll = () => {
      // if (window.scrollY >= 250) {
      //   setShowGoToTop(true)
      // } else setShowGoToTop(false)
      setShowGoToTop(window.scrollY >= 250)
    }
    window.addEventListener('scroll', handleScroll)

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setInterval(() => {
      setCountDown((prevCountDown) => prevCountDown - 1)
    }, 1000)
  }, [])

  const styles = {
    position: 'fixed',
    padding: '8px 18px',
    borderRadius: '8px',
    color: '#fff',
    background: '#1888ff',
    cursor: 'pointer',
    right: '50px',
    bottom: '50px',
  }

  return (
    <>
      <button onClick={() => setToogle(!toogle)}>
        Toggle
      </button>
      {toogle && (
        <div style={{position: 'relative'}}>
          {showGoToTop && (
            <span style={styles}>Go to top</span>
          )}
          <p>{countDown}</p>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {tabs.map((tab) => (
            <button
              style={
                btn === tab
                  ? {
                      border: 'none',
                      outline: 'none',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      color: '#fff',
                      background: '#333',
                      textTransform: 'capitalize',
                    }
                  : {
                      border: 'none',
                      outline: 'none',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }
              }
              key={tab}
              onClick={() => setBtn(tab)}
            >
              {tab}
            </button>
          ))}
          <ul>
            {apis.map((api) => (
              <li key={api.id}>{api.title || api.name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Content
