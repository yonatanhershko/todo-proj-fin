const { useEffect, useState } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { loadTodos, removeTodo, saveTodo } from '../store/actions/todo.actions.js'
import { changeBalance } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { TodoSort } from '../cmps/TodoSort.jsx'
import { todoService } from '../services/todo.service.js'
import { PaginationBtns } from "../cmps/PaginationBtns.jsx"
import { SET_FILTER_BY } from "../store/reducers/todo.reducer.js"

export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)

    
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
    const filterBy = useSelector((storeState) => storeState.todoModule.filterBy)
    const maxPage = useSelector((storeState) => storeState.todoModule.maxPage)
    const dispatch = useDispatch()

    useEffect(() => {
        setFilterSort({ ...defaultFilter })
    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(() => {
                showErrorMsg('Could not load todos')
            })

    }, [filterBy])

    function onRemoveTodo(todoId) {
        const ans = confirm('Do you want to delete this todo?')
        if (!ans) return
        removeTodo(todoId)
            .then(() => {
                console.log('removed todo ' + todoId);
                showSuccessMsg(`Removed todo with ${todoId} id successfully`)
            })
            .catch(() => showErrorMsg('Had trouble removing the todo'))
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then(() => {
                showSuccessMsg(`Updated ${todoToSave.txt} successfully`)
                if (todoToSave.isDone) {
                   return changeBalance(10)
                }
            })
            .catch(() => showErrorMsg('Had trouble updating the todo'))
    }

    function setFilterSort(filterBy) {
        const action = {
            type: SET_FILTER_BY,
            filterBy,
        }
        dispatch(action)
    }

    function onChangePageIdx(diff) {
        let newPageIdx = +filterBy.pageIdx + diff
        if (newPageIdx < 0) newPageIdx = maxPage - 1
        if (newPageIdx >= maxPage) newPageIdx = 0
        setFilterSort({ ...filterBy, pageIdx: newPageIdx, })
    }

    return (
        <section className="todo-index">
            <TodoFilter filterBy={defaultFilter} onSetFilterBy={setFilterSort} />
            <TodoSort filterBy={defaultFilter} onSetFilterBy={setFilterSort} />

            <Link to="/todo/edit" className="add-todo-btn btn" >Add Todo</Link>
            <h2>Todos List</h2>
            <PaginationBtns filterSortBy={filterBy} onChangePageIdx={onChangePageIdx} />
            {!isLoading ?
                <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
                : <div>Loading...</div>
            }

        </section>
    )
}