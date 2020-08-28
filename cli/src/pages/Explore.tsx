import React from 'react';
import {IonApp, IonContent, IonItem, IonHeader, IonTitle, IonButton} from '@ionic/react';

import Header from '../components/common/Header';

const Explore:React.FC =()=>{

  return(
    <IonApp>
      <Header/>
      <IonContent className="ion-padding">
        <IonHeader className="ion-padding">
          <IonTitle color="primary" className="ion-text-center">Explore</IonTitle>
	</IonHeader>

	<div style={{marginTop:'120px',textAlign:'center'}}>
	  <h4>Nothing to display here</h4>
	</div>
      </IonContent>
    </IonApp>
  )

}

export default Explore;
