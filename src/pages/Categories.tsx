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
