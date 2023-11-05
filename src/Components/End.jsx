import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setPage } from '../Redux/pageSlice'
import { resetCelbration, setCelbration, setReset } from '../Redux/scoreSlice'

function End() {
  const score=useSelector((state)=>state.scoreSlice.score)
  const dispatch = useDispatch();
  useEffect(() => {
    if (score >= 5) {
      dispatch(setCelbration()); // Correct dispatching of the action
    }
  }, [score, dispatch]);
  return (
    
    <>
 <div className="d-flex w-100 align-items-center flex-column" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
  <h2 className='fw-bolder'>You have earned a total of</h2>
  <h2 className='fw-bolder'><span className='text-danger'>{score}</span> points out of <span className='text-danger'>10</span>.</h2>
  <h2 className='mt-4 text-danger'>
  {score <= 5
    ? 'Keep trying! 🤞'
    : score <= 7
    ? 'Good job! 👏'
    : 'Congratulations!! 🎉'}
</h2>

  <button className="mt-4 btn btn-success" onClick={() => { dispatch(setPage("home")); dispatch(setReset());dispatch(resetCelbration()) }}>Play Again</button>
</div>


    </>
  )
}

export default End