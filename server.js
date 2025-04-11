const express = require('express')

const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')

app.use(bodyParser.json())


const runFromDB = (sql_request) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('db.sqlite')
    if (sql_request.trim().toUpperCase().startsWith('SELECT')) {
      db.all(sql_request, [], (err, rows) => {
        db.close()
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    } else {
      db.run(sql_request, function(err) {
        db.close()
        if (err) {
          reject(err)
        } else {
          resolve({ changes: this.changes, lastID: this.lastID })
        }
      })
    }
  })
}

runFromDB("CREATE TABLE IF NOT EXISTS Task (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed TINYINT)")


app.get('/tasks', async (req, res) => {
  try {
    const tasks = await runFromDB("SELECT * FROM Task")
    res.send(tasks)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

app.post('/tasks', async (req, res) => {
  const data = req.body
  console.log('data', data)
  try {
    await runFromDB(`INSERT INTO Task (title, completed) VALUES ("${data.title}", "0")`)
    res.status(201).send({ message: 'Task created' })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

app.put('/tasks/:id', async (req, res) => {
  const id = req.params.id
  try {
    const tasks = await runFromDB(`SELECT * FROM Task WHERE id=${id}`)
    const task = tasks[0]
    await runFromDB(`UPDATE Task SET completed = ${task.completed ? 0 : 1} WHERE id=${id}`)
    res.status(200).send({ message: `Task modifiée (${task?.completed ? "Pas finie" : "Finie"})` })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

app.delete('/tasks/:id', async (req, res) => {
  const id = req.params.id
  try {
    await runFromDB(`DELETE FROM Task WHERE id=${id}`)
    res.send({ message: 'Task deleted' })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

