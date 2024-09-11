export default function Footer() {
    return (
        <div className="container mx-auto max-w-screen-xlpx-12"> {/* 50px padding */}
            <footer className="bg-gray-900 text-white py-10">
                <div className="container mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"> {/* max-w-screen-xl qo'shildi */}
                    <div>
                        <h3 className="font-bold mb-4">HELP</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-400">Delivery & returns</a></li>
                            <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
                            <li><a href="#" className="hover:text-gray-400">Track order</a></li>
                            <li><a href="#" className="hover:text-gray-400">Contacts</a></li>
                            <li><a href="#" className="hover:text-gray-400">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">SHOP</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-400">New arrivals</a></li>
                            <li><a href="#" className="hover:text-gray-400">Trending now</a></li>
                            <li><a href="#" className="hover:text-gray-400">Sales</a></li>
                            <li><a href="#" className="hover:text-gray-400">Brands</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">GET IN TOUCH</h3>
                        <p>Call: (605) 505-0218</p>
                        <p>Email: hello@vortex.com</p>
                        <div className="mt-4 space-x-3">
                            <a href="#" className="hover:text-gray-400"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-gray-400"><i className="fab fa-youtube"></i></a>
                            <a href="#" className="hover:text-gray-400"><i className="fab fa-pinterest"></i></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">DOWNLOAD OUR APP</h3>
                        <div className="flex space-x-3">
                            <img src="appstore.png" alt="App Store" className="h-10" />
                            <img src="googleplay.png" alt="Google Play" className="h-10" />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4">
                    <div className="container mx-auto max-w-screen-xl flex justify-between items-center text-sm"> {/* max-w-screen-xl qo'shildi */}
                        <p className="text-center">© All rights reserved. Made with 💖 by Creation Studio</p>
                        <a href="#" className="hover:text-gray-400 text-center">Go to top</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
