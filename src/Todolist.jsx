import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


import "./TodoList.css"


export default function TodoList() {

    let [todo, setTodo] = useState(
        [
            {
                task: "Code",
                id: uuidv4(),
                isDone: false
            }
        ]
    );

    let [newTodo, setNewTodo] = useState("");

    function addTask() {
        setTodo((prevTodo) => {
            return [...prevTodo, { task: newTodo, id: uuidv4(), isDone: false }]
        })

        setNewTodo("");
    }


    let inputHandler = (event) => {
        setNewTodo(event.target.value);
    }

    function deleteTask(id) {
        setTodo((prevTodo) => prevTodo.filter((el) => id != el.id))
    }

    function markAsDone(id) {
        console.log("done");

        setTodo((prevTodo) =>
            prevTodo.map((el) => {
                if (el.id == id) {
                    return {

                        ...el, isDone: true
                    }

                } else {
                    return { ...el }
                }

            }
            )
        )

    }



    function removeAll() {
        console.log("d");
        setTodo([]);

    }


    return (

        <div >

            <h1 style={{ color: "white", textAlign: "center" }} >Make today's todo list</h1>
            {
                function colorChange(color, delay) {
                    setInterval(() => { document.querySelector("h1").style.color = color }, delay)
                }

            }


            <div className="box">
                <TextField
                    id="filled-basic"
                    label="Write your task"
                    variant="filled"
                    onChange={inputHandler}
                    value={newTodo}
                    className='inp'
                />

                <button className="addBtn" variant="contained" onClick={addTask} >ADD</button>


                <br></br>
                <br></br>
                <div className="todoBox" >
                    <ol>
                        {
                            todo.map((el) => {
                                return <li {...el.isDone && { style: { fontWeight: "bolder", color: "green" } }} key={el.id}>


                                    {el.task}
                                    &nbsp;&nbsp;
                                    &nbsp;&nbsp;
                                    <Button onClick={() => markAsDone(el.id)}>{el.isDone ? < CheckCircleIcon /> : <CheckCircleOutlineIcon />}</Button>
                                    <Button style={{ borderRadius: "100px", border: "2px solid black" }} variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deleteTask(el.id)}>Remove</Button>

                                    <br></br><br></br>
                                </li>;
                            })
                        }
                    </ol>
                </div>


                <Button style={{ borderRadius: "100px", border: "2px solid black" }} variant="contained" color="error" onClick={removeAll}> Remove All Tasks</Button>
            </div>



        </div >
    )
}