import { createContext, useReducer } from "react";

export const context = createContext()

const initialState = {
    term: '',
    count: 0,
    groups: [
        {
            gName: 'Backend1',
            id: 0,
            start: '2d 4h',
            finish: '1d 2h',
            src: '/img/photo.png',
            students: [
                {
                    name: 'Doniyor Doniyorov',
                    id: 0,
                    attendance: [
                        {
                            id: 0,
                            rol: 'c'
                        },
                        {
                            id: 1,
                            rol: 'g'
                        },
                        {
                            id: 2,
                            rol: 'w'
                        },
                        {
                            id: 3,
                            rol: 'c'
                        },
                        {
                            id: 4,
                            rol: 'w'
                        },
                        {
                            id: 5,
                            rol: 'g'
                        },
                        {
                            id: 6,
                            rol: 'c'
                        },
                        {
                            id: 7,
                            rol: 'w'
                        },
                        {
                            id: 8,
                            rol: 'g'
                        },
                        {
                            id: 9,
                            rol: ''
                        },
                        {
                            id: 10,
                            rol: ''
                        },
                        {
                            id: 11,
                            rol: ''
                        },
                    ]
                },
                {
                    name: 'Xusan Atamov',
                    id: 1,
                    attendance: [
                        {
                            id: 0,
                            rol: 'c'
                        },
                        {
                            id: 1,
                            rol: 'g'
                        },
                        {
                            id: 2,
                            rol: 'w'
                        },
                        {
                            id: 3,
                            rol: 'c'
                        },
                        {
                            id: 4,
                            rol: 'w'
                        },
                        {
                            id: 5,
                            rol: 'g'
                        },
                        {
                            id: 6,
                            rol: 'c'
                        },
                        {
                            id: 7,
                            rol: 'g'
                        },
                        {
                            id: 8,
                            rol: 'c'
                        },
                        {
                            id: 9,
                            rol: ''
                        },
                        {
                            id: 10,
                            rol: ''
                        },
                        {
                            id: 11,
                            rol: ''
                        },
                    ]
                }
            ],
            workDay: 'Du Se Cho',
            time: '14.00'
        },
        {
            gName: 'Backend1',
            start: '2d 4h',
            finish: '1d 2h',
            src: '/img/photo.png',
            students: [
                {
                    name: 'Husniddin Eganberdiev',
                    id: 0,
                    attendance: [
                        {
                            id: 0,
                            rol: 'c'
                        },
                        {
                            id: 1,
                            rol: 'g'
                        },
                        {
                            id: 2,
                            rol: 'w'
                        },
                        {
                            id: 3,
                            rol: 'c'
                        },
                        {
                            id: 4,
                            rol: 'w'
                        },
                        {
                            id: 5,
                            rol: 'g'
                        },
                        {
                            id: 6,
                            rol: 'c'
                        },
                        {
                            id: 7,
                            rol: 'g'
                        },
                        {
                            id: 8,
                            rol: 'c'
                        },
                        {
                            id: 9,
                            rol: ''
                        },
                        {
                            id: 10,
                            rol: ''
                        },
                        {
                            id: 11,
                            rol: ''
                        },
                    ]
                },
            ],
            id: 1,
            workDay: 'Du Se Cho',
            time: '14.00',

        },
        {
            gName: 'Backend1',
            start: '2d 4h',
            finish: '1d 2h',
            src: '/img/photo.png',
            students: [
                {
                    name: 'Doniyor Doniyorov',
                    id: 0,
                    attendance: [
                        {
                            id: 0,
                            rol: 'c'
                        },
                        {
                            id: 1,
                            rol: 'g'
                        },
                        {
                            id: 2,
                            rol: 'w'
                        },
                        {
                            id: 3,
                            rol: 'c'
                        },
                        {
                            id: 4,
                            rol: 'w'
                        },
                        {
                            id: 5,
                            rol: 'g'
                        },
                        {
                            id: 6,
                            rol: 'c'
                        },
                        {
                            id: 7,
                            rol: 'g'
                        },
                        {
                            id: 8,
                            rol: 'c'
                        },
                        {
                            id: 9,
                            rol: ''
                        },
                        {
                            id: 10,
                            rol: ''
                        },
                        {
                            id: 11,
                            rol: ''
                        },
                    ]
                },
                {
                    name: 'Xusan Atamov',
                    id: 1,
                    attendance: [
                        {
                            id: 0,
                            rol: 'c'
                        },
                        {
                            id: 1,
                            rol: 'g'
                        },
                        {
                            id: 2,
                            rol: 'w'
                        },
                        {
                            id: 3,
                            rol: 'c'
                        },
                        {
                            id: 4,
                            rol: 'w'
                        },
                        {
                            id: 5,
                            rol: 'g'
                        },
                        {
                            id: 6,
                            rol: 'c'
                        },
                        {
                            id: 7,
                            rol: 'g'
                        },
                        {
                            id: 8,
                            rol: 'c'
                        },
                        {
                            id: 9,
                            rol: ''
                        },
                        {
                            id: 10,
                            rol: ''
                        },
                        {
                            id: 11,
                            rol: ''
                        },
                    ]
                }
            ],
            id: 2,
            workDay: 'Du Se Cho',
            time: '14.00'
        },
        {
            gName: 'Backend1',
            start: '2d 4h',
            finish: '1d 2h',
            id: 3,
            src: '/img/photo.png',
            students: [
                {
                    name: 'Doniyor Doniyorov',
                    id: 0,
                    attendance: [
                        {
                            id: 0,
                            rol: 'c'
                        },
                        {
                            id: 1,
                            rol: 'g'
                        },
                        {
                            id: 2,
                            rol: 'w'
                        },
                        {
                            id: 3,
                            rol: 'c'
                        },
                        {
                            id: 4,
                            rol: 'w'
                        },
                        {
                            id: 5,
                            rol: 'g'
                        },
                        {
                            id: 6,
                            rol: 'c'
                        },
                        {
                            id: 7,
                            rol: 'g'
                        },
                        {
                            id: 8,
                            rol: 'c'
                        },
                        {
                            id: 9,
                            rol: ''
                        },
                        {
                            id: 10,
                            rol: ''
                        },
                        {
                            id: 11,
                            rol: ''
                        },
                    ]
                },
                {
                    name: 'Xusan Atamov',
                    id: 1,
                    attendance: [
                        {
                            id: 0,
                            rol: 'c'
                        },
                        {
                            id: 1,
                            rol: 'g'
                        },
                        {
                            id: 2,
                            rol: 'w'
                        },
                        {
                            id: 3,
                            rol: 'c'
                        },
                        {
                            id: 4,
                            rol: 'w'
                        },
                        {
                            id: 5,
                            rol: 'g'
                        },
                        {
                            id: 6,
                            rol: 'c'
                        },
                        {
                            id: 7,
                            rol: 'g'
                        },
                        {
                            id: 8,
                            rol: 'c'
                        },
                        {
                            id: 9,
                            rol: ''
                        },
                        {
                            id: 10,
                            rol: ''
                        },
                        {
                            id: 11,
                            rol: ''
                        },
                    ]
                }
            ],
            workDay: 'Du Se Cho',
            time: '14.00'
        },
        {
            id: 4,
            gName: 'Backend1',
            start: '2d 4h',
            finish: '1d 2h',
            src: '/img/photo.png',
            students: [
                {
                    name: 'Doniyor Doniyorov',
                    id: 0,
                    attendance: [
                        {
                            id: 0,
                            rol: 'c'
                        },
                        {
                            id: 1,
                            rol: 'g'
                        },
                        {
                            id: 2,
                            rol: 'w'
                        },
                        {
                            id: 3,
                            rol: 'c'
                        },
                        {
                            id: 4,
                            rol: 'w'
                        },
                        {
                            id: 5,
                            rol: 'g'
                        },
                        {
                            id: 6,
                            rol: 'c'
                        },
                        {
                            id: 7,
                            rol: 'g'
                        },
                        {
                            id: 8,
                            rol: 'c'
                        },
                        {
                            id: 9,
                            rol: ''
                        },
                        {
                            id: 10,
                            rol: ''
                        },
                        {
                            id: 11,
                            rol: ''
                        },
                    ]
                },
                {
                    name: 'Xusan Atamov',
                    id: 1,
                    attendance: [
                        {
                            id: 0,
                            rol: 'c'
                        },
                        {
                            id: 1,
                            rol: 'g'
                        },
                        {
                            id: 2,
                            rol: 'w'
                        },
                        {
                            id: 3,
                            rol: 'c'
                        },
                        {
                            id: 4,
                            rol: 'w'
                        },
                        {
                            id: 5,
                            rol: 'g'
                        },
                        {
                            id: 6,
                            rol: 'c'
                        },
                        {
                            id: 7,
                            rol: 'g'
                        },
                        {
                            id: 8,
                            rol: 'c'
                        },
                        {
                            id: 9,
                            rol: ''
                        },
                        {
                            id: 10,
                            rol: ''
                        },
                        {
                            id: 11,
                            rol: ''
                        },
                    ]
                }
            ],
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
            salary: 500,
        },
    ],
    mentor: {
        name: 'Doniyor',
        surname: 'Doniyorov',
        pays: [
            {
                month: 'April',
                salary: '1.200.000',
            },
            {
                month: 'May',
                salary: '1.500.000',
            },
            {
                month: 'June',
                salary: '1.500.000',
            },
            {
                month: 'July',
                salary: '1.500.000',
            },
        ],
        students: [
            {
                name: 'Husan',
                surname: 'Atamov',
                phone: '+998905234225',
                come: 10,
                notCome: 2,
                withReason: 5,
            },
            {
                name: 'Husniddin',
                surname: 'Eganberdiev',
                phone: '+998915234225',
                come: 10,
                notCome: 2,
                withReason: 5,
            },
        ]
    },
    profile: {},
    users: null,
    selectedTeachs: [],
    isLoading: false,
    user: null
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
        case "user/login":
            return { ...state, user: payload }
        case "attendance":
            const foundStudents = state.groups.find(c => c.id === payload)
            return { ...state, users: foundStudents }
        case "updateAttendance":
            const [id1, id2, id3, rol] = payload;
            const lookingForGroup = state.groups.find(c => c.id === id1)
            const lookingForStudent = lookingForGroup.students.find(c => c.id === id2)
            const lookingForAttendance = lookingForStudent.attendance.find(c => c.id === id3);
            lookingForAttendance.rol = rol;
            return {...state}
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

