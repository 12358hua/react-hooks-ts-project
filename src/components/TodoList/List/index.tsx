import React, { FC } from "react";
import { ITodo } from "../typings";
import TdItem from "./item";

interface IProps{
    todoList:ITodo[],
    toggleTodo: (id: number) => void,
    removeTodo: (id: number) => void
}

const TdList:FC<IProps> = ({
    todoList,
    toggleTodo,
    removeTodo
})=>{
    return(
        <div className="td-list">
            {
                todoList && todoList.map((todo:ITodo)=>{
                    return(
                        <TdItem
                            key={todo.id} 
                            todo={todo} 
                            removeTodo={removeTodo} 
                            toggleTodo={toggleTodo} 
                        />
                    )
                })
            }
        </div>
    )
}

export default TdList;