import { IonContent, IonPage, IonList, IonLabel, IonListHeader, IonButton, IonIcon, IonItem } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';

import * as icons from 'ionicons/icons';

import './Cat.css';
import { AllData, Cat } from './types';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import { fetchData } from '../db';
import { AuthContext } from '../context/auth.context';
import messages from '../assets/messages';

const Categories: React.FC = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [cat, updateCat] = useState<Cat[]>([]);

  useEffect(() => {
    filterCats(authContext!.getIsLoggedInState());
  }, [authContext!.getIsLoggedInState]);

  useEffect(() => {
    return () => updateCat([]);
  }, []);

  const filterCats = (isLoggedIn: boolean): void => {
    fetchData('all')
      .then((res: AllData) => {
        updateCat(isLoggedIn ? [...res.Cats] : [...res.Cats.filter(x => !x.is_private)]);
      });
  }

  return (
    <IonPage>
      <Header title={messages.INDEX} hideSettings={false} hasBack={false} />

      <IonContent fullscreen>
        <IonList>
          {
            cat.map(item => (
              <IonItem key={item.id} onClick={() => history.replace(`/posts/${item.id}/${item.name}`)}>
                <IonLabel color="success">{item.name}</IonLabel>
                <IonIcon size='small' color="dark" icon={icons.chevronBackOutline} />
              </IonItem>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
