import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonListHeader, IonButton, IonIcon } from '@ionic/react';
import { useEffect, useState } from 'react';

import * as icons from 'ionicons/icons';

import './Cat.css';
import { onValue, ref } from "firebase/database";
import DB from '../firebase';

type Cat = {
  name: string;
  count: number;
  id: number;
};

const Categories: React.FC = () => {
  const [cat, updateCat] = useState<Cat[]>([]);

  useEffect(() => {
    const starCountRef = ref(DB, 'Cats');
    onValue(starCountRef, (snapshot) => updateCat(snapshot.val()));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>فهرس الأوراد</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {
            cat.map(item => (
              <IonItem key={item.id} lines="none" routerLink={`/posts/${item.id}/${item.name}`}>
                <IonListHeader lines="full" key={item.id}>
                  <IonLabel>{item.name}</IonLabel>
                  <IonButton>
                    <IonIcon icon={icons.chevronBackOutline} />
                  </IonButton>
                </IonListHeader>
              </IonItem >
            ))
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
