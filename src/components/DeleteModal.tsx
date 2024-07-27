import  { useContext, useEffect, useRef } from 'react'
import { DeleteModalContext } from '../context/DeleteModalContextProvider'

export default function DeleteModal() {
  const ref = useRef<HTMLDivElement | null>(null)
  const {setVisible, onDeleteClick} = useContext(DeleteModalContext)!


  const handelDeleteClick =()=>{
    setVisible(false)
    onDeleteClick()
  }

  const handelCancelClick = ()=>{
    setVisible(false)
  }

  useEffect(() => {
    const deleteContainer = ref.current!
    setTimeout(() => {
      deleteContainer.classList.remove('scale-0')
    }, 500)    
  }, [])


  

  return (
    <div className='h-screen w-screen fixed flex justify-center  items-center z-50 bg-[rgba(0,0,0,0.5)] overflow-hidden'>
      <div ref={ref} className="md:w-96 w-72  rounded-lg bg-neutral-white p-7 pb-2 flex flex-col justify-between items-start *:mb-3 transition-transform  ease-in duration-300 scale-0">
        <h2 className='text-neutral-dark-blue font-semibold'>Delete Comment</h2>
        <div className='text-neutral-grayish-blue'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</div>
        <div className="button-container flex justify-between w-full  text-neutral-white rounded cursor-pointer">
          <button onClick={handelCancelClick} className='opacity-95 bg-neutral-dark-blue w-24 md:w-36 h-10 text-neutral-white rounded-lg cursor-pointer hover:opacity-65' >No, cancel</button>
          <button onClick={handelDeleteClick} className='opacity-95 bg-red-400 w-24 h-10 md:w-36 text-neutral-white rounded-lg cursor-pointer hover:opacity-65' >Yes, Delete</button>
        </div>
      </div>
    </div>
  )
}
