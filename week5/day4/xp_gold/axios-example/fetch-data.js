import axios from "axios";
async function fetchData(postId) {
 try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const { title, ...rest } = response.data;
    console.log(rest);
} catch (error) {
    console.error("Error fetching data:", error);
}
}

export default fetchData;