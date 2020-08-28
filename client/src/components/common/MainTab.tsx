import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonFab, IonFabButton} from '@ionic/react';

import {globeOutline, globeSharp, fileTrayFullOutline, fileTrayFullSharp ,add} from 'ionicons/icons';
import './MainTab.css';

import Home from '../../pages/Home';
import Explore from '../../pages/Explore';
import Create from '../../pages/Create';
import Update from '../../pages/Update';

interface Props {
  username:any;
}

const MainTab:React.FC<Props> = ({username})=>{

  
  return(
  <>
    <IonTabs>
      <IonTabBar slot="bottom" color="primary">
        <IonTabButton tab="blogs" href="/blog/home">
	  <IonIcon ios={fileTrayFullOutline} md={fileTrayFullSharp}/>
	  <IonLabel>My Blogs</IonLabel>
	</IonTabButton>

	<IonTabButton className="disabled-tab-button" tab="create" href="/blog/create" disabled>
	</IonTabButton>

	<IonTabButton className="disabled-tab-button" tab="update" href="/blog/update" disabled>
	</IonTabButton>

	<IonTabButton tab="explore" href="/blog/explore">
	  <IonIcon ios={globeOutline} md={globeSharp}/>
	  <IonLabel>Explore</IonLabel>
	</IonTabButton>
      </IonTabBar>

      <IonRouterOutlet>
        <Switch>
        <Route path="/blog/home" render={()=><Home username={username}/>} exact/>
	<Route path="/blog/create" render={()=><Create username={username}/>} exact/>
	<Route path="/blog/explore" component={Explore} exact/>
	<Route path="/blog/update" render={()=><Update username={username}/>} exact/>
	</Switch>
      </IonRouterOutlet>
    </IonTabs>

    <IonFab vertical="bottom" horizontal="center">
      <IonFabButton routerLink="/blog/create">
        <IonIcon icon={add}/>
      </IonFabButton>
    </IonFab>
  </>
  )

}

export default MainTab;
