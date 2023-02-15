const $ = document.querySelector.bind(document)
const inputFirst = $(".input-first")
const inputSecond = $(".input-second")
const btn = $(".add-btn")
const ul = $("ul")


function addTask() {
    const tasks = JSON.parse(localStorage.getItem("task")) || []
    ul.innerHTML = ""
    tasks.map((el) => {
        let newList = `<li class="list-group-item d-flex justify-content-between align-items-center">
       <span class="d-flex align-items-center jusify-content-between">
        <div class="radius">${el.name[0].toUpperCase()}${el.surname[0].toUpperCase()}</div>
       <span class="${el.isCompleted ? "ruler": ""}"><input type="checkbox" ${el.isCompleted ? "checked": ""} class="check-box">  name: ${el.name}  surname: ${el.surname}
       </span>
       </span> 
       <button class="del-btn btn btn-primary">delete</button>
       </li>`
        ul.innerHTML += newList

    })

    delTask()
    checkTask()

}
addTask()

btn.addEventListener("click", () => {
    if (inputFirst.value !== "" && inputSecond.value !== "") {
        let tasks = JSON.parse(localStorage.getItem("task")) || []
        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            name: inputFirst.value[0].toUpperCase() + inputFirst.value.slice(1),
            surname: inputSecond.value[0].toUpperCase() + inputSecond.value.slice(1),
            isCompleted: false
        }
        tasks = [...tasks, newTask]
        localStorage.setItem("task", JSON.stringify(tasks))
        addTask()
        
    }


})



function delTask()  {
    let tasks = JSON.parse(localStorage.getItem("task")) || []
    const buttons = document.querySelectorAll(".del-btn")
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            tasks = tasks.filter((el  , idx) => {
                return index !== idx
            })
            localStorage.setItem("task", JSON.stringify(tasks))
            addTask()
        })
    })
}
delTask()

function checkTask() {
    let tasks = JSON.parse(localStorage.getItem("task")) || []
    const checkbox = document.querySelectorAll(".check-box")
    checkbox.forEach((check, index) => {
        check.addEventListener("click", () => {
            tasks = tasks.map ((el,idx) => {
                if (index === idx) {
                    check.parentNode.classList.toggle("ruler")
                    return {...el, isCompleted: !el.isCompleted}
                }else {
                    return el
                }
            })
            localStorage.setItem("task", JSON.stringify(tasks))
            addTask()

        })
    })
}

inputFirst.addEventListener('keydown',(e)=>{
    if (e.key === 'Enter'){
        inputSecond.focus()
    }
})
inputSecond.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn.focus()
    }
})






