import mysql from 'mysql2'
import inquirer from 'inquirer';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sakila'
});

const searchActors = async () => {

    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "last_name",
            message: "Last Name: "
        }
    ])

    try {
        const [results] = await connection.promise().query(
            'SELECT * FROM actor WHERE last_name = ?',
            answer.last_name
        )

        console.table(results)
        menuPrompt()

    } catch (error) {
        throw new Error(error)
    }
}

const addActor = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is their first name?"
        }, {
            type: 'input',
            name: 'last_name',
            message: "What is their last name?"
        }
    ])

    try {
        const [results] = await connection.promise().query(
            'INSERT INTO actor (first_name, last_name) VALUES (?, ?)',
            [answers.first_name, answers.last_name]
        )
        console.log(results)
    } catch (error) {
        throw new Error(error)
    }
}

const updateActor = async () => {
    //What actor do you want to update? ID
    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'actor_id',
            message: 'Enter ID of actor you want to update'
        }, {
            type: 'input',
            name: 'first_name',
            message: 'Update FIRST NAME:',
            //Applies and enters default first name (ex: 'Josh' for 'Josh Mathers')
            default: async (sessionAnswers) => {
                const [results] = await connection.promise().query(
                    'SELECT first_name FROM actor WHERE actor_id = ?',
                    sessionAnswers.actor_id
                )
                return results[0].first_name
            }
        }, {
            type: 'input',
            name: 'last_name',
            message: 'Update LAST NAME:',
            //Applies and enters default last name (ex: 'Mathers' for 'Josh Mathers')
            default: async (sessionAnswers) => {
                const [results] = await connection.promise().query(
                    'SELECT last_name FROM actor WHERE actor_id = ?',
                    sessionAnswers.actor_id
                )
                return results[0].last_name
            }
        }
    ])

const [results] = await connection.promise().query(
'UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?', 
[answers.first_name, answers.last_name, answers.actor_id]
)
console.log('Actor updated!')
menuPrompt()
}



const menuPrompt = async () => {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: ['SEARCH actors', 'ADD an actor', 'UPDATE an actor', 'EXIT']
        }
    ])

    if
        (answers.action === 'SEARCH actors') {
        searchActors()
    }
    else if
        (answers.action === 'ADD an actor') {
        addActor()
    }
    else if
        (answers.action === 'UPDATE an actor') {
        updateActor()
    }
    else {
        process.exit(0)
    }
}

menuPrompt()