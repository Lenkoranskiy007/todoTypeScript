import React from 'react'
import './tasks.scss'
import AddSvg from '../../assets/AddSvg.svg'




type AddTasksFormType = {
  clickHandler: () => void
}


export const AddTasksForm = (props: AddTasksFormType) => {
  return (
    <div className="tasks__form" onClick={props.clickHandler}>
     <div className="tasks__form-new">
      <img src={AddSvg} alt="Add icon"/>
      <span>Новая задача</span>
     </div>
   </div>
  )
}
