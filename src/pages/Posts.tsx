import { IonContent, IonPage, IonList, IonListHeader, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';

import * as icons from 'ionicons/icons'
import { useParams } from 'react-router';
import { AllData, SubCat } from './types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { fetchData } from '../db';
import { AuthContext } from '../context/auth.context';

const Posts: React.FC = () => {
  const { cat_name, cat_id } = useParams() as { cat_name: string; cat_id: string };
  const [sub_cat, updateSubCat] = useState<SubCat[]>([]);
  const [data, updateData] = useState<SubCat[]>([]);
  const [isLoggedIn, updateIsLoggedIn] = useState<boolean>(false);
  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchData('all')
      .then((res: AllData) => {
        let subCat: SubCat[] = res.Posts.filter((item: SubCat) => item && item.cat_id == cat_id)!;
        if (!isLoggedIn) subCat = subCat.filter(x => !x.is_private);

        updateData(subCat);
      });
  }, [isLoggedIn, cat_id]);

  useEffect(() => {

  }, [isLoggedIn, cat_id]);

  useEffect(() => {
    updateIsLoggedIn(auth.isLoggedIn);
  }, [auth]);

  return (
    <IonPage>
      <Header title={cat_name} hasBack={true} backRoute="/categories" />

      <IonContent fullscreen>
        <IonList>
          {
            sub_cat.map((item, i) => (
              <IonListHeader lines="full" key={item.cat_id} onClick={() => history.replace(`/post/${cat_id}/${cat_name}/${item.name}`)}>
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
