import React, { useState } from 'react'
import './tasks.scss'
import EditSvg from '../../assets/Edit.svg'
import axios from 'axios'
import { AddTasksForm } from './AddTasksForm'
import { AddTextForm } from './AddTextForm'
import {  Link, useHistory} from 'react-router-dom'
import {Task} from './Task'



type TasksType = {
  onAddTask: (listId: number, taskObj: any) => void
  withoutEmpty?: boolean
  activeItem: any
  onCompletedTask: (listId: number, taskId:  number, completed: boolean) => void
  onEditTitle?: (id: number , text: string | null) => void 
  onRemoveTask?: (listId: number, taskId: number) => void 
  onEditTaskText: (listId: number, taskObj: {id: number, text: string} ) => void
}






export const Tasks = (props: TasksType) => {
  const [taskForm, setTaskForm] = useState(false)
    const [inputValue, setInputValue] = useState('')


    

    const toggleFormVisible = () => {
      setTaskForm(!taskForm)
      setInputValue('')
    }


    const onChangeTextHandler = (event: any) => {
      const even = event.target.value
      setInputValue(even)
     
    }


  const editTitle = () => {
    const newTitle = window.prompt(props.activeItem.name )
    if(newTitle) {
      props.onEditTitle && props.onEditTitle(props.activeItem.id,newTitle )
      axios.patch('http://localhost:3001/lists/' + props.activeItem.id, {
        name: newTitle
      }).catch(() => {
        console.log('не удалось обновить состояние списка');
        
      })
   
    }
  }


 

  
 return  (
  <div className="tasks">
    <Link to={`/lists/${props.activeItem.id}`} > 
  <h2 style={{color: props.activeItem.color.hex}} className="tasks__title">
  
     
     {props.activeItem && props.activeItem.name}
    <img onClick={editTitle} src={EditSvg} alt="Edit Svg"/>
  </h2></Link>

  <div className="tasks__items">
    
    {!props.withoutEmpty &&  !props.activeItem.tasks.length && <h2>Задачи отсутствуют </h2> }
   {
    
    props.activeItem &&  props.activeItem.tasks.map((item: any )=> {
      //@ts-ignore
      return <Task   completed={props.completed} onCompletedTask={props.onCompletedTask}  onEditTaskText={props.onEditTaskText} key={item.id} list={props.activeItem} item={item} onRemoveTask={props.onRemoveTask}/>
    })
  }
   
   {
     taskForm ?  <AddTextForm  setInputValue={setInputValue} changeHandler={onChangeTextHandler} activeItem={props.activeItem} onAddTask={props.onAddTask} inputValue={inputValue} clickHandler={toggleFormVisible}/> : <AddTasksForm clickHandler={toggleFormVisible}/>
   }
   
   
    
  </div>
 </div>

)
}

