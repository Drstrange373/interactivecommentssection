export default async function fetchData():Promise<DataSchema>{
     const response = await fetch('/data.json') 
     return response.json() as Promise<DataSchema>
}
