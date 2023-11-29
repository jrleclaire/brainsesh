document.addEventListener('DOMContentLoaded', function () {
    const courseMaterial = document.getElementById('courseMaterial');
    const nextButton = document.getElementById('nextButton');
    // Course material in chunks
    const courseChunks = [
      'Chunk 1: This is the first chunk of reading material.',  
      'Chunk 2: This is the second chunk of reading material.',
      'Chunk 3: This is the third chunk of reading material.',
      'Chunk 4: This is the fourth chunk of reading material.',
      'Chunk 5: This is the fifth chunk of reading material.'
    ];
    let currentChunkIndex = 0;
    // Function to display the current chunk of course material
    function displayCurrentChunk() {
      const chunk = courseChunks[currentChunkIndex];
      const chunkElement = document.createElement('p');
      chunkElement.textContent = chunk;
      courseMaterial.appendChild(chunkElement);
    }
    // Function to handle the next button click event
    function handleNextButtonClick() {
      currentChunkIndex++;
      if (currentChunkIndex >= courseChunks.length) {
        nextButton.disabled = true;
      }
      displayCurrentChunk();
    }
    // Event listener for the next button click event
    nextButton.addEventListener('click', handleNextButtonClick);
    // Display the initial chunk of course material
    displayCurrentChunk();
  });

  // Get user ID from auth 
const userId = firebase.auth().currentUser.uid;
// Get user progress from Firestore
const userProgressRef = db.collection("userProgress").doc(userId);
const userProgressDoc = await userProgressRef.get();
let currentChunkIndex;
// If document exists, get the last chunk index 
if (userProgressDoc.exists) {
  currentChunkIndex = userProgressDoc.data().lastChunkIndex;
} else {
  // Otherwise, set to 0
  currentChunkIndex = 0;
}
// Update user progress after clicking next 
nextButton.addEventListener('click', async () => {
  currentChunkIndex++;
  await userProgressRef.set({
    lastChunkIndex: currentChunkIndex
  });
  handleNextButtonClick();
});

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const auth = getAuth();
const db = getFirestore();
async function storeUserData(userId, firstName, lastName, email) {
  try {
    await addDoc(collection(db, "users"), {
      name: firstName + " " + lastName,
      email: email 
    });
    console.log("User data stored successfully.");
  } catch (error) {
    console.error("Error storing user data: ", error);
  }
}
createUserWithEmailAndPassword(auth, email, password) 
.then((userCredential) => {
  const userId = userCredential.user.uid;
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  storeUserData(userId, firstName, lastName, email); 
})

// Set the data for the user document
setDoc(userRef, {
    email: user.email,
    // add other user details here
  }).then(() => {
    console.log("User data stored in Firestore");
  }).catch((error) => {
    console.error("Error storing user data:", error);
  }); 