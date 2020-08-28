import { IonContent, IonApp, IonItem, IonInput, IonTextarea, IonItemDivider, IonButton, IonTitle, IonHeader } from '@ionic/react';
import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import {server_url} from '../config';

import Header from '../components/common/Header';
import './css/Create.css';

interface Props {
  username:string;
}

const Create: React.FC<Props> = ({username}) => {

  const history=useHistory();
  const location=useLocation<{blog:any,id:string}>();

  const [blogDetails,setBlogDetails]=React.useState({
    title:'',
    description:'',
    image:''
  })
  const [isCreating, setIsCreating] = React.useState(false)
  const submitBtn:any = React.useRef();

  React.useEffect(()=>{
    const updateObj:any=location.state;
    if(!updateObj || !updateObj.blog){
      history.goBack()
    }
    else{
      setBlogDetails(updateObj.blog)
    }
  },[])

  const handleChange = (e:any)=>{
    if(e.target.name==="image"){
      setBlogDetails({...blogDetails,image:e.target.files[0]})
    }
    else{
      setBlogDetails({...blogDetails,[e.target.name]:e.target.value})
    }
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    submitBtn.current.disabled=true;

    const fd = new FormData()
    if(blogDetails.title!==''){
      fd.append('title',blogDetails.title)
    }
    if(blogDetails.image!==''){
      fd.append('image',blogDetails.image)
    }
    if(blogDetails.description){
      fd.append('description',blogDetails.description)
    }
    
    axios.put(server_url+'blog/'+username+'/'+location.state.id,fd)
    .then(res=>{
      setBlogDetails({title:'',image:'',description:''})
      history.push('/blog/home')
      
    })
    .catch(err=>{
      alert(err)
    })
    .finally(()=>{
      if(submitBtn && submitBtn.current){
        submitBtn.current.disabled=false
      }
    })
  }


  return (
    <IonApp>
      <Header/>

      <IonContent className="ion-padding create-page">
        <IonHeader className="ion-padding">
          <IonTitle color="primary" className="ion-text-center">Edit A Blog</IonTitle>
	</IonHeader>

	<form onSubmit={handleSubmit}>
        <IonItemDivider>Enter blog title</IonItemDivider>
        <IonItem lines="none">
	  <input placeholder="Blog title" name="title" value={blogDetails.title} onChange={handleChange} required/>
	</IonItem>
	<IonItemDivider>Upload blog image</IonItemDivider>
	<IonItem lines="none">
	  <input type="file" name="image" onChange={handleChange}/>
	</IonItem>
	<IonItemDivider>Enter blog description</IonItemDivider>
	<IonItem lines="none">
	  <textarea placeholder="Blog description" name="description" value={blogDetails.description} onChange={handleChange} required></textarea>
	</IonItem>

	<IonButton ref={submitBtn} expand="block" type="submit">Update</IonButton>
	</form>
      </IonContent>
    </IonApp>
  );
};

export default Create;
