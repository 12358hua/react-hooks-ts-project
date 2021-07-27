import React, { FC, ReactElement, useCallback, useEffect, useReducer, useState } from "react";
import { todoReducer } from "../../redux";
import TdInput from "./Inputs";
import TdList from "./List";
import { ITodo,IState, ACTION_TYPE } from "./typings";

const initialState:IState = {
    todoList:[]
}

function init(initTodoList: ITodo[]):IState{
    return {
        todoList: initTodoList
    }
}

const TodoList:FC = ():ReactElement =>{

    const [todoList,setTodoList] = useState<ITodo[]>([]);

    // const [ state, dispatch] = useReducer(todoReducer,initialState)
    // 惰性初始化的写法
    const [ state, dispatch] = useReducer(todoReducer,[],init)

    // 这个useEffect是为了处理刷新后数据丢失的问题
    useEffect(()=>{
        console.log(state.todoList)
        const list = localStorage.getItem('todoList' || '[]');
        if(list){
            const todoLists = JSON.parse(list);
            dispatch({
                type: ACTION_TYPE.INIT_TODOLIST,
                payload: todoLists
            })
        }
    },[])

    // useEffect 的第二个参数当state.todoList发生变化时并且不等于上一次的值就会执行一次useEffect,空数组就只执行一次
    useEffect(()=>{
       localStorage.setItem('todoList',JSON.stringify(state.todoList))
    },[state.todoList])

    // 添加，外面包一层useCallback，否则子组件同步更新会出问题
    const addTodo = useCallback((todo:ITodo) => {
        // ...todoList 原来的值，todo添加的新对象
        // setTodoList(todoList => [...todoList,todo]);
        dispatch({
            type:ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    },[])

    // 删除
    const removeTodo = useCallback((id:number)=>{
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO,
            payload: id
        })
    },[])

    // 假删除
    const toggleTodo = useCallback((id:number)=>{
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })
    },[])

    return(
        <div className="todo-list">
            <TdInput 
                addTodo={addTodo}
                todoList={state.todoList}
            />
            <TdList
                todoList={state.todoList}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
        </div>
    )
}

export default TodoList;