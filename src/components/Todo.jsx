import { useState, useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import { CiSaveUp2 } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";

export default function TodoList() {
	const [todos, setTodos] = useState([]);

	const addTodo = (todo) => {
		if (todos.length < 6) {
			setTodos((prev) => [...prev, { text: todo, completed: false }]);
		} else {
			alert("Pas plus de 6 tâches! C'est déjà pas mal ;)");
		}
	};

	const editTodo = (index, newText) => {
		setTodos((prev) => {
			const newTodos = [...prev];
			newTodos[index] = { ...newTodos[index], text: newText };
			return newTodos;
		});
	};

	const toggleTodo = (index) => {
		setTodos((prev) => {
			const newTodos = [...prev];
			newTodos[index] = {
				...newTodos[index],
				completed: !newTodos[index].completed,
			};
			return newTodos;
		});
	};

	const deleteTodo = (index) => {
		setTodos((prev) => prev.filter((_, y) => index !== y));
	};

	return (
		<>
			<div className="container-form">
				<div className="Header-wrapper">
					<h1>What's need to be done ?</h1>
				</div>

				<div className="Form-wrapper">
					<div className="doing-done">
						<button type="button" className="button-todo">
							<p>To Do</p>
						</button>
						<button type="button" className="button-done">
							<p>Terminé</p>
						</button>
					</div>

					<Form addTodo={addTodo} />

					<div className="todo-list">
						{todos.map((todo, index) => (
							<Todo
								key={index}
								text={todo.text}
								completed={todo.completed}
								onEdit={(newText) => editTodo(index, newText)}
								onToggle={() => toggleTodo(index)}
								onDelete={() => deleteTodo(index)}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

const Form = ({ addTodo }) => {
	const onSubmit = (event) => {
		event.preventDefault();
		const todoText = event.currentTarget.elements.todo.value;
		addTodo(todoText);
		event.currentTarget.reset();
	};

	const handleKeyDown = (event) => {
		if (
			event.key === "Enter" &&
			event.currentTarget.elements.todo.value.trim() !== ""
		) {
			event.preventDefault();
			onSubmit(event);
		}
	};

	return (
		<form className="form-wrapper" onSubmit={onSubmit}>
			<input
				id="todo"
				className="input"
				type="text"
				required
				placeholder="+ Add a task and press Enter"
				onKeyDown={handleKeyDown}
				autocomplete="off"
			/>
		</form>
	);
};
const Todo = ({ text, completed, onEdit, onToggle, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState(text);

	const handleEdit = () => {
		setIsEditing(true);
		setEditedText(text);
	};

	const handleSave = () => {
		onEdit(editedText);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedText(text);
	};

	const [isImportant, setIsImportant] = useState(false);
	const handleToggleImportant = () => {
		setIsImportant(!isImportant);
	};

	// const handleKeyDown = (event) => {
	// 	if (
	// 		event.key === "Enter" &&
	// 		event.currentTarget.elements.todo.value.trim() !== ""
	// 	) {
	// 		event.preventDefault();
	// 		onSubmit(event);
	// 	}
	// };
	return (
		<div className={`Todo-wrapper ${completed ? "completed" : ""}`}>
			<Checkbox checked={completed} onChange={onToggle} />
			{!isEditing ? (
				<>
					<label className="todo-text">{text}</label>
					<button
						className={`todo-important ${isImportant ? "important" : ""}`}
						onClick={handleToggleImportant}
					>
						<FaRegStar size={25} />
					</button>

					<button onClick={handleEdit} className="todo-edit">
						<TiEdit size={25} />
					</button>
				</>
			) : (
				<>
					<input
						className="input-edit"
						type="text"
						value={editedText}
						onChange={(e) => setEditedText(e.target.value)}
						// onKeyDown={handleKeyDown}
					/>
					<button onClick={handleSave} className="save">
						<CiSaveUp2 size={25} />
					</button>
					<button onClick={handleCancel} className="cancel">
						<MdCancel size={25} />
					</button>
				</>
			)}
			{!isEditing && (
				<button onClick={onDelete} className="todo-delete">
					<svg
						className="svg-trash"
						viewBox="0 0 25 20"
						fill="currentColor"
						height="1.8em"
						width="1.8em"
					>
						<path d="M6 7H5v13a2 2 0 002 2h10a2 2 0 002-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z" />
					</svg>
				</button>
			)}
		</div>
	);
};

const Checkbox = ({ checked, onChange }) => {
	return (
		<div className="checkbox">
			<input type="checkbox" checked={checked} onChange={onChange} />

			{checked && (
				<svg
					className="svg-icon"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
				>
					<path d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z" />
				</svg>
			)}
		</div>
	);
};
