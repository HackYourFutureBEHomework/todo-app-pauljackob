// Your code goes here!

//console.log("Test")

let TODOS = [];

function addItem(count) {
    if (count === 1) {
        return "item";
    } else {
        return "items";
    }
}

function update () {
    const $todoList = document.querySelector('.todo-list');
    //we use the next line to cleane eveerything in the input
    $todoList.innerHTML = '';
    for (item of TODOS) {
       // console.log(item);
        const $li = document.createElement("li");
        //$li.innerHTML = item.title;
        if (item.done) {
            $li.classList.add("completed")
        }
        $todoList.appendChild($li);

        //TOGGLE BUTTON
        const $toggle = document.createElement('input');
        //$toggel.className = "toggle";
        $toggle.setAttribute ("class", "toggle");
        $toggle.setAttribute ("type", "checkbox");
        if (item.done) {
            $toggle.setAttribute("checked","checked")
        }
        $toggle.addEventListener("change", onToggleTodo.bind(null, item.id));
        $li.appendChild($toggle);


        //label
        const $label = document.createElement("label");
        $label.innerHTML = item.title;
        $li.appendChild($label);

        //Delete button
        const $button = document.createElement("button");
        $button.className = "destroy";
        $button.addEventListener('click', onDeleteTodo.bind(null, item.id));
        $li.appendChild($button);
        

        //count the items
        const counter = TODOS.filter(todo => !todo.done);   
        document.querySelector('.todo-count').innerHTML = counter.length + " " + addItem(counter.length); 

    }
    document.querySelector('.main').style.display = "block";
}

function onToggleTodo(id){
    const todo = TODOS.find(todo => todo.id === id);
    todo.done = !todo.done;
    update();
}

function onNewTodo (e) {
    const title = e.target.value
    //this is the same thing
    //const title = document.querySelector('.new-todo').value;
    console.log(title);
    TODOS.push({
        id: Date.now(),
        title,
        done: false
    });
    update();
    e.target.value = "";
    
}

//Active delete button
function onDeleteTodo(id) {
    TODOS = TODOS.filter(todo => todo.id !== id);
    update();
}


//slect the new todo input filed

const $newTodo = document.querySelector('.new-todo');
$newTodo.addEventListener('change', onNewTodo);
update();