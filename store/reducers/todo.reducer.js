import { todoService } from '../../services/todo.service.js'

//* Todo
export const SET_TODOS = 'SET_TODOS'
export const SET_DONE_TODOS_PERCENT = 'SET_DONE_TODOS_PERCENT'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    totalTodos: [],
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    sortBy: 'txt',
    doneTodosPercent: 0,
    isLoading: false,

}


export function todoReducer(state = initialState, action) {

    switch (action.type) {

        case SET_TODOS:
            return { ...state, todos: action.todos }
        case ADD_TODO:
            return { ...state, todos: [action.todo, ...state.todos] }
        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(todo => todo._id !== action.todoId) }
        case UPDATE_TODO:
            return { ...state, todos: state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo) }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }
        case SET_DONE_TODOS_PERCENT:
            return { ...state, doneTodosPercent: action.doneTodosPercent }
        case SET_MAX_PAGE:
            return { ...state, maxPage: action.maxPage }
        case SET_IS_LOADING:
            return {
                ...state, isLoading: action.isLoading
            }


        default:
            return state
    }
}
