import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import Select from 'react-select'

//b_name: "Zazie"slug: "kfc_zazie_gh"vb_name: 

const App = () => {
  const [data, setData] = useState([])
  const [filteredDataa, setFilteredData] = useState([])
  const [bName, setBname] = useState([])
  const [slug, setSlug] = useState([])
  const [vbName, setVbName] = useState([])

  //selected state of the react select dropdown
  const [bNameSelected, setBnameSelected] = useState([])
  const [slugNameSelected, setSlugNameSelected] = useState([])
  const [vbNameSelected, setVbNameSelected] = useState([])

  const columns = [
    {
        name: 'B_Name',
        selector: row => row.b_name,
    },
    {
        name: 'Slug',
        selector: row => row.slug,
    },
    {
        name: 'VB_Name',
        selector: row => row.vb_name,
    },
];

  useEffect(()=>{
    
    (async function() {
      const {data} = await axios.get('https://us-central1-arboreal-vision-339901.cloudfunctions.net/get_filter_values')
      
      setData(data.data)
      setFilteredData(data.data)
      
      let bnameArr = []
      let slugArr = []
      let vbNameArr = []

      data.data.map((e)=>{
        bnameArr = [...bnameArr, {value:e.b_name, label:e.b_name}]
        slugArr = [...slugArr, {value:e.slug, label:e.slug}]
        vbNameArr=[...vbNameArr, {value:e.vb_name, label:e.vb_name}]
      })

      bnameArr = [...new Set(bnameArr.map((e)=>JSON.stringify(e)))].map((e)=>JSON.parse(e))
      slugArr = [...new Set(slugArr.map((e)=>JSON.stringify(e)))].map((e)=>JSON.parse(e))
      vbNameArr = [...new Set(vbNameArr.map((e)=>JSON.stringify(e)))].map((e)=>JSON.parse(e))



      setBname(bnameArr)
      setSlug(slugArr)
      setVbName(vbNameArr)

    })()
    
  },[])

  useEffect(()=>{
    if(bNameSelected!==null || vbNameSelected!=null || slugNameSelected!==null){
      let bnameArr = []
      let slugArr = []
      let vbNameArr = []

      filteredDataa.map((e)=>{
        if(bNameSelected.length==0){
          bnameArr = [...bnameArr, {value:e.b_name, label:e.b_name}]
        }else{
          bnameArr=bName
        }
        if(slugNameSelected.length==0){
          slugArr = [...slugArr, {value:e.slug, label:e.slug}]
        }else{
          slugArr=slug
        }
        if(vbNameSelected.length==0){
          vbNameArr=[...vbNameArr, {value:e.vb_name, label:e.vb_name}]
        }else{
          vbNameArr=vbName
        }
      })

      bnameArr = [...new Set(bnameArr.map((e)=>JSON.stringify(e)))].map((e)=>JSON.parse(e))
      slugArr = [...new Set(slugArr.map((e)=>JSON.stringify(e)))].map((e)=>JSON.parse(e))
      vbNameArr = [...new Set(vbNameArr.map((e)=>JSON.stringify(e)))].map((e)=>JSON.parse(e))



      setBname(bnameArr)
      setSlug(slugArr)
      setVbName(vbNameArr)

    }
    if(bNameSelected.length==0 && vbNameSelected.length==0 && slugNameSelected.length==0){
      setFilteredData(data)
    }
  },[bNameSelected, vbNameSelected, slugNameSelected, filteredDataa])

  useEffect(()=>{
    if(bNameSelected.length!=0){
      let newData = filteredDataa;
      let filteredData = newData.filter((e)=>(bNameSelected.map((o)=>o.label)).includes(e.b_name))
      console.log(filteredData)
      setFilteredData(filteredData)
    }else{
      setFilteredData(data)
    }
  },[bNameSelected])

  useEffect(()=>{
    if(slugNameSelected.length!=0){
      let newData = filteredDataa;
      let filteredData = newData.filter((e)=>(slugNameSelected.map((o)=>o.label)).includes(e.slug))
      console.log(filteredData)
      setFilteredData(filteredData)
    }else{
      setFilteredData(data)
    }
  },[slugNameSelected])

  useEffect(()=>{
    if(vbNameSelected.length!=0){
      let newData = filteredDataa;
      let filteredData = newData.filter((e)=>(vbNameSelected.map((o)=>o.label)).includes(e.vb_name))
      console.log(filteredData)
      setFilteredData(filteredData)
    }else{
      setFilteredData(data)
    }
  },[vbNameSelected])


  return (
    <div>
      <Select onChange={setBnameSelected} isMulti options={bName}/>
      <Select onChange={setSlugNameSelected} isMulti options={slug}/>
      <Select onChange={setVbNameSelected} isMulti options={vbName}/>

      <DataTable
            columns={columns}
            data={filteredDataa}
        />
    </div>
  )
}

export default App