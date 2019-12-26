import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000//api" //api를 받아온다.

export default {
   
    // 모든 글 불러오기
    getAllPosts() {
        return axios.get('/posts/')
    }, //함수 생성 후 ,를 통해서 구분 필요함


    // 글 작성하기
    createPost(data) {
        return axios.post('/posts/', data)
    },

    deletePost(id) {
        return axios.delete('/posts/'+String(id))
    },

    updatePost(id, _title, _content) {
        return axios.put('/posts/'+String(id)+'/', {title:_title, content:_content})
    }
}

//접속 가능하게 함수 생성