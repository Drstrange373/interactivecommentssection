import { useContext } from "react";
import { DeleteModalContext } from "../context/DeleteModalContextProvider";

export default function useDeleteModal(){
    const {setVisible, setOnDeleteClick} = useContext(DeleteModalContext)!

    return (onDeleteClick:()=>void)=>{
        setVisible(true)
        setOnDeleteClick(()=>onDeleteClick)
    }
}