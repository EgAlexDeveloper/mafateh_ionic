import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { useEffect, useState } from 'react';

import DB from '../firebase';
import { onValue, ref } from 'firebase/database';
import { useParams } from 'react-router';

import Text from '../components/Text';
import Ayat from '../components/Ayat';
import Poetry from '../components/Poetry';

import * as icons from 'ionicons/icons';

type Detail = {
  type: 1 | 2 | 3;
  details: string | string[][];
}

type PostType = {
  name: string;
  details: Detail[]
};

const Post: React.FC = () => {
  const [post, updatePost] = useState<PostType | null>();
  const { post_name } = useParams() as { post_name: string; };

  useEffect(() => {
    return () => updatePost(null)
  }, []);

  useEffect(() => {
    const starCountRef = ref(DB, 'Content');

    onValue(starCountRef, (snapshot) => {
      let data: PostType[] = snapshot.val() as PostType[];
      updatePost(data.find((post: PostType) => post?.name! == post_name)!);
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{post_name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {
              post?.details.map((item, i) => (
                <IonCol key={i} size='12'>
                  {
                    item.type == 1 && <Text text={item.details as string} />
                  }

                  {
                    item.type == 2 && <Ayat text={item.details as string} />
                  }

                  {
                    item.type == 3 && <Poetry list={item.details as string[][]} />
                  }
                </IonCol>
              ))
            }
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Post;
