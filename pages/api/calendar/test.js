import fsPromises from 'fs/promises'
import path from 'path'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		// Process a POST request
		console.log('POST request received.')
	} else {
    // Read JSON for authentication
		const filePath = path.join(process.cwd(), 'credentials/google-api.json')
		const jsonData = await fsPromises.readFile(filePath)
		const objectData = JSON.parse(jsonData)
    // End read JSON
    
		res.status(200).send({data: objectData})
	}
}
