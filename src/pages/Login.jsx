import { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'

function Login() {
  const [count, setCount] = useState(0)
  const { user, isLoaded } = useUser(); // Access the user object

  if (!isLoaded) return <p>Loading...</p>

  return (
    <>
      <header>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main>
        <h1>{user?.firstName} {user?.lastName}</h1> {/* Display user's first and last name */}
        <p>{user?.emailAddresses[0]?.emailAddress}</p> {/* Display user's email address */}
      </main>
    </>
  )
}

export default Login