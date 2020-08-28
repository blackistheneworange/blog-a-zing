import React from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {IonApp, IonContent, IonItem, IonInput, IonLabel, IonButton, IonHeader, IonTitle, IonAlert} from '@ionic/react';
import './css/Login.css';

import {server_url} from '../config';
import Header from '../components/common/Header';

const Register:React.FC =()=>{

  const history=useHistory();

  const [details,setDetails] = React.useState({
    username:'',
    password:'',
    dob:''
  })
  const [error,setError] = React.useState('')

  const btnRef:any = React.useRef();

  const handleChange = (event:any)=>{
    setDetails({...details,[event.target.name]:event.target.value})
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    setError('')
    btnRef.current.disabled=true;

    axios.post(server_url+'register',details)
    .then(res=>{
      setDetails({...details,username:'',password:'',dob:''})
      history.push('/login');
    })
    .catch(err=>{
      const error = err.response?err.response.data:err;
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
	  <IonTitle>Register</IonTitle>
	</IonHeader>
        <form onSubmit={handleSubmit}>
          <IonItem>
	    <IonInput placeholder="Username" value={details.username} name="username" type="text" onIonChange={handleChange} required/>
	  </IonItem>

	  <IonItem>
	    <IonInput placeholder="Password" value={details.password} name="password" onIonChange={handleChange} type="password" required/>
	  </IonItem>

	  <IonItem>
	    <IonLabel>Date Of Birth</IonLabel>
	    <IonInput placeholder="Date Of Birth" value={details.dob} name="dob" onIonChange={handleChange} type="date" required/>
	  </IonItem>

	  <IonButton expand="block" ref={btnRef} type="submit">Register</IonButton>
	  <IonButton expand="block" color="light" routerLink="/login">Login</IonButton>
	  

	</form>
      </IonContent>

      <IonAlert
          isOpen={error!==''?true:false}
	  onDidDismiss={() => setError('')}
	  header={'Register Failed'}
	  message={error}
	  buttons={['Ok']}
      />
    </IonApp>
    
  )

}

export default Register;
