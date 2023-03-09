import { IonContent, IonPage, IonList, IonListHeader, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { Fragment, useContext, useEffect, useState } from 'react';

import * as icons from 'ionicons/icons'
import { useParams } from 'react-router';
import { AllData, Post } from './types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { fetchData } from '../db';
import { AuthContext } from '../context/auth.context';

const Posts: React.FC = () => {
  const { cat_name, cat_id } = useParams() as { cat_name: string; cat_id: string };
  const [posts, updatePost] = useState<Post[]>([]);
  const history = useHistory();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    filterPosts(authContext!.getIsLoggedInState());
  }, [authContext!.getIsLoggedInState]);

  useEffect(() => {
    return () => updatePost([]);
  }, []);

  const filterPosts = (isLoggedIn: boolean): void => {
    fetchData('all')
      .then((res: AllData) => {
        let allPosts: Post[] = res.Posts.filter((item: Post) => item && item.cat_id == cat_id)!;
        if (!isLoggedIn) allPosts = posts.filter(x => !x.is_private);

        updatePost(allPosts);
      });
  }

  return (
    <IonPage>
      <Header title={cat_name} hasBack={true} backRoute="/categories" />

      <IonContent fullscreen>
        <IonList>
          {
            posts.map((item, i) => (
              <Fragment key={i}>
                <IonListHeader lines="full" onClick={() => history.replace(`/post/${cat_id}/${cat_name}/${item.name}`)}>
                  <IonLabel>{item.name}</IonLabel>
                  <IonButton>
                    <IonIcon icon={icons.chevronBackOutline} />
                  </IonButton>
                </IonListHeader>
              </Fragment>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default Posts;
