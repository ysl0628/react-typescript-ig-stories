import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { ChangeEvent, useState } from 'react'
import { db, storage } from '../../firebase'

const ImageUpload = ({ username }: { username: string | null }) => {
  const [image, setImage] = useState<File | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [caption, setCaption] = useState<string>('')

  const handleCaption = (e: ChangeEvent<HTMLInputElement>) =>
    setCaption(e.target.value)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      console.log(e.target.files[0])
    }
  }
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  const handleUpload = () => {
    // ref 此任務的參考來源
    const uploadRef = ref(storage, `images/${image && image.name}`)
    const uploadTask = image && uploadBytesResumable(uploadRef, image)
    // 監控上傳進度
    // bytesTransferred 拍攝此快照時已傳輸的總字節數
    // totalBytes 預計上傳的總字節數
    uploadTask &&
      uploadTask.on(
        'state_changed',
        (snapshot: { bytesTransferred: number; totalBytes: number }) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(progress)
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error)
          alert(error.message)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log('File available at', downloadURL)
            addDoc(collection(db, 'posts'), {
              timestamp: serverTimestamp(),
              caption: caption,
              imageUrl: downloadURL,
              username: username,
            })
          })

          setProgress(0)
          setCaption('')
          setImage(null)
        }
      )
  }

  return (
    <div>
      <progress className='upload-progress' value={progress} max='100' />
      <input
        type='text'
        placeholder='Enter a caption...'
        onChange={handleCaption}
        value={caption}
      />
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default ImageUpload
