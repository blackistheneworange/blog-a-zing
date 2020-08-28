import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';

import React from 'react';
import {useLocation, useHistory} from 'react-router-dom';

import { enterOutline, exitOutline, enterSharp, exitSharp, personAddOutline, personAddSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  iosIcon: string;
  mdIcon: string;
  title: string;
  url:string;
}

interface Props {
  logState:boolean;
  changeLogState:()=>void;
}

const appPages: AppPage[] = [
  {
    title: 'Login',
    url: '/login',
    iosIcon: enterOutline,
    mdIcon: enterSharp
  },
  {
    title: 'Register',
    url: '/register',
    iosIcon: personAddOutline,
    mdIcon: personAddSharp
  },
  
];


const Menu: React.FC<Props> = (props) => {
  const location = useLocation();
  const history = useHistory();

  const handleLogout = ()=>{
    props.changeLogState()
    history.push('/login');
  }

  return (
    <IonMenu contentId="main" type="push">
      <IonHeader>
        <IonToolbar>
	  <IonTitle>Menu</IonTitle>
	</IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {!props.logState?appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="root" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })
	  :
	  <IonMenuToggle>
	    <IonItem onClick={handleLogout}>
	      <IonIcon slot="start" ios={exitOutline} md={exitSharp}/>
	      <IonLabel>Logout</IonLabel>
	    </IonItem>
	  </IonMenuToggle>
	  }
        </IonList>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
