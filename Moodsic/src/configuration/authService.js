import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; 

export const register = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'usuarios', user.uid), {
      name,
      email,
      likedSongs: []
    });

    console.log('Documento guardado en Firestore');
    return userCredential;
  } catch (error) {
    console.error('Error al registrar:', error.message);
    throw error;
  }
};


export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};