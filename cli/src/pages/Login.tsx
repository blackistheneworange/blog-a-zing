import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {server_url} from '../config';
import {IonApp, IonContent, IonItem, IonInput, IonLabel, IonButton, IonHeader, IonTitle, IonAlert } from '@ionic/react';
import './css/Login.css';

import Header from '../components/common/Header';

interface Props{
  changeLogState:(username:string)=>void;
}

const Login:React.FC<Props> =(props:Props)=>{

  const history=useHistory();
  const [details,setDetails]=React.useState({
    username:'',
    password:''
  })
  const [error,setError]=React.useState('');
  const btnRef:any = React.useRef();


  const handleChange=(e:any)=>{
    setDetails({...details,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    btnRef.current.disabled=true;

    setError('')
    axios.post(server_url+'login',details)
    .then(res=>{
      props.changeLogState(details.username)
      setDetails({...details,username:'',password:''})
      history.push('/blog/home')
    })
    .catch(err=>{
      const error=err.response?err.response.data:err;
      setError(error)
    })
    .finally(()=>{
      if(btnRef.current){
        btnRef.current.disabled=false;
      }
    })
  }

  return(
    <IonApp>
      <Header/>
      <IonContent className="ion-padding">
        <IonHeader className="ion-text-center ion-margin-top ion-margin-bottom ion-padding">
	  <IonTitle>Login</IonTitle>
	</IonHeader>
        <form onSubmit={handleSubmit}>
          <IonItem>
	    <IonInput placeholder="Username" name="username" type="text" value={details.username} onIonChange={handleChange} required/>
	  </IonItem>

	  <IonItem>
	    <IonInput placeholder="Password" type="password" name="password" value={details.password} onIonChange={handleChange} required/>
	  </IonItem>

	  <IonButton expand="block" ref={btnRef} type="submit">Login</IonButton>
	</form>
	<IonButton expand="block" color="light" routerLink="/register">Register</IonButton>
	
      </IonContent>

      <IonAlert
          isOpen={error!==''?true:false}
	  onDidDismiss={() => setError('')}
	  header={'Login Failed'}
          message={error}
          buttons={['Ok']}
        />
    </IonApp>
    
  )

}

export default Login;
