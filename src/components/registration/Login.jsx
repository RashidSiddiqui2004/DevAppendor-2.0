import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import myContext from '../../context/data/myContext';
import { auth } from '../../firebase/FirebaseConfig';

function Login() {
    const context = useContext(myContext)
    const { loading, setLoading } = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
            setLoading(false)

        } catch (error) { 
            toast.error("Login failed, Check your credentials!", {
                position: "top-right",
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setLoading(loading)
        }

    }

    useEffect(() => {
        const isUserloggedin = localStorage.getItem('user');

        if (isUserloggedin) {
            navigate('/');
        }
    }, [])

    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl'>

                <div className="flex justify-center merriweather">
                    {/* <img src="/logo.jpg" alt="Urban Guard Logo"
                        className="w-12 h-12 rounded-full mb-2 ml-10" /> */}
                    <h1 className="text-xl font-semibold mt-3 ml-2">DevAppendor</h1>
                </div>
                <div>
                    <h1 className='text-center text-white text-xl mb-4 merriweather font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={login}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account ?  <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login