import axios from 'axios'
import React, { Dispatch, SetStateAction, useState } from 'react'

type AddTextFormType = {
  clickHandler: () => void
  onAddTask: (listId: number, taskObj: any) => void
  inputValue: string
  activeItem: any
  changeHandler: (event: any) => void
  setInputValue: Dispatch<SetStateAction<string>>

}

export const AddTextForm = (props: AddTextFormType) => {
  const [isLoading, setIsLoading] = useState(false)



  const onAddHandler = () => {
    const obj = {
      listId: props.activeItem.id,
      text: props.inputValue,
      completed:false
    }
    
    if (!props.inputValue) {
      return ;
    }

    setIsLoading(true)
    axios.post('http://localhost:3001/tasks/' , obj ).then(res => {
      console.log(res.data)
      props.onAddTask(props.activeItem.id,res.data)
      props.setInputValue('')

      
    }).catch(() => {
      'Ошибка при добавлении задачи'
      
    })
    .finally(() => {
      setIsLoading(false)
    })
    

  
  }





  
  return (
    <div className="tasks__text">
      <div className="tasks__text-input">
      <input onChange={props.changeHandler}  value={props.inputValue}   className="field" type="text" placeholder="Текст задачи"/>
      </div>
      <div className="tasks__text-button">
    <button disabled={isLoading} onClick={onAddHandler} className="button ">
 {isLoading ? 'Добавление ..': 'Добавить задачу' }  
      </button>
      <button onClick={props.clickHandler} className="button button--grey">
      Отмена
      </button>
    </div>
    </div>
  )
}
