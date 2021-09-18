import React from 'react'
import './badje.scss'
import classnames from 'classnames'

type BadgeType = {
  id?: number
  onClick?: () => void 
  color: string | null
  className?: any
}


export const Badge = (props:BadgeType) => {
  return  <i onClick={props.onClick} className={classnames('badge', {[`badge--${props.color}`]: props.color}, props.className)}></i>

}




