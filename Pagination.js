import React, { useEffect } from 'react';
import { useState } from 'react';

function Pagination() {
    const [data,setData]=useState([]);
    const [searchValue,setSearchValue]=useState("");
    const [presentPage,setPresentPage]=useState(1);
    const [dataPerPage]=useState(5);
    // const [sort,setSort] = useState("AO");
    

    const pages = [];
    for(let i=1;i<=Math.ceil(data.length/dataPerPage);i++){
      pages.push(i);
      console.log(pages);
    }
    const handleClick= (pages)=>{
      // const value=e.target.value;
      setPresentPage(pages)
    }
    const handlePrevious = ()=>{
      setPresentPage(presentPage-1)
    }
    const handleNext = ()=>{
      setPresentPage(presentPage+1)
    }    
      const indexOfLastData = presentPage * dataPerPage;
      const indexOfFirstData = indexOfLastData - dataPerPage;
      const currentData = data.slice(indexOfFirstData,indexOfLastData);

      // const pageNumber = pages.map((num)=>{
      //   return( onClick={(pages)=>(handleClick())} [num] );
      // })
      // const sorting = (col)=>{
      //   if(sort === "AO"){
      //     const sorted = [...data].order((a,b)=>
      //     a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
      //     setData(sorted);
      //     setSort("DO");
      //   }
      //   if(sort === "DO"){
      //     const sorted = [...data].order((a,b)=>
      //     a[col].toLowerCase() < b[col].toLowerCase() ? -1 : 1);
      //     setData(sorted);
      //     setSort("AO");
      //   }
      // }
    
    useEffect(()=>{
        fetch('http://localhost:4000/values')
        .then(response=>response.json())
        .then(result=>setData(result));
        // console.log(data);
    },[])
    
  return (
    <div>
    
   <input type="text" placeholder='search here' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} ></input> 
  
    
      <table className='one'>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>AGE</th>
          <th>EMAIL</th>

          {/* <th onClick={()=>sorting("id")}>ID</th>
          <th onClick={()=>sorting("name")}>NAME</th>
          <th onClick={()=>sorting("age")}>AGE</th>
          <th onClick={()=>sorting("email")}>EMAIL</th>  */}
          
        </tr>
        {
          data && data.length>0 ? currentData.filter((item)=>{
            if(searchValue === " "){
              return item;
            } else if(item.name.toLowerCase().includes(searchValue.toLowerCase()))
            {
              return item;
            }
          }).map(value=>(
          <tr>
            <td>{value.id}</td>
            <td>{value.name}</td>
            <td>{value.age}</td>
            <td>{value.email}</td>
          </tr>)): 'no data'
        }
      </table>
      
    
      <div > 
      {/* {pageNumber} */}
      {
        pages.map((num)=>{
        return( <div>
         <button className="pageno" onClick={()=>handleClick(num)}>{num}
         </button>
         </div> );
         
      })
      }
      <button className='btn' onClick={handlePrevious} disabled={presentPage === pages[0] }>previous</button>
      <button className='btn' onClick={handleNext} disabled={presentPage === pages[pages.length-1]}>next</button>
      </div>      
    </div>
  )
}

export default Pagination;

