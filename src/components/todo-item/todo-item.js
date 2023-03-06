import "./todo-item.css"

export default function TodoItem({ title, checked, moveItem, deleteItem, updateTitle }) {
    return (
        <li className="todo__item">
            <input className="todo__item__checkbox" onClick={moveItem} type="checkbox" checked={checked} />
            <span className="todo__item__title" contentEditable onBlur={({ target }) => updateTitle(target.textContent)}>{title}</span>
            <button onClick={deleteItem} className="todo__item__button">Delete</button>
        </li>
    )
}