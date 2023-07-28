import { useState,useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import {Box,TextField, Typography,Autocomplete, Button,Link} from '@mui/material'; 
import {makeStyles} from "@mui/styles"

const useStyles = makeStyles((theme)=>({
  root:{
    marginLeft: '10%',
    marginRight: '10%',
    backgroundColor: "#faf9e8"
  },
  header:{
    color: "red",
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
  }

}))
function App () {
  //class
  const classes = useStyles();

  //variable
  const [data, setData] = useState({});
  const [input, setInput] = useState("");
  const [host,setHost] = useState("");
  const [idLive,setIdLive] = useState("");
  const [desLink,setDesLink] = useState("");
  const URL_SHEET = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGtrWsWr1Q8h2BVNB97M8P4J9xiU3R-aBGJOGg3Yj5Y2XJWPgTTYWSuM0v6ZZoWs5I8ZkYGKnVVN1G/pub?output=csv';
  
  const getListLives = async () => {
    Papa.parse(URL_SHEET, {
      download: true,
      header: true,
      dynamicTyping: false,
      complete: function (results) {
        setData(results.data);
      }
    });
  };

  useEffect(() => {
    getListLives();
  },[]);

  const listLives = Array.from(data);
  let listName = listLives.map(a => a.LiveName);

  const matchIDLive = (param) =>{
    for (let i in listLives){
      if (listLives[i].LiveName === param){
        setIdLive(listLives[i].IdLive)
      }
    }
  }
  
  const handleClick = () => {
    let pattern =  'html?';
    if (input.includes(pattern) && host!=""){
      let firstParam =  input.split(pattern)[0];
      let secondParam = "from=livestream&c=live&liveChannel=";
      let thirdParam = idLive;
      let fourthParam = firstParam.split('-i')[1].split('-s')[0];
      setDesLink(firstParam + pattern + secondParam + thirdParam + fourthParam);
    }
    else{
      alert('Nhập đúng cú pháp link hoặc chưa chọn host');
    }
  }

  return (
    <div className={classes.root}>
      <Typography 
        className={classes.header} 
        sx={{ fontStyle: 'default', m: 1, fontSize: 'h4.fontSize',fontWeight: 'bold' }}
        >
          Tạo link áp mã live
      </Typography>
      <Typography 
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ fontStyle: 'oblique', m: 1, fontSize: 'h6.fontSize' }}
        >
          Add link vào ô dưới
      </Typography>
      <Box
        component="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          '& > :not(style)': { m: 1, width: '80%'},
        }}
        noValidate
        autoComplete="off"
      >
        <TextField 
          id="outlined-basic" 
          value = {input}
          variant="outlined"
          multiline
          maxRows={4}
          onChange = {(e)=> {setInput(e.target.value)}}
        />
      </Box>
      <Box
        component="form"
        display="flex"
        justifyContent="center"
      >
        <Autocomplete
          value = {host}
          onChange={(event,newValue) => {
            setHost(newValue);
            matchIDLive(newValue);
          }}
          id="combo-box-demo"
          options={listName}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="LiveName" />}
        />
      </Box>
      <Box
        component="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          '& > :not(style)': { m: 5, width: '25%'},
        }}
      >
        <Button
          onClick={handleClick}
          variant='outlined'
          size='medium'
          color="error"
        >
          <Typography 
            sx={{ fontStyle: 'default', m: 1, fontSize: 'h6.fontSize', fontWeight: '10px' }}
            >
              TẠO LINK
          </Typography>
        </Button>
      </Box>
      <Box
        component="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          '& > :not(style)': { m: 1, width: '75%'},
        }}
      >
        <Link 
          href={desLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {desLink}
        </Link>
      </Box>
    </div>
  );
}

export default App;
