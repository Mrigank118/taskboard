import { useState } from 'react'
import './App.css'

const initialTasks = [
  {
    id: 1,
    title: 'Design landing page',
    description: 'Create the first version of the product landing page.',
    status: 'todo',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Build authentication',
    description: 'Implement login and registration flow.',
    status: 'progress',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Deploy application',
    description: 'Prepare production deployment.',
    status: 'done',
    priority: 'Low',
  },
]

const columns = [
  { id: 'todo', title: 'To Do', icon: '○' },
  { id: 'progress', title: 'In Progress', icon: '◐' },
  { id: 'done', title: 'Completed', icon: '✓' },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  function addTask(event) {
    event.preventDefault()

    if (!newTask.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.trim(),
        description: 'New task',
        status: 'todo',
        priority: 'Medium',
      },
    ])

    setNewTask('')
  }

  function moveTask(id, status) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  const completed = tasks.filter((task) => task.status === 'done').length
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">T</div>
          <span>Taskboard</span>
        </div>

        <nav>
          <a className="nav-item active">
            <span>▦</span>
            Overview
          </a>

          <a className="nav-item">
            <span>□</span>
            My Tasks
          </a>

          <a className="nav-item">
            <span>☆</span>
            Favorites
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">MS</div>
            <div>
              <strong>Mrigank</strong>
              <small>Workspace</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">WORKSPACE</p>
            <h1>My Tasks</h1>
            <p className="subtitle">
              Plan, track and complete your work.
            </p>
          </div>

          <button className="new-button" onClick={() => document.querySelector('.task-input')?.focus()}>
            + New task
          </button>
        </header>

        <section className="stats">
          <div className="stat-card">
            <span className="stat-label">Total tasks</span>
            <strong>{tasks.length}</strong>
            <span className="stat-meta">All tasks</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">In progress</span>
            <strong>
              {tasks.filter((task) => task.status === 'progress').length}
            </strong>
            <span className="stat-meta">Currently active</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Completed</span>
            <strong>{completed}</strong>
            <span className="stat-meta">{progress}% complete</span>
          </div>
        </section>

        <section className="toolbar">
          <form onSubmit={addTask} className="task-form">
            <input
              className="task-input"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="What needs to be done?"
            />
            <button type="submit">Add task</button>
          </form>

          <div className="filters">
            {['All', 'High', 'Medium', 'Low'].map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? 'filter active' : 'filter'}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="board">
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) =>
                task.status === column.id &&
                (activeFilter === 'All' || task.priority === activeFilter)
            )

            return (
              <div className="column" key={column.id}>
                <div className="column-header">
                  <div className="column-title">
                    <span className={`column-icon ${column.id}`}>
                      {column.icon}
                    </span>
                    <h2>{column.title}</h2>
                  </div>

                  <span className="count">{columnTasks.length}</span>
                </div>

                <div className="task-list">
                  {columnTasks.length === 0 ? (
                    <div className="empty">
                      <span>Nothing here</span>
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <article className="task-card" key={task.id}>
                        <div className="task-top">
                          <span className={`priority ${task.priority.toLowerCase()}`}>
                            {task.priority}
                          </span>

                          <button
                            className="delete"
                            onClick={() => deleteTask(task.id)}
                            title="Delete task"
                          >
                            ×
                          </button>
                        </div>

                        <h3>{task.title}</h3>
                        <p>{task.description}</p>

                        <div className="task-footer">
                          {task.status !== 'todo' && (
                            <button onClick={() => moveTask(task.id, 'todo')}>
                              ← To Do
                            </button>
                          )}

                          {task.status !== 'progress' && (
                            <button onClick={() => moveTask(task.id, 'progress')}>
                              → Progress
                            </button>
                          )}

                          {task.status !== 'done' && (
                            <button onClick={() => moveTask(task.id, 'done')}>
                              ✓ Done
                            </button>
                          )}
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default App