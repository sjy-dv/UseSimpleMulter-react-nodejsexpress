import {Component} from 'react';
import './App.css';
import axios from 'axios';
import List from './component/List';

class App extends Component {

  constructor(){
    super();
    this.state = {
      file : '',
      filename : '',
      file2 : '',
      filename2 : '',
      imgarray : []
    }
  }
  FileChange = (e) => {
    this.setState({
        file : e.target.files[0],
        filename : e.target.value
    });
  }
  FileChange2 = (e) => {
    this.setState({
        file2 : e.target.files[0],
        filename2 : e.target.value
    });
  };

  upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', this.state.file);
    formData.append('img2', this.state.file2);

    await axios.post('http://localhost:8081/api/multer/upload', formData);

    alert('uploading....');
    window.location.reload();
  };

  componentDidMount(){
    axios.get('http://localhost:8081/api/multer/list')
      .then(res => {
        this.setState({
          imgarray : res.data
        });
      });
  };

  render(){
  return (
    <div className="App">
    <h1>Upload Files</h1>
    <input type="file" name="file" file={this.state.file} value={this.state.filename} onChange={this.FileChange}/>
    <input type="file" name="file2" file={this.state.file2} value={this.state.filename2} onChange={this.FileChange2}/>  
    <button onClick={this.upload}>uplaod</button>
    <hr/>
    <h1>Upload File List</h1>
    {
      this.state.imgarray ?
      this.state.imgarray.map(k => {
        return (<List
          key = {k.id}
          img = {k.img}
          img2 = {k.img2}
          />)
      }) : "DB NOT CONNECT"
    }
    </div>
    );
  };
};

export default App;
