import React,{useEffect, useState} from 'react';
import Post from './component/Post'
import './App.css';
import {db} from './firebase.js'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button,Input } from '@material-ui/core';
import { SettingsSystemDaydreamOutlined } from '@material-ui/icons';
import { auth } from './firebase.js';
import ImageUpload from './component/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
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
  const [email,setEmail]=useState('');
  const [username,setUsrname]=useState('');
  const [user,setUser]=useState(null);
  const [password,setPassword]=useState('');
  const[openSignIn,setOpenSignIn]=useState(false);
  useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged((authUser)=>{
         if(authUser){
         console.log(authUser)
         setUser(authUser)
         }else{
           setUser(null);
         }
       });
       return ()=>{
        unsubscribe();
       }
  },[user,username])
  useEffect(()=>{
      db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
        setPost(snapshot.docs.map(doc=>({id:doc.id,
        post:doc.data()
      })))
      })
  },[]);
const SignUp=(e)=>{
  e.preventDefault();
  
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    return authUser.user.updateProfile({
      displayName:username
    }) 
  })
  .catch((error)=>alert(error.message))
  setOpen(false);
}
  console.log(post);
const SignIn=(e)=>{
  e.preventDefault();
  auth.signInWithEmailAndPassword(email,password)
  .catch((err)=>alert(err))
   setOpenSignIn(false)
}
  return (
    <div className="App">
       <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
     <div style={modalStyle} className={classes.paper}>
       <form className="App__signup">
       <center>
       <img className="App__headerImage"
       src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
       alt="logo"/>
         </center>
       <Input placeholder="username"
       type="text"
       value={username}
       onChange={e=>setUsrname(e.target.value)}
       />
       <Input placeholder="email"
       type="text"
       value={email}
       onChange={e=>setEmail(e.target.value)}
       />
       <Input placeholder="password"
       type="text"
       value={password}
       onChange={e=>setPassword(e.target.value)}
       />
       <Button onClick={SignUp}>Sign Up</Button>
       </form>
</div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
     <div style={modalStyle} className={classes.paper}>
       <form className="App__signup">
       <center>
       <img className="App__headerImage"
       src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
       alt="logo"/>
         </center>
       <Input placeholder="email"
       type="text"
       value={email}
       onChange={e=>setEmail(e.target.value)}
       />
       <Input placeholder="password"
       type="text"
       value={password}
       onChange={e=>setPassword(e.target.value)}
       />
       <Button onClick={SignIn}>Sign In</Button>
       </form>
</div>
      </Modal>
      <div className="App__header">
           <img className="App__headerImage"src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo"/>
           {
        user ?(
          <Button onClick={()=>auth.signOut()}>Logout</Button>
        ):(
        <div className="App__loginContainer">
          <Button onClick={e=>setOpenSignIn(true)} >Sign In</Button>
          <Button onClick={e=>setOpen(true)} >Sign Up</Button>
        </div>
        )}
      </div>
     <div className="App__posts">
       <div className="App_postsLeft">
              {
              post.map(({id,post},index)=>(
                <Post postId={id} key={id} 
                user={user} 
                username={post.username} 
                caption={post.caption} 
                imageUrl={post.imageUrl} />
          ))

            }
       </div>
       <div className="App_postsRight" > 
            <InstagramEmbed
        url='https://instagr.am/p/Zw9o4/'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
   
       </div>
  
     </div>
   
     {user?.displayName?(
        <ImageUpload username={user.displayName}/>
      ):(
        <h3>Sorry you need to login to upload</h3>
      )}
      
    </div>
  );
}

export default App;
