import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Read, Update } from "../../functions/todolist";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';


const EditList = () => {
  const params = useParams();
  const [data, setData] = useState({
    todoName:'',
    todoDate:'',
  });
  const [fileold, setFileold] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    loadData()
      .then(res => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const loadData = async () => {
    Read(params.id)
    .then((res) => {
      setData(res.data)
      setFileold(res.data.file)
    })
    .catch((err) => console.log(err));
  };

  const handleChange = (e)=>{
    //ส่งข้อมูล file
    if(e.target.name === 'file'){
        setData({
            ...data,
            [e.target.name]: e.target.files[0]
          })
    //ส่งข้อมูล text
    }else{
      setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
}
const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        console.log(data)
        console.log(fileold)
        const formWithImageData = new FormData()
        for(const key in data){
            formWithImageData.append(key,data[key])
        }
        formWithImageData.append('fileold', fileold)
        Update(params.id,formWithImageData)
          .then((res) => {
            console.log(res);
            navigate("/listdata");
          })
          .catch((err) => console.log(err));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div>
      <h1 align="center">Edit</h1>

      {/* form input */}
      <form onSubmit={handleSubmit} encType='multipart/form-data'
      align="center">
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          <TextField
            type="text"
            variant="outlined"
            label="List name"
            name='todoName'
            value={data.todoName}
            onChange={e => handleChange(e)}
          />
          <br />
          <TextField
            type="text"
            variant="outlined"
            label="Date"
            name='todoDate'
            value={data.todoDate}
            onChange={e => handleChange(e)}
          />
          <br />
          <TextField
          type='file'
            name='file'
            variant="outlined"focused
            label="Upload File"
            onChange={e => handleChange(e)}
          /> <br/>
          <Button variant="contained" type="submit" startIcon={<EditIcon />}>Edit Item</Button>
          <br />
        </Box>
      </form>
    </div>
  );
};

export default EditList;
