import { TextField } from "@mui/material";
import { useState } from "react";
import { createNewCategory } from "../../api/category";


const CreateCategory =()=>{

    const [inputCate, setInputCate] =useState("")
    const onChange =(e)=>{
        e.preventDefault()
        setInputCate(e.target.value)
    }

    const onSubmit =()=>{
        createNewCategory({name:inputCate})
        .then(response=>{
            console.log(response)
            setInputCate("")
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className="auth-box">
            <p className="graf--p bottom-margin-5">Let create our new Category!</p>
            <input
            value={inputCate}
            onChange={onChange}
            className="input-primary bottom-margin-2"
            placeholder="Category name"
            />
            <button 
            onClick={onSubmit}
            className="button-primary">Submit</button>
        </div>
    )
}

export default CreateCategory;