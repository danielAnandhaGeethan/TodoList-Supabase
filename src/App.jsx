import { useState,useEffect } from 'react'
import './App.css'
import React from 'react';
import supabase from "./supabase-client.js";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  })

  const addTodo = async () => {
    const todoData = {
      name: newTodo,
      isCompleted: false
    }
    const {data, error} = await supabase.from("TodoList").insert([todoData]).single();
  
    if(error){
      console.log("Error Adding Data: ", error);
    } else {
      setTodoList((prev) => [...prev, newTodo]);
    }
    setNewTodo("");
  }

  const fetchTodos = async () => {
    const {data, error} = await supabase.from("TodoList").select("*");

    if(error){
      console.log("Error Fetching Data: ", error);
    } else {
      console.log("Fetched Data: ", data);
      setTodoList(data);
    }
  }

  const toggleTaskComplete = async (id, isCompleted) => {
    const {data, error} = await supabase.from("TodoList").update({isCompleted: !isCompleted}).eq("id", id);

    if(error){
      console.log("Error Updating Data: ", error);
    } else {
      const updatedTodoList = todoList.map((todo) => todo.id !== id ? todo : {...todo, isCompleted: !isCompleted});
      setTodoList(updatedTodoList);
    }
  }

  const deleteTodo = async (id) => {
    const {data, error} = await supabase.from("TodoList").delete().eq("id", id);
  
    if(error){
      console.log("Error Deleting data: ", error);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  }

  return (
    <div class="bg-[#183763] w-screen h-screen flex flex-col items-center">
      <div>
        <h1 class="text-white font-bold text-6xl mt-20 mb-20">Todo List</h1>
      </div>
    
      <div class="flex justify-between w-80 mb-24">
        <input type="text" placeholder="New Todo Item..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} class="onfocus: outline-none text-white border border-gray-600 px-2 py-1 rounded-2xl"/>
        <button class="text-gray-400 hover:scale-110" onClick={addTodo}>Add Item</button>
      </div>

      <div>
        {todoList.length !== 0 ? (
          <ul class="flex flex-col gap-3">
          {
            todoList.map((todo) => (
              <li class="border border-black bg-gray-300/30 w-100 py-3 px-8 flex flex-col items-between gap-3 rounded-3xl">
                <h3 class="text-center text-white">{todo.name}</h3>
                <div class="flex justify-between">
                  <button class="text-green-200 bg-green-800 p-1 rounded-xl" onClick={() => toggleTaskComplete(todo.id, todo.isCompleted)}>{todo.isCompleted ? "Undo" : "Completed"}</button>
                  <button class="text-red-200 bg-red-800 p-1 rounded-xl" onClick={() => deleteTodo(todo.id)}>Delete Item</button>
                </div>
              </li>
            ))
          }
        </ul>
        ) : (
          <div class="text-white/40 text-2xl">( No Items in the List :/ )</div>
        )}
      </div>
    </div>
  )
}

export default App
