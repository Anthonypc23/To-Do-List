const connection = require('./connection')

const getAll = async () => {


    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks


}

const getID = async (id) => {

    console.log(id);


    const [task] = await connection.execute('SELECT * FROM tasks WHERE id LIKE ?', [id])

    return task
}

const createTaks = async (task) => {
    const { title } = task

    const dateUTC = new Date(Date.now()).toUTCString();



    const query = 'INSERT INTO tasks(title, status, created_at) VALUES(?,?,?)'

    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC])

    return { insertId: createdTask.insertId }
}


const deleteTasks = async (id) => {

    const query = 'DELETE FROM tasks WHERE id = ?'
    const removedTask = await connection.execute(query, [id])

    return removedTask
}

const updateTasks = async (id,task) => {

    const { title, status} = task

    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?'

    const altera = await connection.execute(query, [title, status, id])


    return altera

}

module.exports = {
    getAll,
    getID,
    createTaks,
    deleteTasks,
    updateTasks
}