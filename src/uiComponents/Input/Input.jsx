import './Input.scss'
export default function Input({id, label, placeholder, type='text', state, setState}){
    return (
        <div className="form-floating">
            <label htmlFor={id}>{label}</label>
            <input type={type} placeholder={placeholder} onChange={(e) => setState(e.target.value)} value={state} />
        </div>
    )
}