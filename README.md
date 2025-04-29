enlace gitpages: https://natgsarabia.github.io/MP06_UF3_PF_nataliaGarcia/


****************************************************************************
*              ADAPTAR UNA APLACIÓN A DECLARATIVA A REACT                  *
****************************************************************************

*PRIMEROS PASOS:*

El primer paso que realizaremos para adaptar la aplicación y hacerla enteramente con REACT será eliminar el contigo de index.html, dejando unicamente el <div class="app">, al que le añadiremos también el id="app" y en nuestro nuevo app.js nos recreamos un elemento root.render a partir de este. 
Este elemento nos retornará dos dos componentes de nuestra pagina:
    - Aside
    - Main

Ahora definiremos los conextos que queremos que tenga nuestra aplicación. En este caso como elementos que tienen en común ambos componentes son el usario seleccionado y la lista de usuarios, dejaremos definidos estos dos al inicio de nuestra aplicación, antes de empezar a programar ninguna función, de la siguiente forma:
    const SelectedUser = React.createContext();
    const UsersList = React.createContext();

y adaptaremos el return de nuestro componente padre para que quede englobado dentro de estos dos contextos, que dejaremos iniciados como estados. 
De esta forma, cada vez que se modifiquen se renderizara automaticamente la pagina, actualizando la información a los datos actuales. Y podremos suprimir las funciones render que tenemos en la aplicación versión declarativa.

____________________________________________________________________________
*CREANDO EL COMPONETE ASIDE*

Este componente es el que se encarga de crear nuevos usarios, por lo tanto nos crearemos un estado newUser, con el que poder ir actualizando la lista de usuarios.  EL handler de este estado lo añadiremos en la función onchange del input "Añadir Usuario", de esta forma se actualizará automaticamente cada vez que escribamos un nuevo nombre. 

Como necesitaremos actualizar tanto el conexto UsersList como el SelectedUser declarados al principio de la pagina, los inicializamos ambos justo después de crear el useState

Y nos crearemos la funcion AddUser. En esta usaremos el handler del conetxto UserList para añadir el nuevo usuario y resteaemos el valor de este a "". 

Por ultimo nos crearemos la funcion toggleTheme() para cambiar el tema de claro a oscuro siempre que hagamos click en el boton Tema. La dejaremos indicada dentro de este elemento en la función onClick()

Ahora solo quedaría replicar la información que teniamos en el aside del index.html en el return de este componente. Como hemos declarado el usuario seleccionado como un estado y contexto, lo podemos usar como condicional para cambiar el formato del tag del nombre del usuario al estar o no seleccionado de la siguiente forma:
    fontWeight:selectUser == index ? "bold" : "normal"

Podremos hacer lo mismo para mostrar o no el div userInfo, en caso de que el valor de selectUser no sea nulo lo mostraremos y si no lo mantendremos en oculto. 
Así nos podemos ahorrar también las funciones:
    - selectedUser()
    - deselectUser()
    - updateSidebarInfo()

Ya que el hidden de los elementos y su información se renderizaran solos cada vez que se modifique el estado de selectUser

____________________________________________________________________________
*CREANDO EL COMPONETE MAIN*

En Main volveremos ha iniciar los contextos igual que el componente anterior y además crearemos el estado Task, ya que es aquí donde las creamos y añadimos a cada usuario. 

Nos crearemos la funcion AddTask()
En las que al handler de usuarios le pasaremos la lista de usuarios pero mapeada. De esta forma podremos recorrer los usuarios y, cuando se encuentre el usuario con el mismo id que del selectUser añadiremos la nueva tarea.

Esta será la unica función que tendremos en Main. 
Programaremos el return con los mismos elementos que contenia el main en el html anterior.  
Los unicos cambios serán en el h1, en el que, igual que en el componente anterior, haremos un condicional para que muestre un titulo u otro en función de si hay o no un usuario seleccionado. 
Y en caso de haber un usuario seleccionado y existir en la lista, la mapearemos para recorrerla e imprimir las tareas de este. 
Como el <li> que creamos por cada tarea tiene varios elementos internos lo dejaremos especificado en un componente nuevo. 

Finalmente, en el input de la añadir tarea le pasaremos como value el estado tarea, en la función de onChange() el handler de tarea para actualizarla siempre que se modifique el contenido y en el boton onClick() la función de añadir nueva tarea 

____________________________________________________________________________
*CREANDO EL COMPONETE TASK*

Nuestro útlimo componente será Taks, en esto no hará falta que declaremos ningún nuevo estado, pero si los dos contextos que tenemos, para que pueda acceder a la lista actual de usuarios y al usuario seleccionado. 

Dentro de este componente programaremos las funciones de modificación de tarea:
    - toggleTask(): para marcar y desmarcar
    - deletetask(): para eliminarla
    - editTask(): para modificarla

En todas ellas haremos el mismo proceso que en addTask, al handles de users le pasaremos la lista mapeada y actualizaremos siempre que el index corresponda al del usuario seleccionado. Menos en el delete, que usaremos la función filter para que devuelva una nueva lista sin esta tarea.

Por ultimo, como hasta ahora, devolveremos los mismos elementos que teniamos en el index.html anterior, para que nos muestre la misma información.