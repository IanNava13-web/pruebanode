//Servidor web 
const http = require("http")
const fs = require("fs/promises")
const url = require("url")

const server = http.createServer( async (request,response) => {
	const queryObject = url.parse(request.url, true).query
	const fileName = queryObject.file

	if(fileName){
		try{
			const data = await fs.readFile(fileName, "utf-8")
			response.writeHead(200,  { 'Content-Type': 'text/plain' } )
			response.write(data)
			response.end()
		}
		catch(error){
			response.writeHead(400,  { 'Content-Type': 'text/plain' } )
			response.write("Request bad")
			response.end()
		}

	}
	else {
		response.writeHead(404,  { 'Content-Type': 'text/plain' } )
		response.write("File not found")
		response.end()
	}
})

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});