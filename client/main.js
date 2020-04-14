var root = document.getElementById('root');
// var todos;
const url = 'http://localhost:8000/api/todos/';
const deleteBtn = (id) => {
	return `<button class='deleteBtn' onClick='deleteTodo(${id})'>Delete</button>`;
};

class Todo {
	constructor(name, completed) {
		this.name = name;
		this.completed = completed;
	}
}

class UI {
	static async displayTodos() {
		const todos = await Store.getTodos();
		// console.log(todos);
		todos.forEach((todo) => UI.addTodoToList(todo));
	}

	static addTodoToList(todo) {
		const list = document.querySelector('#root');

		const row = document.createElement('li');
		const row_class = document.createAttribute('class');
		const row_id = document.createAttribute('id');

		row_class.value = 'card';
		row_id.value = todo.id;
		row.setAttributeNode(row_class);
		row.setAttributeNode(row_id);
		row.innerHTML = `
			${todo.name}<a href="#" class="delete" >X</a>
		`;

		list.appendChild(row);
	}

	static deleteTodo(el) {
		if (el.classList.contains('delete')) {
			el.parentElement.remove();
		}
	}

	static clearFields() {
		document.querySelector('#todo_name').value = '';
	}
}

class Store {
	static async getTodos() {
		let todos;
		let res = await fetch(url);
		todos = await res.json();

		// console.log(todos);

		return todos;
	}

	static async addTodo(todo) {
		// var value = name.value;

		const todo_obj = {
			name: todo.name,
			completed: todo.completed
		};

		const todos = await Store.getTodos();

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(todo)
		});
		if (res.ok) {
			const data = await res.json();
			todos.push(data);
		}
	}

	static async removeTodo(id) {
		const todos = await Store.getTodos();

		todos.forEach((todo, index) => {
			if (todo.id === id) {
				todos.splice(index, 1);
			}
		});
		await fetch(url + `${id}`, { method: 'delete' });
	}
}

document.addEventListener('DOMContentLoaded', UI.displayTodos);

// Event: Remove a Book
document.querySelector('#root').addEventListener('click', (e) => {
	// Remove book from UI
	UI.deleteTodo(e.target);

	// Remove book from store
	Store.removeTodo(e.target.parentElement.id);

	// Show success message
	// UI.showAlert('Book Removed', 'success');
});

document.querySelector('#todo-form').addEventListener('submit', (e) => {
	e.preventDefault();

	const name = document.querySelector('#todo_name').value;
	const completed = false;

	if (name === '') {
		console.log('Please fill in name');
	} else {
		const todo = new Todo(name, completed);

		UI.addTodoToList(todo);

		console.log(`${todo.name}`);

		Store.addTodo(todo);

		UI.clearFields();
	}
});

async function getTodos() {
	const headers = {
		method: 'GET',
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	root.innerHTML = '';
	// const res = await fetch('http://localhost:8000/api/todos/', {mode: 'no-cors'});
	// const res =
	//   console.log((await res).json());
	// const data = await res.json();
	// return data;
	// const data = await res.json();
	// console.log(res.json());
	todos = await res.json();

	for (var i = 0; i < todos.length; i++) {
		root.innerHTML += `<li>${todos[i].name}<input type="checkbox" /> ${deleteBtn(todos[i].id, i)} </li>`;
	}
}

async function deleteTodo(id, array_id) {
	// for( var i = 0; i < todos.length; i++){ if ( i === array_id) { todos.splice(i, 1); }}
	todos.splice(array_id - 1, array_id - 1);
	updateTodo(todos);
	console.log(todos);
	// getTodos();
	// console.log(id);
}

async function addTodo() {
	const name = document.getElementById('todo_name');
	// console.log(name.value);
	var value = name.value;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name: value })
	});

	console.log(res);
	const data = await res.json();

	if (res.ok) {
		name.setAttribute('value', '');
		console.log('clear');
		todos.push(data);
		// getTodos();
		console.log(todos);
		const count = todos.length - 1;
		root.innerHTML += `<li>${todos[count].name}<input type="checkbox" /> ${deleteBtn(todos[count].id)} </li>`;
	}
	// value = '';
	// console.log(data);
}

function updateTodo(Todos) {
	document.getElementById('root').innerHTML = '';
	for (var i = 0; i < Todos.length; i++) {
		root.innerHTML += `<li>${Todos[i].name}<input type="checkbox" /> ${deleteBtn(Todos[i].id, i)} </li>`;
	}
}
