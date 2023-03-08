import { IonContent, IonPage, IonList, IonLabel, IonListHeader, IonButton, IonIcon } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';

import * as icons from 'ionicons/icons';

import './Cat.css';
import { onValue, ref } from "firebase/database";
import DB from '../firebase/fetch';
import { AllData, Cat } from './types';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import { fetchData } from '../db';
import { AuthContext } from '../context/auth.context';

const Categories: React.FC = () => {
  const history = useHistory();
  const [isLoggedIn, updateIsLoggedIn] = useState<boolean>(false);
  const [cat, updateCat] = useState<Cat[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchData('all')
      .then((res: AllData) => {
        let cat: Cat[] = res.Cats;
        if (!isLoggedIn) cat = cat.filter(x => !x.is_private);
        updateCat(cat)
      })
  }, [isLoggedIn]);

  useEffect(() => {
    updateIsLoggedIn(auth.isLoggedIn);
  }, [auth]);

  useEffect(() => {
    return () => updateCat([])
  }, []);

  return (
    <IonPage>
      <Header title={'فهرس الأوراد'} hasSettings={false} />

      <IonContent fullscreen>
        <IonList>
          {
            cat.map(item => (
              <IonListHeader lines="full" key={item.id} onClick={() => history.replace(`/posts/${item.id}/${item.name}`)}>
                <IonLabel className="ion-bold">{item.name}</IonLabel>
                <IonButton>
                  <IonIcon icon={icons.chevronBackOutline} />
                </IonButton>
              </IonListHeader>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
