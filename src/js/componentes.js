

//Referencias en HTML

import { todoList } from "..";
import { Todo } from "../classes";

import {TodoList} from '../classes/index'

const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulfilter      = document.querySelector('.filters');
const anchorFiltro = document.querySelectorAll('.filtro');
export const crearTodoHtml = (todo) => {

    const HtmlTodo = `
    <li class="${ (todo.completado ? 'completed': '')}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado ? 'checked': '')} >
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> 
    `;

    const div = document.createElement('div');
    div.innerHTML = HtmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}



//Eventos

txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && txtInput.value.length > 0 ){
        const newTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(newTodo);

        crearTodoHtml(newTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const TodoElemento = event.target.parentElement.parentElement;
    const TodoId = TodoElemento.getAttribute('data-id');
 
    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(TodoId);
        TodoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(TodoId);
        divTodoList.removeChild(TodoElemento);
    }
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i>= 0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});


ulfilter.addEventListener('click', (event) => {

    const filtro = event.target.text; 
    if(!filtro){return};

    anchorFiltro.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children){
       elemento.classList.remove('hidden');
       const completado = elemento.classList.contains('completed');
       switch(filtro){
           case 'Pendientes':
                if(completado ){
                    elemento.classList.add('hidden');
                };
            break
            case 'Completados':
                if(!completado ){
                    elemento.classList.add('hidden');
                };
            break
       }
    }
});