import React from 'react';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import {server_url} from '../config';
import {IonApp, IonContent, IonItem, IonText, IonTitle, IonButton, IonHeader, IonCard, IonImg, IonCardTitle, IonCardContent, IonSpinner} from '@ionic/react';

import {pin} from 'ionicons/icons';
import './css/Home.css';

import Header from '../components/common/Header';

interface Props {
  username:string;
}

const Home:React.FC<Props> =({username})=>{

  const history=useHistory();

  const [blogs,setBlogs] = React.useState<any>({})
  const [loading,setLoading] = React.useState(true)

  React.useEffect(()=>{
    axios.get(server_url+'blog/'+username)
    .then(res=>{
      setBlogs(res.data)
      
    })
    .catch(err=>{
      alert(err)
    })
    .finally(()=>{
      setLoading(false)
    })

  },[])

  const handleUpdate=(e:any)=>{

    history.push({
      pathname:"/blog/update",
      state:{blog:blogs[e.target?.id],id:e.target?.id}
    })
  }

  const handleDelete=(e:any)=>{
    
    const id = e.target?.id;
    axios.delete(server_url+'blog/'+username+'/'+e.target?.id)
    .then(res=>{
      const temp:any={}
      Object.keys(blogs).forEach((key,i)=>{
        if(key!==id){
	  temp[key]=blogs[key];
	}
      })
      setBlogs(Object.assign({},temp))
    })
    .catch(err=>{
      alert(err)
    })
  }



  return(
    <IonApp>
      <Header/>
      <IonContent className="ion-padding">
        <IonHeader className="ion-padding">
          <IonTitle color="primary" className="ion-text-center">My Blogs</IonTitle>
	</IonHeader>


	{Object.keys(blogs).length>0 ? Object.keys(blogs).map((key,i)=>{
	  if(blogs[key]!==undefined && blogs[key].title!==undefined){
	  return(
	  <IonCard key={key}>
	      <IonItem lines="none" style={{marginTop:'12px'}}>
	          <IonCardTitle>{blogs[key].title}</IonCardTitle>
		  <IonButton onClick={handleUpdate} id={key} fill="outline" className="ion-margin-left">Edit</IonButton>
		  <IonButton onClick={handleDelete} id={key} fill="outline" className="ion-margin-left">Delete</IonButton>
	      </IonItem>
	      <IonCardContent>
	        <IonImg src={blogs[key].image}/>
	        <IonText>{blogs[key].description}</IonText>
	      </IonCardContent>
	  </IonCard>
	  )
	  }
	  else{return null}}
	  )
	  :
	  <div style={{textAlign:"center",marginTop:'120px'}}>
	    {!loading?
	    <h4>No Blogs to display. <Link to="/blog/create">Create one</Link> now</h4>
	    :
	    <IonSpinner className="ion-text-center" />
	    }
	  </div>
	  }
	
      </IonContent>
    </IonApp>
  )

}

export default Home;
