import React, { useState } from 'react'
import { Badge } from '../Badge/Badge'
import { List } from '../List/List'
import ClouseSvg from '../../assets/Clouse.svg'
import './AddList.scss'
import axios from 'axios'

//{id : number,hex: string,name: string}[] 

type AddButtonListType = { 
  colors:any
  onAdd: (obj: any) => void
}

export const AddButtonList = (props: AddButtonListType) => {
  const [popup, setVisiblePopup] = useState(false)
  const [selectedColor, setColor] = useState<null | number>(3)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  React.useEffect(() => {
    if (Array.isArray(props.colors)) {
      setColor(props.colors[0].id)
    }

  }, [props.colors])








  const onClose = () => {
    setVisiblePopup(false)
    setInputValue('')
    setColor(props.colors[0].id)
  }
 

   const inputChange = (event: any) => {
    const text = event.target.value
    setInputValue(text)
    
   }

   const addList  = () => {
     if (!inputValue) {
       alert('Введите название списка!')
       return;
     
     }

     setIsLoading(true)
     axios.post('http://localhost:3001/lists', {name: inputValue , colorId: selectedColor}).then(res => {
   //@ts-ignore
     const color  = props.colors.filter(col => col.id === selectedColor[0]).name
     const newList = {...res.data, color: {name: color}}
     props.onAdd(newList)
     onClose()
    }).finally(()=> {
      setIsLoading(false)
    }) 
    
   }
   
   
  

  return (
    <div className="add-list">
    <List  onClickPopup={() => setVisiblePopup(!popup)} item={
    
         [{className: "list__add-button", color: '',icon:<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" >
         <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
         </svg>       
  , name: 'Добавить список '}]}/>
  {
    popup ? <div className="add-list__popup">
      <img onClick={onClose } className="add-list__popup__close-btn" src={ClouseSvg} alt="Close Button"/>
    <input value={inputValue} onChange={inputChange} className="field" type="text" placeholder="Название списка"/>
   <div className="add-list__popup__colors ">
     {
       props.colors.map((item: any) => {
         return <Badge 
         key={item.id}
         onClick={() => setColor(item.id)}
         id={item.id} 
         color={item.name}
         className={selectedColor === item.id ? 'active': ''}
         />
       })
     }
   </div>
    <button onClick={addList} className="button">
     {isLoading ? 'Добавление...': 'Добавить'} 
      
      </button>
  </div> : ''
  }
  

    </div>
  
  )}