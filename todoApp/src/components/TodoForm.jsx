import React, { useState } from 'react'

const TodoForm = ({addTodo}) => {

    const [name , setName] = useState('');
    const [picture , setPicture] = useState('');
    const [dueDate , setDueDate] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !picture || !dueDate) return;

        const newTodo = {
            id: Date.now(),
            name,
            picture,
            date: new Date().toISOString(),
            dueDate,
          };

          addTodo({newTodo});
          setDueDate("")
          setName("")
          setPicture("")
    }


  return (
    <>
        <form onSubmit={handleSubmit} className='flex flex-col mx-atuo'>
            <input type="text" 
                placeholder='Item name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
            />
            <input type="text" 
                placeholder='Image URL'
                value={picture}
                onChange={(e)=>setPicture(e.target.value)}
                required
            />
            <input type="date" 
                value={dueDate}
                onChange={(e)=>setDueDate(e.target.value)}
                required
            />
            <button type='submit'>Add Item</button>
        </form>
    </>
  )
}

export default TodoForm