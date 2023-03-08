import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { useEffect, useState, Fragment } from 'react';

import DB from '../firebase/fetch';
import { onValue, ref } from 'firebase/database';
import { useParams } from 'react-router';

import Text from '../components/Text';
import Ayat from '../components/Ayat';
import Poetry from '../components/Poetry';

import { MixedType, PostType } from './types';
import Header from '../components/Header';

const Post: React.FC = () => {
  const [post, updatePost] = useState<PostType | null>();
  const { cat_name, cat_id, post_name } = useParams() as { cat_name: string; cat_id: string; post_name: string };

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
      <Header title={post_name} hasBack={true} backRoute={`/posts/${cat_id}/${cat_name}`} />

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
                    (item.type == 3 || item.type == 33) && <Poetry type={item.type} list={item.details as string[][]} />
                  }

                  {
                    item.type == 4 &&
                    <div className='mixedContent'>
                      {
                        [...item.details as MixedType[]].map((detail: MixedType, i) => (
                          <Fragment key={new Date().getTime()}>
                            {
                              detail.type == 1 && <Text text={detail.text as string} />
                            }

                            {
                              detail.type == 2 && <Ayat text={detail.text as string} />
                            }
                          </Fragment>
                        ))
                      }
                    </div>
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
