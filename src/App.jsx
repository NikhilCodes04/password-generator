/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isClicked,setIsClicked] = useState(false);

  const passRef=useRef(null)

  const copyPasswordToClipboard = useCallback(()=>{
    passRef.current?.select();
    //passRef.current?.setSelectionRange(0,3);

    window.navigator.clipboard.writeText(password);
    setIsClicked(true);  
  },[password])

  const passwordGenerator = useCallback(() => {
    let password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+-={}[]/<>?~`|"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(char)
    }
    setPassword(password)

  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(() => { passwordGenerator() }, [length, numAllowed, charAllowed, passwordGenerator])

  useEffect(()=>{setIsClicked(false)},[password])

  return (
    <>

      <div className='w-full max-w-md mx-auto  shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-800'>
        <p className='text-xl text-center text-white mb-4'> Password Generator</p>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder='password'
            className='outline-none w-full py-1 px-3 '
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className={`outline-none px-3 shrink-0.5 ${isClicked ? 'bg-green-500' : 'bg-blue-500'} text-white`}
          >copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
