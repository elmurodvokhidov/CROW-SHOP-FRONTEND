import { SignInButton, SignedOut } from "@clerk/clerk-react";

export default function Home() {
    return (
        <div>
            {/* <Link to={'login'}>Login</Link> */}
            <div>
                <SignedOut>
                    <SignInButton>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                           Sign In / up 
                        </button>
                    </SignInButton>
                </SignedOut>
            </div>
        </div>
    )
}