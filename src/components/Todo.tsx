"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"




const Todo = () => {

    type TodoItemType = {
        title: string;
        isCompleted: boolean;
        id: string;
    }


    const [todos, setTodos] = useState<TodoItemType[]>([])
    const [title, setTitle] = useState<TodoItemType["title"]>("")

    const completeHandler = (id: TodoItemType["id"]): void => {
        const newTodos: TodoItemType[] = todos.map((i) => {
            if (i.id === id) i.isCompleted = !i.isCompleted;
            return i;
        })

        setTodos(newTodos);
    }
    const deleteHandler = (id: TodoItemType["id"]): void => {
        const newTodos: TodoItemType[] = todos.filter((i) => i.id !== id);
        setTodos(newTodos);
    }

    const todoHandler = (): void => {
        const newTodo: TodoItemType = {
            title: title,
            isCompleted: false,
            id: String(Math.random() * 1000)
        };
        setTodos(prev => ([...prev, newTodo]))
        setTitle("")
    }

    return (
        <div>
            <div className="header">
                <p className='text-2xl text-center'>Todo App</p>
            </div>
            <div className="todo-input flex items-center justify-center my-4">
                <Input type="text" placeholder="Type Here..." className='w-96 mr-5' value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => {
                    if (e.key === "Enter" && title !== "") todoHandler();
                }} />
                <Button variant="outline" onClick={todoHandler} disabled={title === ""}>Add Task</Button>
            </div>
            <div className="todo-list container">
                <Table>
                    {todos.length < 1 && <TableCaption>No Todos Added</TableCaption>}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">#</TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead>Completion Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todos.map((i, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{i.title}</TableCell>
                                <TableCell><Checkbox checked={i.isCompleted} onCheckedChange={() => completeHandler(i.id)} /></TableCell>
                                <TableCell className="flex justify-end"><img width="50" height="50" src="https://img.icons8.com/plasticine/50/filled-trash.png" alt="filled-trash" className='cursor-pointer' onClick={() => deleteHandler(i.id)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Todo