
import React, { useRef,FC,ReactElement } from "react";
import { ITodo } from "../typings";

interface IProps{
    addTodo: (todo:ITodo) => void,
    todoList: ITodo[]
}
// 方法上的参数{addTodo,todoList}需要从父组件传过来,如果父组件传过来的参数或方法比较多可以直接写props，使用的时候props.addTodo
const TdInput:FC<IProps> = ({addTodo,todoList}):ReactElement =>{

    const inputRef = useRef<HTMLInputElement>(null);

    const addItem = (): void =>{

        // !符号用在赋值的内容后时，使null和undefined类型可以赋值给其他类型并通过编译
        // trim()方法用于删除字符串头尾空白的字符串 
        const val:string = inputRef.current!.value.trim();

        if(val.length){
            const isExist = todoList.find(todo => todo.content === val);
            if(isExist){
                alert('已存在该项');
                return;
            }

            // 添加
            addTodo({
                id: new Date().getTime(),
                content: val,
                completed: false
            })
            
            // 清空input
            inputRef.current!.value = '';
        }
    }

    return(
        <div className="todo-input">
            <input type="text" placeholder="请输入代办事项" ref={inputRef} />
            <button onClick={addItem}>增加</button>
        </div>
    )
}

export default TdInput;