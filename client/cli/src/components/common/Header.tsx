import React from 'react';
import {IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle} from '@ionic/react';


const Header:React.FC = ()=>{

  return(
    <IonHeader>
      <IonToolbar color='primary'>
        <IonButtons slot="start">
	  <IonMenuButton/>
	</IonButtons>
	<IonTitle>Blog-A-Zing</IonTitle>
      </IonToolbar>
    </IonHeader>
  )

}

export default Header;
