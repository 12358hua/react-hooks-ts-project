import { ACTION_TYPE, IAction, IState, ITodo } from "../components/TodoList/typings";

function todoReducer(state: IState,action:IAction):IState{
    const { type,payload } = action;

    switch(type){
        case ACTION_TYPE.INIT_TODOLIST:
            return{
                ...state,
                todoList: payload as ITodo[]
            }
        case ACTION_TYPE.ADD_TODO:
            return{
                ...state,
                //payload as ITodo 指定为ITodo类型，因为接口里面定义的 | 不指定的话ts就不知道到底是number还是ITodo，就会标红
                todoList: [...state.todoList,payload as ITodo]
            }
        case ACTION_TYPE.REMOVE_TODO:
            // 删除，filter返回不等于需要删除的对象
            return{
                ...state,
                todoList: state.todoList.filter(todo=>todo.id !== payload)
            }
        case ACTION_TYPE.TOGGLE_TODO:
            // 假删除，效果就是给字符串打上横杠
            return{
                ...state,
                todoList: state.todoList.map(todo=>{
                    return todo.id === payload?{
                        ...todo,
                        completed:!todo.completed
                    }:{
                        ...todo
                    }
                })
            }
        default:
            return state;
    }
}

export {
    todoReducer
}