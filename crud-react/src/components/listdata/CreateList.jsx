import React, { useEffect, useState } from "react";
import { Create, GetData } from "../../functions/todolist";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

const CreateList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [form, setForm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    GetData()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    //ส่งข้อมูล file
    if (e.target.name === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0],
      });
      //ส่งข้อมูล text
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };
  // เพิ่มข้อมูล
  const handleSubmit = async (e) => {
    e.preventDefault();
    //upload file

    Swal.fire({
      title: "Do you want to create?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Created",
      denyButtonText: `Create Failed`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        const formWithImageData = new FormData();
        for (const key in form) {
          formWithImageData.append(key, form[key]);
        }
        Create(formWithImageData)
          .then((res) => {
            console.log(res.data);
            navigate("/listdata");
          })
          .catch((err) => console.log(err));
      } else if (result.isDenied) {
        Swal.fire("Cancel Create", "", "info");
      }
    });
  };
  return (
    <div align="center">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h1>Add List.</h1>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
        >
          <TextField
            type="text"
            label="What do you want to do??"
            variant="outlined"
            name="todoName"
            onChange={(e) => handleChange(e)}
          />{" "}
          <br />
          <TextField
            type="text"
            label="Date??"
            variant="outlined"
            name="todoDate"
            onChange={(e) => handleChange(e)}
          />{" "}
          <br />
          <TextField
            type="file"
            name="file"
            variant="outlined"
            focused
            label="Upload File"
            onChange={(e) => handleChange(e)}
          />{" "}
          <br />
          <Button variant="contained" type="submit" startIcon={<AddIcon />}>
            Add Item
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateList;
