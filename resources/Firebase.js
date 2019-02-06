import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const config = {
  	apiKey: "AIzaSyBgVZZDOFQ3HjOKvlTNDaLimYD0l5W7Ybc",
    authDomain: "r-native-61a26.firebaseapp.com",
    databaseURL: "https://r-native-61a26.firebaseio.com",
    projectId: "r-native-61a26",
    storageBucket: "r-native-61a26.appspot.com",
    messagingSenderId: "485228802723"
};
firebase.initializeApp(config);

export default firebase;