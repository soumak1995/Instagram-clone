import React,{useEffect, useState} from 'react';
import Post from './component/Post'
import './App.css';
import {db} from './firbase.js'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function App() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [post,setPost]=useState([]);
  const [open,setOpen]=useState(false);
  useEffect(()=>{
      db.collection('posts').onSnapshot(snapshot=>{
        setPost(snapshot.docs.map(doc=>({id:doc.id,
        post:doc.data()
      })))
      })
  },[])
  console.log(post);

  return (
    <div className="App">
       <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
     <div style={modalStyle} className={classes.paper}>
       <h2>I'm a modal</h2>
</div>
      </Modal>
      <div className="App__header">
           <img className="App__headerImage"src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo"/>
      </div>
      <Button onClick={e=>setOpen(true)} >Sign Up</Button>
     {
       post.map(({id,post})=>(
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
  ))

     }
      
    </div>
  );
}

export default App;
