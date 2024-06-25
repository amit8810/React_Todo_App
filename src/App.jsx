import './App.css'
import TodoApp from './components/TodoApp'


function App() {


  return (
    <>
      <div className='min-h-screen bg-[#f8f8ff]'>
          {/* header */}
          <nav className='p-4 flex items-center justify-center gap-2'>
          <h1 className='text-center font-bold text-4xl text-[#7c7c7c] '>TODO APP</h1>
          </nav>
          {/* todo content body */}
          <TodoApp/>

      </div>
    </>
  )
}

export default App
