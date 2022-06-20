const goalsContainer = document.querySelector('#goals-container')
const form = document.querySelector('form')

const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")


const errCallback = err => console.log(err)

const baseURL = `http://localhost:4000/api/goals`

const goalsCallback = ({ data: goals }) => displayGoals(goals)
const createGoal = body => axios.post(baseURL, body).then(goalsCallback).catch(errCallback)
const deleteGoal = id => axios.delete(`${baseURL}/${id}`).then(goalsCallback).catch(errCallback)
const highlightGoal = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(goalsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()
    let newGoal = document.querySelector('#goalInput')
    let bodyObj = {
        goal: newGoal.value
    }
    createGoal(bodyObj)
    newGoal.value = '';
}

function createGoalCard(goal) {
    const goalCard = document.createElement('div')
    if (goal.color === 'yellow') {
        goalCard.classList.add('yellow');
    }
    else if (goal.color === 'red'){
        goalCard.classList.add('red');
    }
    goalCard.classList.add('goal-card')
    goalCard.innerHTML = `<li>${goal.goal}</li>
    <div class="btns-container">
    </div>
    <button onclick="deleteGoal(${goal.id})">delete</button>
    <button onclick="highlightGoal(${goal.id}, 'yellow')">yellow</button>
    <button onclick="highlightGoal(${goal.id}, 'red')">red</button>
    `
    goalsContainer.appendChild(goalCard);
}

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};
function displayGoals(arr) {
    goalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGoalCard(arr[i])
    }
}
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
form.addEventListener('submit', submitHandler)