import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInSuccess } from '../redux/user/userSlice'


const OAuth = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error: errorMessage } = useSelector((state) => state.user)

    const handleGoogleClick = async () => {
        if (!navigator.onLine) {
            dispatch(signInFailure('No internet connection. Please check your network and try again.'))
            return
        }
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoURL: resultFromGoogle.user.photoURL
                })
            })
            const data = await res.json()
            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    }


    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick} >
            <AiFillGoogleCircle className='w-5 h-5 mr-2 ' />
            <p>Continue with google</p>
        </Button>
    )
}

export default OAuth