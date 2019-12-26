import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    // _results.data 아무것도 없음 (비동기 때문에)
    this.setState({results: _results.data})
    console.log(_results)
  }

  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value}) //target의 name과 value가 각각에 들어감.
  }

  handlingSubmit = async (event) => {
    // event기능 -> 막는다
    event.preventDefault() //새로고침이 이루어지지 않음 <pending> -> 아직 하는중
    await api.createPost({title:this.state.title, content:this.state.content})
    this.setState({title:'', content: ''})
    this.getPosts()

  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  handlingUpdate = async (id, _title, _content) => {
    await api.updatePost(id, _title, _content)
    this.setState({title:'', content:''})
    this.getPosts()
  }

  render() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <div className="PostingSection">
          <Paper className="PostingForm">
          <h2>대나무 숲 글 작성하기</h2>
          <form className="Inputs" onSubmit={this.handlingSubmit}>
          <TextField
            id="outlined-multiline-static"
            label="title"
            value={this.state.title}
            onChange={this.handlingChange}
            name="title"
            multiline
            rows="4"
            defaultValue="Default Value"
            variant="outlined"
          />
          <TextField 
          id="outlined-multiline-static"
          label="content"
          name="content"
          value={this.state.content}
          onChange={this.handlingChange}
          multiline
          rows="4"
          defaultValue="Default Value"
          variant="outlined"
          
          />
          <button type="submit" variant="outlined" color="primary">제출하기</button>
          </form>
          </Paper>
        </div>
        <div className="ViewSection">
          {
            this.state.results.map((post) => 
            <div>
            <Card className={'card'}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <PostView key={post.id} id={post.id} title={post.title} content={post.content} updated={post.updated}/>
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="secondary" size="small" onClick={(event) => {this.handlingDelete(post.id)}}>삭제하기</Button>
              <Button color="primary" size="small" onClick={(event) => {this.handlingUpdate(post.id, this.state.title, this.state.content)}}>수정하기</Button>
            </CardActions>
            </Card>
            </div>
            )
          }

        </div>
      </Container>
    </div>
    
  );
  }
}

export default App;
