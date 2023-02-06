import { ChangeEvent, useState } from 'react'
import { data } from './constants'
import styles from './home.module.css'
import { IData } from './interfaces'

const App = (): JSX.Element => {
  const [title, setTitle] = useState<string>()
  const [array, setArray] = useState<IData[]>(data)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleSubmit = (): void => {
    if (!title?.length) return
    
    const newData = {
      id: new Date().getTime(),
      title: title, 
      description: 'Description'
    }
    setArray([...array, newData])
    setTitle('')
  }

  const deleteItem = (id: number): void => {
    const newArray = array.filter((item) => item.id !== id)
    setArray(newArray)
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Todo List</h1>
      <div className={styles.wrapper}>
        <input 
          type="text" 
          placeholder='Enter todo' 
          className={styles.input} 
          value={title}
          onChange={changeHandler}
          // onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleSubmit} className={styles.button}>Add todo</button>
      </div>

      {array.length ? 
        <div className={styles.todoList}>
          {array.map((item) => (
            <div key={item.id} className={styles.todoItem}>
              <p className={styles.todoTitle}>{item.title}</p>
              <div className={styles.todoDelete}>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        : 
        <h6 className={styles.text}>No todo item</h6>}
    </div>
  )
}

export default App