const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro'
})

const fs = require('fs')
const writable = fs.createWriteStream('pessoas.csv')
writable.write('id,nome,cargo\n', () => {
    connection.connect((err) => {
        const query =  connection.query('select * from pessoas')
        query.on('result', (row) => {    
            // const data = JSON.parse(JSON.stringify(row))
            // const content = `${data.id},${data.nome},${data.cargo}\n`
            const data = `${row.id},${row.nome},${row.cargo}\n`
            connection.pause()
            writable.write(data, () => {
                connection.resume()
                //console.log('written..')   
                })
        })
        query.on('end', () => {
            writable.end()
            connection.end()
        })
    
    })
})