import React from 'react'
import 'normalize.css'

import Meme from './components/Meme'

import './styles/index.css'

const MEMES_KEY = 'MEMES'

const areTodayOrEqual = (strDate, comparisionDate) => {
  const today = comparisionDate ? new Date(comparisionDate) : new Date()
  const someDate = new Date(strDate)
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
}

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

function App () {
  const [data, setData] = React.useState(() => {
    const d = localStorage.getItem(MEMES_KEY)

    if (d?.length) {
      const parsedData = JSON.parse(d)

      const result = parsedData.every(({ date }) => {
        const addedDate = new Date(date).addDays(1)

        if (areTodayOrEqual(date) || areTodayOrEqual(addedDate)) {
          return true
        }
        return parsedData.some(obj =>
          areTodayOrEqual(addedDate, obj.date)
        )
      })

      if (result) {
        return parsedData
      }
    }

    return []
  })

  const hasBeenClaimed = React.useMemo(() => {
    return data.some(({ date }) => areTodayOrEqual(date))
  }, [data])

  const handleAdd = () => {
    setData(prevData => [...prevData, {
      date: Date.now(),
      name: 'parrot'
    }])
  }

  React.useEffect(() => {
    if (data) {
      localStorage.setItem(MEMES_KEY, JSON.stringify(data))
    }
  }, [data])

  return (
    <div className="layout">
      <header>
        <h1>1-per-day</h1>
        <span>{data.length}</span>
      </header>
      <main>
        {data.map(({ name, date }) => <Meme key={date} name={name}/>)}
      </main>
      <footer>
      {
        !hasBeenClaimed && (
          <button type="button" onClick={handleAdd}>
            Claim my ultrafast parrot!
          </button>
        )
      }
      </footer>
    </div>
  )
}

export default App
