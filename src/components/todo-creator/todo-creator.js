import "./todo-creator.css"

export default function FormCreator({ createTodo }) {
    const submitForm = (event) => {
        event.preventDefault()
        createTodo(event.target.title.value)
        event.target.reset()
    }

    return (
        <form className="todo-form" onSubmit={submitForm}>
            <input className="todo-form__title" name="title" type="text" />
            <button className="todo-form__button">Add</button>
        </form>
    )
}