import { IonContent, IonPage, IonList, IonLabel, IonListHeader, IonButton, IonIcon } from '@ionic/react';
import { useEffect, useState } from 'react';

import * as icons from 'ionicons/icons';

import './Cat.css';
import { onValue, ref } from "firebase/database";
import DB from '../firebase/fetch';
import { AllData, Cat } from './types';
import Header from '../components/Header';
import { useHistory } from 'react-router-dom';
import { saveData } from '../db';

const Categories: React.FC = () => {
  const history = useHistory();
  const [cat, updateCat] = useState<Cat[]>([]);

  useEffect(() => {
    const starCountRef = ref(DB, '/');

    onValue(starCountRef, (snapshot) => {
      saveData(snapshot.val() as AllData, 'all')
    });
  }, []);

  useEffect(() => {
    return () => updateCat([])
  }, []);

  useEffect(() => {
    const starCountRef = ref(DB, 'Cats');

    onValue(starCountRef, (snapshot) => {
      let data: Cat[] = snapshot.val() as Cat[];
      updateCat(data!)
    });
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
