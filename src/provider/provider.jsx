import { createContext, useReducer } from "react";

export const context = createContext()

const initialState = {
    term: '',
    count: 0,
    groups: [],
    salary: [],
    mentor: {},
    profile: null,
    users: {},
    selectedTeachs: [],
    isLoading: false,
    user: null,
    role: null,
    studentProfile: null,
    lookingRole: null
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
        case "startlogin":
            return { ...state, isLoading: true }
        case "user/login":
            return { ...state, user: payload.user, role: payload.role, isLoading: false }
        case "attendance":
            return { ...state, users: payload }
        case "updateAttendance":
            const [id1, id2, id3, keldi] = payload;
            const lookingForStudent = state.users.students.find(c => c.id === id2)
            const lookingForAttendance = lookingForStudent.davomat.find(c => c.id === id3);
            lookingForAttendance.keldi = keldi;
            return { ...state }
        case "getMentor":
            return { ...state, mentor: payload }
        case "logout":
            return { ...state, user: null, role: null }
        case "getProfile":
            return { ...state, profile: payload }
        case "studentProfile":
            return { ...state, studentProfile: payload }
        case "startLook":
            return { ...state, lookingRole: payload }
        case "upDataSomeThing":
            const [post, id] = payload
            const students = state.users.students.map(item => {
                if(item.id === id){
                    return {
                        ...item,
                        davomat: [
                            ...item.davomat,
                            post
                        ]
                    }
                }
                return item
            })
            return { ...state, users: { ...state.users, students } }
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

