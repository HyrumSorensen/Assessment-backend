const goals = require('./db.json')
let goalID = 1;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["You will become what you fear the most",
    "You will find yourself in a path most windy and confusing", 
    "Never before has the world achieved such greater disaster",
    "You will fall prey to a rabbid squierrel"];

    //choosing random fortune
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
    },
    createGoal: (req,res) => {
        const {goal} = req.body;
        let newGoal = {
            id: goalID,
            goal: goal,
            color: 'white'
        }
        goals.push(newGoal)
        goalID++
        res.status(200).send(goals)
    },
    deleteGoal: (req,res) => {
        let index = goals.findIndex(elem => elem.id === +req.params.id);
        goals.splice(index, 1);
        res.status(200).send(goals)
    },
    highlightGoal: (req,res) => {
        const {type} = req.body;
        let index = goals.findIndex(elem => elem.id === +req.params.id);
        if (type === 'yellow') {
            goals[index].color = 'yellow'
            res.status(200).send(goals);
        }else if (type === 'red') {
            goals[index].color = 'red'
            res.status(200).send(goals);
        }else {}
    }
}