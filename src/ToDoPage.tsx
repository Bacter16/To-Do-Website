import React, { useEffect, useState } from 'react';
import './ToDoPage.css';
import { PiCheckSquareLight } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { useParams } from 'react-router-dom';


const ToDoPage: React.FC = () => {

    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([]);
    const { token } = useParams();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const fetchTodos = async () => {
        try {
            const response = await fetch('https://localhost:7264/api/todos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }

            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        fetchTodos();

    }, [token]);

    const handleAddTaskButtonClick = async () => {
        try {
            if (!title) {
                return;
            }

            const newTaskData = {
                title: title,
                description: '',
            };

            const response = await fetch('https://localhost:7264/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newTaskData)
            });

            if (!response.ok) {
                throw new Error('Failed to add new task');
            }

            console.log('New task added successfully');
            setTitle('');
            fetchTodos();
        } catch (error) {
            console.error('Error adding new task:', error);
        }
    };

    const handleCheckClick = async (taskId: string) => {
        try {
            const response = await fetch(`https://localhost:7264/api/todos/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            console.log('Task deleted successfully');

            fetchTodos();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleDeleteClick = async (taskId: string) => {
        try {
            const response = await fetch(`https://localhost:7264/api/todos/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            console.log('Task deleted successfully');

            fetchTodos();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };


    return <div className='the-page'>
        <div className='header'>
            <h1>ToDo List</h1>
        </div>
        <div className='add-task'>
            <input className='input' value={title} onChange={handleTitleChange} type="text" placeholder="Add a new task" />
            <button className='button' onClick={handleAddTaskButtonClick}>Add taks</button>
        </div>
        <ul className="task-list">
            {todos.map((todo: any) => (
                <li className='task' key={todo.id}>
                    <p>{todo.title}</p>
                    <p>{todo.description}</p>
                    <div style={{ fontSize: "2rem" }} onClick={() => handleCheckClick(todo.id)}><PiCheckSquareLight /></div>
                    <div style={{ fontSize: "2rem" }} onClick={() => handleDeleteClick(todo.id)}><MdDeleteForever /></div>
                </li>
            ))}
        </ul>
    </div>
};

export default ToDoPage;