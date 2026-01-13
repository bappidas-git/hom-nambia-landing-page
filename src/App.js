import React from "react";
import './App.css';

const App = ()=>{
  return (
    <div style={{width:'100%', height:'100vh', display:'grid', placeContent:'center'}}>
      <p style={{width:'400px', height:'40px', background:'#009d83', color:'#fff', display:'grid', placeContent:'center'}}>
        BLANK FRAMEWORK
      </p><br/>

      <code style={{width:'400px', height:'40px', background:'#333', color:'#fff', display:'grid', placeContent:'center', marginBottom:'5px'}}>
        npm install
      </code>
      <code style={{width:'400px', height:'40px', background:'#333', color:'#fff', display:'grid', alignItems:'center', justifyContent:'start', padding:'5px', marginBottom:'5px'}}>
        Created using 'create-react-app'
      </code>
      <code style={{width:'400px', height:'40px', background:'#333', color:'#fff', display:'grid', alignItems:'center', justifyContent:'start', padding:'5px', marginBottom:'5px'}}>
        React Version '18.2.0'
      </code>
      <code style={{width:'400px', height:'40px', background:'#333', color:'#fff', display:'grid', alignItems:'center', justifyContent:'start', padding:'5px', marginBottom:'5px'}}>
        react-router-dom Version '6.22.3'
      </code>
      <code style={{width:'400px', height:'40px', background:'#333', color:'#fff', display:'grid', alignItems:'center', justifyContent:'start', padding:'5px', marginBottom:'5px'}}>
        Runs best on NODE Version '18.19.0'
      </code>
      <code style={{width:'400px', height:'40px', background:'#333', color:'#fff', display:'grid', alignItems:'center', justifyContent:'start', padding:'5px', marginBottom:'5px'}}>
        Runs best on NPM Version '10.2.3'
      </code>
      
    </div>    
  );
}

export default App;
