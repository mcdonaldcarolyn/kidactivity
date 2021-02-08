import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home= props => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kidivity</IonTitle>
        </IonToolbar>
      </IonHeader>
      <ExploreContainer />
      
    </IonPage>
  );
};

export default Home;
