import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/createcontext";
export default function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [photo, setPhoto] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [blogs, setBlogs] = useState([]);
  const handleSubmit = () => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("photo", photo);

    formData.append("keywords", keywords);
    axios.post("http://localhost:8080/blogs/cblog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        alert("blogs added succesfully")

        setTitle("");
        setDescription("");
        setKeywords("");
        setPhoto(null);
        

      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            placeholder="Title"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="keywords"
            autoFocus={true}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Tell your story..."
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>


        <button type="button" onClick={handleSubmit}>Publish</button>
      </form>
    </div>
  );
}
