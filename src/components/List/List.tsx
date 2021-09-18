import React from 'react'
import './list.scss'
import classNames from 'classnames'
import { Badge } from '../Badge/Badge'
import ClouseSvg from '../../assets/Clouse.svg'
import { parentPort } from 'worker_threads'
import axios from 'axios'




type ListType = {
 active?: boolean
 item: any
 isRemovable?: boolean
 onClickPopup?: () => void
 onRemove?: (itemId: number) => void
 onClickItem?: any
 activeItem?: any
}



export const List = (props:ListType) => {

const removeList = (item:number) => {
  if (window.confirm('Вы действительно хотите удалить список?')) {
    axios.delete('http://localhost:3001/lists/' + item).then(() => {
    //@ts-ignore 
    props.onRemove(item)
    })

    
  }
  
  
}




  return  (<ul className="list">
    {
      props.item.map((item: any,index: any) => {
        
      return <li key={index}  
      className={classNames(item.className, { active: item.active ? item.active :   props.activeItem &&  props.activeItem.id === item.id})}
      //@ts-ignore
      onClick={props.onClickItem ? () => props.onClickItem(item) : null} > 
      <i>  
      {item.icon ? item.icon : <Badge color={item.color.name}/>} 
      </i>             
      <span  onClick={props.onClickPopup}>{item.name} {item.tasks && item.tasks.length> 0 && `(${item.tasks.length})`} </span>
      {props.isRemovable ? <img onClick={ () => removeList(item.id)}  className="list__remove-icon" src={ClouseSvg} alt="Clouse"/>: ''}
    </li>
      })
    }
   
  
</ul>)
}