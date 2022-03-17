import { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Loader() {
    // sTATE FROM REDUX
    const state = useSelector(state => state.APP_STATE)
    const loadingRef = useRef(null)
    const isLoading = state.isLoading

    useEffect(() => {
        if (isLoading) {
            loadingRef.current.classList.remove('hidden')
            // loadingRef.current.classList.add('block')
        }
        else {
            loadingRef.current.classList.add('hidden')
        }
    }, [isLoading])

  return (
    <div ref={ loadingRef } className="hidden">
        <div className="w-full h-screen flex justify-center items-center bg-transparent fixed top-0 left-0 z-50">
            <div className="bg-white rounded-md shadow-sm space-y-3 text-center w-fit px-2 text-xs text-gray-500">
                <img src="/Pulse.gif" alt="loader" className="mx-auto" />
                {/* <span>Loading</span> */}
            </div>
        </div>
    </div>
  )
}

export default Loader