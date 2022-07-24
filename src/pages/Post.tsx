import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow } from '@ionic/react';
import { useEffect, useState } from 'react';

import DB from '../firebase';
import { onValue, ref } from 'firebase/database';
import { useParams } from 'react-router';

import Text from '../components/Text';
import Ayat from '../components/Ayat';

type Detail = {
  type: 1 | 2 | 3;
  details: string;
}

type PostType = {
  name: string;
  details: Detail[]
};

const Post: React.FC = () => {
  const [post, updatePost] = useState<PostType>();
  const { post_name } = useParams() as { post_name: string; };

  useEffect(() => {
    const starCountRef = ref(DB, 'Content');
    onValue(starCountRef, (snapshot) => updatePost(snapshot.val()[1]));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
                    item.type == 1 && <Text text={item.details} />
                  }

                  {
                    item.type == 2 && <Ayat text={item.details} />
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
