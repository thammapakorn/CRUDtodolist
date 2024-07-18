import axios  from "axios";

//function การทำงานของ FormListData

//ดูข้อมูลจาก db
export const GetData = async()=>{
    return await axios.get('http://localhost:5000/api/list/')
 }
//ปุ่มลบ
export const Delete = async(id)=>
    await axios.delete('http://localhost:5000/api/list/'+id)
//ปุ่มเพิ่มข้อมูล
export const Create = async(data)=>
    await axios.post('http://localhost:5000/api/list/',data)

//หน้า update
//ดูข้อมูลจาก db
export const Read = async(id)=>{
    return await axios.get('http://localhost:5000/api/list/'+id)
 }
 //ปุ่มupdate
 export const Update = async(id,data)=>
    await axios.put('http://localhost:5000/api/list/'+id, data)

 