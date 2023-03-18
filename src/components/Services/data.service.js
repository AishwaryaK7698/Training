import axios from "axios"

async function fetchData(){
    const data = await axios.get('https://fakestoreapi.com/products')
    return data.data

}
export const dataService = {
    fetchData
}