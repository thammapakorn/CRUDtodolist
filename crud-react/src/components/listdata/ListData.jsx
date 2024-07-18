import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { GetData,Delete } from "../../functions/todolist";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const ListData = ()=>{

  //useState
  const [data, setData] = useState([])

  useEffect(()=>{
  //เรียกใช้
      loadData()
  },[])

  //ดึงข้อมูล db
  const loadData = async () =>{
    //เมื่อมีการดึงข้อมูล(get)ควรใช้ await
    GetData()
    //แสดงข้อมูล
    .then((res)=> setData(res.data))
    .catch((err)=> console.log(err))
  }

  // ลบข้อมูล
  const handleDelete = async (id)=>{
    Swal.fire({
      title: "Do you want to delete this item?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
          (Delete(id))
          .then(res=>{
          console.log(res.data)
          loadData()
          })
          .catch((err)=> console.log(err))
      } else if (result.isDenied) {
        Swal.fire("Changes are not deleted", "", "info");
      }
    });
    }

  return (
    <body sx={{ m: 0 }}>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{p : 2 }}>
        <Box display="flex" p={1}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h6' gutterBottom component="div">
              List Data
            </Typography>
          </Box>
          <Box>
          <Link to={'/create'}>
            <Button variant="contained" startIcon={<AddIcon />}>Create List</Button>
          </Link>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell align="right">List Name</TableCell>
                <TableCell align="right" >Create Date</TableCell>
                <TableCell align="right">File upload</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                // loop ข้อมูลจาก db
                data ? data.map((item, index)=>
                  <TableRow key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <TableCell component="th" scope="item">
                  {index + 1}
                  </TableCell>
                      <TableCell align="right">{item.todoName}</TableCell>
                      <TableCell align="right">{item.todoDate}</TableCell>
                      <TableCell align="right">{item.file}</TableCell>
                      <TableCell align="right">
                      <Link to={'/edit/'+item._id}>
                        <Button variant="contained" startIcon={<EditIcon />}>Edit</Button> &nbsp;
                      </Link>
                      <Button onClick={()=>handleDelete(item._id)} variant="outlined" startIcon={<DeleteIcon />} color="error">Delete</Button>
                  </TableCell>
            </TableRow> 
                )
                :null
              }               
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
    </body>
  );
}

export default ListData