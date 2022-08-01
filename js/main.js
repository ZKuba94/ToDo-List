const taskInput = document.querySelector('.task-input')
const addBtn = document.querySelector('.add-btn')
const errorOne = document.querySelector('.error-1')
const errorTwo = document.querySelector('.error-2')
const tasksList = document.querySelector('.tasks')
const editTask = document.querySelector('.edit-task')
const errorThree = document.querySelector('.error-3')
const editInput = document.querySelector('.edit-input')
const save = document.querySelector('.btn-save')
const cancel = document.querySelector('.btn-cancel')
const colorsPanel = document.querySelector('.colors-picker')
const colorsBtn = document.querySelector('.fa-paint-brush')
const colorOne = document.querySelector('.color-one, .color-one::after')
const colorTwo = document.querySelector('.color-two, .color-two::after')
let root = document.documentElement
let editedTodo
let oldTodo
let newTodo
let idNumber = 0

const checkInput = () => {
	if (taskInput.value !== '') {
		createNewTodo()
		errorOne.style.display = 'none'
	} else {
		errorOne.style.display = 'block'
	}
}

const createNewTodo = () => {
	idNumber++
	newTodo = document.createElement('li')
	newTodo.classList.add('task')
	newTodo.setAttribute('id', `todo-${idNumber}`)
	newTodo.innerHTML = `
	<span class="text">${taskInput.value}</span><div class="icons"><i class="fa fa-check" aria-hidden="true"></i><span class="edit">EDIT</span><i
	class="fa fa-times" aria-hidden="true"></i></div>
	`
	tasksList.appendChild(newTodo)
	taskInput.value = ''
	errorTwo.style.display = 'none'
}

const checkTask = e => {
	if (e.target.matches('.fa-check')) {
		e.target.classList.toggle('checked-icon')
		e.target.parentElement.previousElementSibling.classList.toggle('checked')
	} else if (e.target.matches('.edit')) {
		errorThree.style.visibility = 'hidden'
		editTask.style.display = 'flex'
		oldTodo = e.target.closest('li').id
		editedTodo = document.getElementById(oldTodo)
		editInput.value = editedTodo.childNodes[1].innerText
	} else if (e.target.matches('.fa-times')) {
		e.target.closest('li').remove()
		checkList()
	}
}

const changeTodo = e => {
	if (editInput.value !== '') {
		editedTodo.childNodes[1].innerText = editInput.value
		editTask.style.display = 'none'
		errorThree.style.visibility = 'hidden'
	} else {
		errorThree.style.visibility = 'visible'
	}
}
const cancelEdit = e => {
	errorThree.style.visibility = 'hidden'
	editTask.style.display = 'none'
}
const checkList = () => {
	if (tasksList.children.length !== 0) {
	} else {
		errorTwo.style.display = 'block'
	}
}
const enterCheck = () => {
	if (event.key === 'Enter') {
		checkInput()
	}
}
checkList()
taskInput.addEventListener('keyup', enterCheck)
addBtn.addEventListener('click', checkInput)
tasksList.addEventListener('click', checkTask)
save.addEventListener('click', changeTodo)
cancel.addEventListener('click', cancelEdit)
root.style.setProperty('--first-color', '#a40606')

colorOne.addEventListener('click', () => {
	root.style.setProperty('--first-color', '#a40606')
	root.style.setProperty('--second-color', 'rgba(89, 181, 252, 1)')
	root.style.setProperty('--linear-first', 'linear-gradient(315deg, #a40606 0%, #d98324 74%)')
	colorsPanel.style.opacity = '0'
	colorsBtn.style.color = '#fff'
})
colorTwo.addEventListener('click', () => {
	root.style.setProperty('--first-color', '#16a085')
	root.style.setProperty('--second-color', '#f4d03f')
	root.style.setProperty('--linear-first', 'linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)')
	colorsPanel.style.opacity = '0'
	colorsBtn.style.color = '#fff'
})
colorsBtn.addEventListener('click', () => {
	if (colorsPanel.style.opacity !== '1') {
		colorsPanel.style.opacity = '1'
		colorsBtn.style.color = 'var(--first-color, $first-color)'
	} else {
		colorsPanel.style.opacity = '0'
		colorsBtn.style.color = '#fff'
	}
	setTimeout(() => {
		colorsPanel.style.opacity = '0'
		colorsBtn.style.color = '#fff'
	}, 5000)
})
