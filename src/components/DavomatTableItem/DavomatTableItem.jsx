import React, { useContext, useState } from 'react'
import { context } from '../../provider/provider'

const DavomatTableItem = ({ item, change, item2 }) => {
    const { state } = useContext(context)
    const [isShow, setShow] = useState(false)
    const changeVisiblity = (event) => {
        if (event.target.className.split(' ').includes('table-button')) {
            setShow(!isShow)
        }
    }
    const changeHandler = (what) => {
        change(state.users.id, item.id, item2, what)
        setShow(false)
    }
    return (
        <button onClick={changeVisiblity} className={`table-button ${item2.keldi}`}>
            {state.role === "AD" && isShow ? <>
                <ul className={`hover-paginate ` + (isShow ? 'active' : '')}>
                    <li onClick={() => changeHandler('c')}>Qanshadi</li>
                    <li onClick={() => changeHandler('g')}>Qanshamadi</li>
                    <li onClick={() => changeHandler('w')}>Sababli</li>
                </ul>
            </> : null}
        </button>
    )
}

export default DavomatTableItem