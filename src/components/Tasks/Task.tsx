import React, { useState } from 'react'
import axios from 'axios'
import EditSvg from '../../assets/Edit.svg'
import ClouseSvg from '../../assets/Clouse.svg'

type TaskType = {
  item: any
  list: any
  onCompletedTask: (listId: number, taskId:  number, completed: boolean) => void
  onRemoveTask: (listId: number, itemId: number) => void
  onEditTaskText: (listId: number, taskObj: {id: number, text: string} ) => void

}

export const Task = (props: TaskType) => {


  const completedHandler = (e: any) => {
     props.onCompletedTask(props.list.id, props.item.id, e.target.checked)
    
     
  } 






  return (
    <div key={props.item.id} className="tasks__items-row">
    <div className="checkbox">
      <input onChange={completedHandler} id={`task-${props.item.id}`} type="checkbox" checked={props.item.completed}/>
      
      <label   htmlFor={`task-${props.item.id}`}>
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
 </label>
    </div>
    <p>{props.item.text} </p>  
    <div className="tasks__items-row-actions">
        <div >
         <img onClick={() =>  props.onEditTaskText(props.list.id, props.item)}  src={EditSvg} alt="Edit"/>
        </div>
        <div onClick={() => props.onRemoveTask(props.list.id,  props.item.id)}>
       <img  src={ClouseSvg} alt="Clouse"/>
        </div>
      </div>   

    
    </div>    
  )
}
