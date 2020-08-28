
import React from 'react';
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch, useHistory} from 'react-router-dom';

import {calendar} from 'ionicons/icons';

//components import
import Header from './components/common/Header';
import MainTab from './components/common/MainTab';
import Menu from './components/common/Menu';

//pages import
import Login from './pages/Login';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

  const history=useHistory();

  const [logState,setLogState] = React.useState(false)
  const [username,setUsername] = React.useState(null)

  const changeLogState=(un:any=null)=>{
    setLogState(!logState)
    setUsername(un)
  }


  return (
    <>
      <Header/>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu changeLogState={changeLogState} logState={logState}/>
          <IonRouterOutlet id="main">
	    <Switch>
	    <Route path="/blog" render={()=>!logState?<Redirect to="/login"/>:<MainTab username={username}/>}/>
	    <Route path="/login" render={()=>!logState?<Login changeLogState={changeLogState} />:<Redirect to="/blog/home"/>} exact/>
            <Route path="/register" component={Register} exact />
	    <Route path="/logout" render={()=><Redirect to="/login"/>} exact/>
            <Redirect to="/login"/>
	    </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </>
  );
};

export default App;
