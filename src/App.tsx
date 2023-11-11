import { Route } from 'react-router-dom';
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

import './theme/variables.css';
import React, { FC } from 'react';

import './Styles.css';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import { fetchData, saveData } from './db';
// import { AuthContext } from './context/auth.context';
// import { onValue, ref } from 'firebase/database';
// import { AllData } from './pages/types';
// import DB from './firebase/fetch';
// import Settings from './pages/Settings';

setupIonicReact({
  mode: 'ios'
});

const App: FC = () => {
  // const authContext = useContext(AuthContext);
  // const [isLoggedIn, updateIsLoggedIn] = useState<boolean>(false);
  // const [isReady, updateIsReady] = useState<boolean>(false);
  // const [canRender, updateCanRender] = useState<boolean>(true);

  // useEffect(() => {
  //   const starCountRef = ref(DB, '/');
  //   onValue(starCountRef, (snapshot) => {
  //     saveData(snapshot.val() as AllData, 'all');
  //     updateCanRender(true);
  //   });
  // }, [isReady]);

  // useEffect(() => {
  //   fetchData('user')
  //     .then(res => {
  //       if (res) {
  //         authContext!.updateIsLoggedInState(true);
  //         authContext?.updateUserState(res);
  //         updateIsLoggedIn(true);
  //       }
  //     })
  //     .finally(() => updateIsReady(true));
  // }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* <Route exact path="/login">
              <Login />
            </Route> */}

          {/* <Route exact path="/register">
              <Register />
            </Route> */}

          {/* <Route exact path="/settings">
              <Settings />
            </Route> */}

          <Route exact path="/">
            <Categories />
          </Route>
          <Route exact path="/posts/:cat_id/:cat_name">
            <Posts />
          </Route>
          <Route exact path="/post/:cat_id/:cat_name/:post_name">
            <Post />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
