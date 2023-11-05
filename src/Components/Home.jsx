import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { setPage } from '../Redux/pageSlice'
import { setCategory,setDifficulty } from '../Redux/categroySlice'
import axios from 'axios'

import { instance } from '../Axios/apiCall'


function Home() {
  const [category,setCategory1]=useState({})
  const [selectedCategory, setSelectedCategory] = useState(""); // Create a state for selected category
  // const [selectedDifficulty, setSelectedDifficulty] = useState(""); // Create a state for selected difficulty

  const fetchCategory=async()=>{
    const response=await instance.get('api_category.php')
    setCategory1(response.data.trivia_categories);
  }
  useEffect(()=>{
    fetchCategory()
 
     },[])
     const handleStartQuiz = () => {
      dispatch(setCategory(selectedCategory)); // Dispatch the action to update the category in Redux store
      // dispatch(setDifficulty(selectedDifficulty)); // Dispatch the action to update the difficulty in Redux store
      dispatch(setPage("quiz"));
    }
    //  console.log(category);
  const dispatch=useDispatch()
  return (
    <>
    <div className='w-100 d-flex flex-column  align-items-center'>
    <img className='img-fluid ' width={'170px'} src="https://media0.giphy.com/media/FPkVh03zNP0vwvH3mm/200w.gif?cid=82a1493b9c7zour1aox20485ivqa4igp3bcr8vq6yuc40rbg&ep=v1_gifs_related&rid=200w.gif&ct=s" alt="" />
    
    <p className='fs-5 fst-italic '>Select questions from the chosen category or choose random questions</p>
   <div className='d-flex p-3 w-75'>
   <select class="form-select w-100" placeholder='Pick a category' aria-label="Default select example" onChange={(e) => setSelectedCategory(e.target.value)} required>
      <option  selected> Random questions </option>
      {category.length > 0 && category.map((i) => (
  <option  key={i.id} value={i.id}>{i.name}</option>
))}

   </select>
   {/* <select class="form-select w-50" placeholder='Pick a difficult level' aria-label="Default select example" onChange={(e) => setSelectedDifficulty(e.target.value)}  required>
      <option  selected> Random questions </option>
      <option  selected>Easy</option>
      <option  selected>Medium</option>
      <option  selected>Hard</option>

   </select> */}

   </div>
   <p className='fst-italic '>We've got 10 exciting questions waiting for you!</p>
   <button onClick={handleStartQuiz} className="btn btn-success mt-2">Let's start</button>
   <div className='w-100 mt-4 d-flex flex-column  align-items-center '>
    <h5>General Instructions:</h5>
    <marquee className="fst-italic mt-2" behavior=" " direction="">1.Make sure to choose an answer for each question. Have fun and give it your best shot!!<span className='text-light'>......</span>2.After each question, there will be a short 2-second delay. Take a deep breath and get ready for the next challenge!
</marquee>
   </div>
    </div>
    </>
  )
}

export default Home