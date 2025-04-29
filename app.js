const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(<RenderPage />);


/********************************************************************************************************************/
// CREAMOS CONTEXTOS
const SelectedUser = React.createContext();
const UsersList = React.createContext();


/********************************************************************************************************************/
//COMPONENTE PADRE/RAIZ/ROOT.RENDER
function RenderPage() {

  // Devolvemos los componentes Aside y Main dentro de los tres contextos creados
  return (
    <>
      <UsersList.Provider value={React.useState([])}>
        <SelectedUser.Provider value={React.useState(null)}>
          <Aside/>
          <Main  />        
        </SelectedUser.Provider>
      </UsersList.Provider>
    </>
  );
}


/********************************************************************************************************************/
//COMPONENTE ASIDE
function Aside() {

  //estado para crear un nuevo usuario
  const [newUser, setNewUser] = React.useState("");

  //Declaramos  los contextos
  const [selectUser,setSelectUser] = React.useContext(SelectedUser);
  const [users, setUsers] = React.useContext(UsersList);

  //FUNCION añadir un nuevo usuario a la lista de usuarios
  function addUser() {
    if (newUser.trim() === "") return;
    setUsers([...users,{ name: newUser, tasks: [] }]);
    setNewUser("");
  };

  //FUNCIÓN Cambiar Tema
  function toggleTheme() {
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");
  }

  //RETURN , imprimimos el aside en el DOM
  return (
    <aside className="sidebar card">
      <h2>Usuarios</h2>

      {/* Lista usuarios */}
      <ul id="userList">
        {/* En caso de haber usuarios en la lista los mostramos */}
        {users.length != 0 && users.map((user, index) => (
            <li
              style={{fontWeight:selectUser == index ? "bold" : "normal", cursor:"pointer"}}
              key={index}
              onClick ={()=> setSelectUser(index) }
            >
              {user.name}
            </li>
        ))}
      </ul>

      {/* Textbox para introducir un nuevo usuario */}
      <input
        type="text"
        id="newUserInput"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Nuevo usuario"
      />
      <button onClick={addUser}>Añadir Usuario</button>
      
      {/* informacion del usuario, solo se muestra si hay uno seleccionado */}
      <div id="userInfo" className={selectUser==null ?"hidden" :""}>
        <hr />
        <p id="userName">{selectUser!=null ? users[selectUser].name:""}</p>
        <p id="userStats">
          {selectUser!=null && (()=>{
            const user = users[selectUser];
            const completed = user.tasks.filter(t => t.completed).length;
            return `Tareas: ${user.tasks.length} / ${completed} completadas`;
          })()}
        </p>
        <button onClick={()=>setSelectUser(null)}>Deseleccionar</button>
      </div>
      
      {/* Botón para cambiar el tema */}
      <button onClick={toggleTheme} style={{ marginTop: "auto" }}>🌙/☀️ Tema</button>
    </aside>
  );
}


/********************************************************************************************************************/
//COMPONENTE MAIN
function Main() {

  //Declaramos el contexto que necesitamos
  const [selectUser,setSelectUser] = React.useContext(SelectedUser);
  const [users, setUsers] = React.useContext(UsersList);

  //Declaramos un state para tareas
  const [newTask, setNewTask] = React.useState("");
 

  //FUNCION añadir nueva tarea
  function addTask() {
    if (newTask.trim() === "") return;
    setUsers(users.map((user, index) => {
      if (index === selectUser) {
      return {
        ...user,
          //añadimos a las lista de tareas del usuario la nueva, respetando las anteriores
          tasks:[...user.tasks, { text: newTask, completed: false }]
        };
    }
    return user;
    }));
    //resteamos task 
    setNewTask("");
  }
  
  return (
    <main className="main">
      <div className="card">
        <h1 id="mainTitle">{selectUser==null ? "Selecciona un usuario" : "Tareas de " + users[selectUser].name}</h1>
        
        {/*Esta seccion se muestra solo si hay un usuario seleccionado  */}
        <div id="taskSection" className={selectUser==null ?"hidden" :""}>
          <ul id="taskList">
            {/* En caso de que el usuario tenga tareas las imprimirmos */}
          {selectUser !== null && users[selectUser] && users[selectUser].tasks.map((task, taskIndex) => (
              <Task taskIndex={taskIndex} task={task}/>
            ))} 
          </ul>

          {/* Input para añadir una nueva tarea */}
          <input 
            type="text" 
            id="newTaskInput" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nueva tarea..." />
          <button onClick={addTask}>Añadir Tarea</button>
        </div>
      </div>
    </main>
  )
}


/********************************************************************************************************************/
//COMPONENTE TASK
function Task ({taskIndex,task}){

  //Declaramos el contexto que necesitaremos
  const [users, setUsers] = React.useContext(UsersList);
  const [selectUser,setSelectUser] = React.useContext(SelectedUser);

  //FUNCION marcar tarea como completada
  function toggleTask(taskIndex) {
    setUsers(users.map((user, indexUser) => {
      if (indexUser === selectUser) {
        return{
          ...user,
          //mapeamos las tareas del usuario y ponemos el estado contrario del actual
          tasks: user.tasks.map((task, index)=> index ===taskIndex ? {...task, completed: !task.completed} : task)
        };
    }
    return user;
    }));
  }
  
  //FUNCION eliminar tarea
  function deleteTask(taskIndex) {
    setUsers(users.map((user, indexUser) => {
      if (indexUser === selectUser) {
        return{
          ...user,
          tasks : user.tasks.filter((task,index)=>index!== taskIndex)
        };
      }
      return user;
    }));
  }
  
  //Funcion editar tarea
  function editTask(taskIndex) {
    const newText = prompt("Editar tarea:", users[selectUser].tasks[taskIndex].text);
    if (newText !== null && newText.trim() !== "") {
      setUsers(users.map((user, indexUser) => {
        if (indexUser === selectUser) {
          return{
            ...user,
            //mapeamos las tareas del usuario y ponemos el estado contrario del actual
            tasks: user.tasks.map((task, index)=> index ===taskIndex ? {...task, text: newText} : task)
          };
      }
      return user;
      }));
      }
  }

  return (
    <li key={taskIndex} className={task.completed ? "completed" : ""}>
        <span onClick={() => toggleTask(taskIndex)}>{task.text}</span>
        <div className="actions">
          <button onClick ={() =>editTask(taskIndex)}>✏️</button>
          <button onClick ={() =>deleteTask(taskIndex)}>🗑️</button>
        </div>
    </li>
  );
}
