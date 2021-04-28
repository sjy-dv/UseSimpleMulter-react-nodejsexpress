import { Component } from "react";
import "./App.css";
import axios from "axios";
import List from "./component/List";

class App extends Component {
  constructor() {
    super();
    this.state = {
      file: "",
      filename: "",
      file2: "",
      filename2: "",
      singlefile: "",
      arrayfile: [],
      imgsingle: [],
      imgarray: [],
      imgfields: [],
      singlevideo: "",
      progress: 0,
    };
  }

  SingleChange = (e) => {
    this.setState({
      singlefile: e.target.files[0],
    });
  };
  VideoChange = (e) => {
    this.setState({
      singlevideo: e.target.files[0],
    });
  };

  FileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.value,
    });
  };
  FileChange2 = (e) => {
    this.setState({
      file2: e.target.files[0],
      filename2: e.target.value,
    });
  };

  ArrayChange = (e) => {
    this.setState({ arrayfile: e.target.files });
  };

  fieldsupload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", this.state.file);
    formData.append("img2", this.state.file2);

    await axios.post("/api/multer/fieldsupload", formData);

    alert("uploading....");
    window.location.reload();
  };

  singleupload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", this.state.singlefile);
    await axios
      .post("/api/multer/singleupload", formData)
      .then((res) => console.log(res));

    alert("uploading....");
    window.location.reload();
  };

  arrayupload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of this.state.arrayfile) {
      formData.append("imgs", file);
    }
    await axios
      .post("/api/multer/arrayupload", formData)
      .catch((err) => console.log(err));
  };

  videoupload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", this.state.singlevideo);
    await axios
      .post("/api/multer/videoupload", formData, {
        onUploadProgress: (data) => {
          this.setState({
            progress: Math.round((100 * data.loaded) / data.total),
          });
          console.log(this.state.progress);
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  async componentDidMount() {
    await axios.get("/api/multer/singlelist").then((res) => {
      this.setState({
        imgsingle: res.data,
      });
    });
    await axios.get("/api/multer/fieldslist").then((res) => {
      this.setState({
        imgfields: res.data,
      });
    });
    await axios.get("/api/multer/arraylist").then((res) => {
      let arr_Data = [];
      for (let i = 0; i < res.data.length; i++) {
        for (let j = 0; j < res.data[i].img.split(",").length; j++) {
          arr_Data.push(res.data[i].img.split(",")[j]);
        }
      }
      this.setState({
        arrayfile: arr_Data,
      });
    });
  }

  render() {
    let imgobj = this.state.arrayfile;
    let imglength = this.state.arrayfile.length;
    return (
      <div className="App">
        <h1>Upload Files_Single</h1>
        <input
          type="file"
          name="file"
          file={this.state.singlefile}
          onChange={this.SingleChange}
        />
        <button onClick={this.singleupload}>uplaod</button>
        <hr />

        <h1>Upload Files_Fields</h1>
        <input
          type="file"
          name="file"
          file={this.state.file}
          value={this.state.filename}
          onChange={this.FileChange}
        />
        <input
          type="file"
          name="file2"
          file={this.state.file2}
          value={this.state.filename2}
          onChange={this.FileChange2}
        />
        <button onClick={this.fieldsupload}>uplaod</button>
        <hr />
        <h1>Upload Files_Array</h1>
        <input
          type="file"
          multiple
          file={this.state.arrayfile}
          onChange={this.ArrayChange}
        />
        <button onClick={this.arrayupload}>uplaod</button>
        <hr />

        <h1>Upload Video</h1>
        <input
          type="file"
          name="file"
          file={this.state.singlevideo}
          onChange={this.VideoChange}
        />
        <button onClick={this.videoupload}>uplaod</button>
        <h3> {this.progress} % </h3>
        <hr />

        <h1>Upload File List_single</h1>
        {this.state.imgsingle
          ? this.state.imgsingle.map((k) => {
              return <List key={k.id} img={k.img} />;
            })
          : "DB NOT CONNECT"}
        <hr />
        <h1>Upload File List_fields</h1>
        {this.state.imgfields
          ? this.state.imgfields.map((k) => {
              return <List key={k.id} img={k.img} img2={k.img2} />;
            })
          : "DB NOT CONNECT"}
        <hr />
        <h1>Upload File List_Array</h1>
        {(function () {
          let tagarray = [];
          for (let i = 0; i < imglength; i++) {
            let img = <img src={imgobj[i]} width={200} height={200} alt="" />;
            tagarray.push(img);
          }
          return tagarray;
        })()}
      </div>
    );
  }
}

export default App;
