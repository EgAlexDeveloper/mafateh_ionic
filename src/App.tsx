import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// import Login from './pages/Login';
import Categories from './pages/Categories';
import Posts from './pages/Posts';
import Post from './pages/Post';
// import Register from './pages/Register';

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
import { FC, useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import DB from './firebase';
import { saveData } from './db';
import { AllData } from './pages/types';

import './Styles.css';

setupIonicReact();

const App: FC = () => {
  useEffect(() => {
    const starCountRef = ref(DB, '/');

    onValue(starCountRef, (snapshot) => {
      saveData(snapshot.val() as AllData, 'all')
    });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route> */}
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/posts/:cat_id/:cat_name">
            <Posts />
          </Route>
          <Route exact path="/post/:post_name">
            <Post />
          </Route>
          <Route exact path="/">
            <Redirect to="/categories" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
