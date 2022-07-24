import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { Fragment, useEffect, useState } from 'react';

import * as icons from 'ionicons/icons'
import DB from '../firebase';
import { onValue, ref } from 'firebase/database';
import { useParams } from 'react-router';

type SUB_CAT = {
  name: string;
  cat_id: string;
};

const Posts: React.FC = () => {
  const { cat_name, cat_id } = useParams() as { cat_name: string; cat_id: string };
  const [sub_cat, updateSubCat] = useState<SUB_CAT[]>([]);

  useEffect(() => {
    const starCountRef = ref(DB, 'Posts');
    onValue(starCountRef, (snapshot) => updateSubCat(snapshot.val().filter((item: SUB_CAT) => item.cat_id == cat_id))!);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>أوراد {cat_name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {
            sub_cat.map((item, i) => (
              <IonItem key={i} lines="none" routerLink={`/post/${item.name}`}>
                <IonListHeader lines="full" key={item.cat_id}>
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

export default Posts;
