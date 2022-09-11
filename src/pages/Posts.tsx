import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonListHeader, IonItem, IonLabel, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { Fragment, useEffect, useState } from 'react';

import * as icons from 'ionicons/icons'
import DB from '../firebase';
import { onValue, ref } from 'firebase/database';
import { useParams } from 'react-router';
import { SubCat } from './types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

const Posts: React.FC = () => {
  const { cat_name, cat_id } = useParams() as { cat_name: string; cat_id: string };
  const [sub_cat, updateSubCat] = useState<SubCat[]>([]);
  const history = useHistory();

  useEffect(() => {
    const starCountRef = ref(DB, 'Posts');
    onValue(starCountRef, (snapshot) => updateSubCat(snapshot.val().filter((item: SubCat) => item.cat_id == cat_id))!);
  }, []);

  return (
    <IonPage>
      <Header title={'أوراد' + cat_name} hasBack={true} />

      <IonContent fullscreen>
        <IonList>
          {
            sub_cat.map((item, i) => (
              <IonListHeader lines="full" key={item.cat_id} onClick={() => history.replace(`/post/${item.name}`)}>
                <IonLabel>{item.name}</IonLabel>
                <IonButton>
                  <IonIcon icon={icons.chevronBackOutline} />
                </IonButton>
              </IonListHeader>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default Posts;
