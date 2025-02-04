"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Task } from '../pages/types'
import { deleteTodo, editTodo } from '../pages/api';
import { useRouter } from "next/navigation";

interface TodoProps {
    todo: Task;
}

const Todo = ({todo}:TodoProps) => {
    const router = useRouter();

    const ref = useRef<HTMLInputElement>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [editedTaskTitle, setEditedTaskTitle] = useState(todo.text)

    useEffect(() => {
        if(isEditing) {
            ref.current?.focus()
        }
    },[isEditing])

    const handleEdit = async () => {
        setIsEditing(true)
    }

    const handleSave = async () => {
        const updatedTodo = await editTodo(todo.id,editedTaskTitle);
        console.log(updatedTodo)
        setIsEditing(false)
        // router.refresh();
    }

    const handleDelete = async () => {
        await deleteTodo(todo.id)
        // router.refresh();

    }

  return (
    <li
        key={todo.id}
        className='flex justify-between p-4 bg-white border-l-4 border-blue-500 rouded shadow'>
    
        {isEditing ? (
            <input 
            ref={ref}
            type="text" 
            className='mr-2py-1 px-2 rouded border-gray-400'
            value={editedTaskTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskTitle(e.currentTarget.value)} />
            ) : (
            <span>{editedTaskTitle}</span>
            )
        }

        <div>
            {isEditing ? (<button className='text-blue-500 mr-3' onClick={handleSave}>save</button>
            )　:　(<button className='text-green-500 mr-3' onClick={handleEdit}>edit</button>
            )
            }
            <button className='text-red-500' onClick={handleDelete}>Delete</button>
        </div>
    </li>
)
}

export default Todo
