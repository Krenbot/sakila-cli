import mysql from 'mysql2'
import inquirer from 'inquirer';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sakila'
});

const menuPrompt = async () => {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: ['SEARCH actors', 'ADD an actor', 'UPDATE an actor', 'EXIT']
        }
    ])
    console.log(answers)
    if (answers.action === 'SEARCH actors'){
        searchActors()
    } 
    else if (answers.action === 'ADD an actor'){
        addActor()
    } 
    else if (answers.action === 'UPDATE an actor'){
        updateActor()
    }
     else {
        process.exit(0)
    }
}

menuPrompt()