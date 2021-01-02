const http = require('http')
const url = require('url')
const fs = require('fs')
const db = require('./db/connect')

http.createServer(async(req, res) => {
  if(req.url == '/' && req.method == 'GET'){
    fs.readFile('./views/index.html',(err, file)=>{
      if(err){
        console.log(error)
      } else {
        res.writeHead(200, {'Content-Type':'text/html'})
        res.write(file,'utf8')
        res.end()
      }
    })
  }
  if(req.url == '/cancion' && req.method == 'POST') {
    let params = ''

    req.on('data', (body) => {
      params = body
    })
    req.on('end', async() => {
      const paramsArray = Object.values(JSON.parse(params))
      const result = await db.insertSong(paramsArray)
      res.writeHead(200,{'Content-Type': 'application/json'})
      res.write(JSON.stringify(result))
      res.end()
    })
  }
  if(req.url == '/canciones' && req.method == 'GET') {
    const result = await db.getSongs()
    fs.writeFileSync('canciones.json', JSON.stringify(result))
    res.end(JSON.stringify(result))
  }
  if(req.url == '/cancion' && req.method == 'PUT'){
    let body = ''
    req.on('data', (params) => {
      body = params
    })
    req.on('end', async() => {
      const paramsArray = Object.values(JSON.parse(body))
      const result = await db.editSong(paramsArray)
      res.end(JSON.stringify(result)) 
    })
  }
  if(req.url.startsWith('/cancion?') && req.method == 'DELETE') {
    const id = url.parse(req.url, true).query.id
    const result = await db.deleteSong(id)
    res.writeHead(200, {'Content-Type': 'application/json'})
    res-fs.writeFileSync(JSON.stringify(result))
    res.end()
  }
})
.listen(3000, () => console.log('Escuchando en el puerto 3000'))