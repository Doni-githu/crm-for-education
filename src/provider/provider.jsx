import { createContext, useReducer } from "react";

export const context = createContext()

const initialState = {
    term: '',
    count: 0,
    groups: [
        {
            gName: 'Backend1',
            start: '2d 4h',
            finish: '1d 2h',
            src: '/img/photo.png',
            students: 10,
            workDay: 'Du Se Cho',
            time: '14.00'
        },
        {
            gName: 'Backend1',
            start: '2d 4h',
            finish: '1d 2h',
            src: '/img/photo.png',
            students: 10,
            workDay: 'Du Se Cho',
            time: '14.00'
        },
        {
            gName: 'Backend1',
            start: '2d 4h',
            finish: '1d 2h',
            src: '/img/photo.png',
            students: 10,
            workDay: 'Du Se Cho',
            time: '14.00'
        },
        {
            gName: 'Backend1',
            start: '2d 4h',
            finish: '1d 2h',
            src: '/img/photo.png',
            students: 10,
            workDay: 'Du Se Cho',
            time: '14.00'
        },
        {
            gName: 'Backend1',
            start: '2d 4h',
            finish: '1d 2h',
            src: '/img/photo.png',
            students: 10,
            workDay: 'Du Se Cho',
            time: '14.00'
        },
    ],
    salary: [
        {
            name: 'Diyorbek',
            surname: 'Safarov',
            groups: 2,
            students: 12,
            salary: 400,
            selected: false,
            id: 0
        },
        {
            id: 1,
            name: 'Diyorbek',
            surname: 'Safarov',
            groups: 2,
            students: 12,
            salary: 400,
            selected: false
        },
        {
            id: 2,
            name: 'Doniyor',
            surname: 'Doniyorov',
            groups: 2,
            students: 12,
            selected: true,
            salary: 500
        },
    ],
    users: [
        {
            id: 0,
            name: 'Doniyor Doniyorov'
        },
        {
            id: 1,
            name: 'Husan Atamov'
        }
    ],
    selectedTeachs: []
}

export function reducer(state = initialState, { type, payload }) {
    switch (type) {

        case 'term_update':
            return { ...state, term: payload }
        case 'selected':
            let newData = []
            for (let i = 0; i < state.salary.length; i++) {
                const element = state.salary[i];
                if (i === payload) {
                    element.selected = !element.selected
                }
                newData.push(element)
            }
            return { ...state, salary: newData }
        default:
            return state
    }
}


export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            <context.Provider value={{ state, dispatch }}>
                {children}
            </context.Provider>
        </>
    )
}

