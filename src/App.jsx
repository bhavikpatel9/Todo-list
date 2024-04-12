import { useState,useEffect } from 'react'
import Navbar from './componets/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoFromLocalStorage = localStorage.getItem("todos")
    if(todoFromLocalStorage){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  
  }, [])
  

  const saveToLocalStorage = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  // const deleteFromLocalStorage = (id) => {

  //   localStorage.removeItem("todos",)
  // }
  

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
      setTodos([...todos,{id : uuidv4(), todo, isCompleted : false}])
      console.log(todos)
      setTodo("")
      saveToLocalStorage()
    
  }

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item=>{return item.id === id})
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item)=>{return item.id!=id})
    setTodos(newTodos)
    saveToLocalStorage()
    // let d = todos.filter((item)=>{return item.id===id})
    // localStorage.removeItem("todos",JSON.stringify(d))
  }

  const handleEdit = (e, id) => {
    let EditTodo = todos.filter((item)=>{return item.id==id})
    setTodo(EditTodo[0].todo)
    let newTodos = todos.filter((item)=>{return item.id!=id})
    setTodos(newTodos)
  }
  
  const handleFinished = () => {
    setshowFinished(!showFinished)
  }
  
  
  return (
    <>
      <Navbar/>
      <div className="w-[80vw] lg:w-[40vw] bg-purple-200 mx-auto rounded-md my-4 h-[80vh]">
      <h1 className='font-bold text-3xl text-center py-4'>iTask - Manage your toods at one place</h1>
     {/* add todo */}
     <div className='font-bold mx-5 text-2xl'>Add a todo</div>
        <div className="add-todo mx-5 my-2">
          <input type="text" value={todo} onChange={handleChange} className='border w-2/3 lg:w-3/4 rounded-md h-7'/>
          <button onClick={handleAdd} className='bg-purple-600 mx-2 h-7 rounded-md px-3 disabled:bg-purple-400 text-white hover:bg-purple-800' disabled={todo.length<=3}>Add</button>
        </div>
        {/* display todos */}
        <div className="todos mx-5">
        
        {todos.length === 0 && <div>No todos to display</div>}
        <input type="checkbox" id='show' checked={showFinished} onChange={handleFinished}/>
        <label htmlFor="show" className='mx-1'>Show Finished todos</label>
        <div className='h-[1px] bg-black opacity-15 my-1'></div>
        {
          
          todos.map((item,todo)=>{
            return (showFinished || !item.isCompleted) && (
              
              <div className='todo flex my-3 justify-between lg:w-1/2' key={todo} >
              
              <div className='flex'>
              <input type="checkbox" className='cursor-pointer mx-1' checked={item.isCompleted} name={item.id} onChange={handleCheckbox}/>
                  <div className={item.isCompleted?'line-through':''}>
                        {item.todo}  
                  </div>
              </div>
                
                  <div className="buttons flex h-fit">
                    <button className='bg-purple-600 mx-2 rounded-md py-[3px] px-[5px] text-white hover:bg-purple-800' onClick={(e)=>{handleEdit(e, item.id)}}><FaEdit /></button>
                    <button className='bg-purple-600 mx-2 rounded-md py-[3px] px-[5px] text-white hover:bg-purple-800' onClick={(e)=>{handleDelete(e, item.id)}}><MdDelete /></button>
                  </div>
              </div>
            )
          })
        }
          
        </div>
      </div>
    </>
  )
}

export default App
