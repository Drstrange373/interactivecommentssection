import React, { createContext, useState } from 'react'
import DeleteModal from '../components/DeleteModal'

export const DeleteModalContext = createContext<null | DeleteModalContext>(null)


export default function DeleteModalContextProvider({children}:{children:React.ReactNode}) {
  const [visible, setVisible] = useState(false)
  // HOF to set function as state
  const [onDeleteClick, setOnDeleteClick] = useState(()=>(()=>{})) 
  return (
    <DeleteModalContext.Provider value={{ visible, setVisible, onDeleteClick, setOnDeleteClick }}>
      {visible && <DeleteModal />}
      {children}
    </DeleteModalContext.Provider>
  )
}
