import { IonContent, IonPage, IonCard, IonCardContent } from '@ionic/react';
import React, { useEffect } from 'react';

import { useParams } from 'react-router';
import { Plugins } from '@capacitor/core';


// import Text from '../components/Text';
// import Ayat from '../components/Ayat';
// import Poetry from '../components/Poetry';

import { MixedType, PostDetails } from './types';
import Header from '../components/Header';
// import { fetchData } from '../db';

const Post: React.FC = () => {
  // const [post, updatePost] = useState<PostDetails | null>();
  const { cat_name, cat_id, post_name } = useParams() as { cat_name: string; cat_id: string; post_name: string };

  useEffect(() => {
    filterPost();
  }, []);

  const filterPost = (): void => {
    // fetchData('all')
    //   .then((res: AllData) => {
    //     let details: PostDetails = res.Content.find((item: PostDetails) => item && item?.name! == post_name)!;
    //     updatePost(details);
    //   });

    // alert(post_name)
    const { Browser } = Plugins;

    Browser.open({ url: '/assets/Pdf' })
  }

  return (
    <IonPage>
      <Header title={post_name} hasBack={true} backRoute={`/posts/${cat_id}/${cat_name}`} />

      <IonContent fullscreen>
        <IonCard key={new Date().getTime()}>
          <IonCardContent>
            {/* {
              post?.details!.map((item, i) => (
                <>
                  {
                    item.type &&
                    <>
                      {
                        (item.type == 1 && item.details.length > 0) && <Text text={item.details as string} />
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
                    </>
                  }
                </>
              ))
            } */}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Post;
