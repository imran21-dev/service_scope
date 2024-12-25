import { FaFacebook, FaInstagram,  FaLinkedin } from 'react-icons/fa';
import logo from '../assets/favicon.png'
import { BsTwitterX } from 'react-icons/bs';

const Footer = () => {
    return (
        <div className='bg-black'>
            <footer className="flex  w-10/12 mx-auto text-neutral-content p-10">
  <aside className='w-2/5'>
   <img className='w-12' src={logo} alt="" />
    <h1 className='text-xl font-semibold pt-2'>
      Service Scope
      
    </h1>
    <p className='text-sm py-2 opacity-70'>
    Discover reliable insights and genuine reviews for the services you need. Our platform connects you with real experiences shared by users, helping you make informed decisions. Whether you&apos;re searching for local professionals or global service providers, we&apos;ve got you covered. Your trust matters—let us guide you to the best choices, every time.
    </p>
  </aside>
  <nav className='flex-1 flex justify-end'>
    <div>
    <h6 className=" font-medium pb-2">Useful Links</h6>
     <ul>
        <li onClick={() =>  window.open('https://www.facebook.com/mdimran.parves.9', "_blank", "noopener,noreferrer")} className='font-medium text-sm flex items-center gap-1 cursor-pointer pb-1 hover:text-pColor duration-200'><FaFacebook />Facebook</li>
        <li onClick={() =>  window.open('https://www.instagram.com/mimranparves/', "_blank", "noopener,noreferrer")} className='font-medium text-sm flex items-center gap-1 cursor-pointer pb-1 hover:text-pColor duration-200'><FaInstagram />Instagram</li>
        <li onClick={() =>  window.open('https://www.linkedin.com/feed/', "_blank", "noopener,noreferrer")} className='font-medium text-sm flex items-center gap-1 cursor-pointer pb-1 hover:text-pColor duration-200'><FaLinkedin />Linkedin</li>
        <li onClick={() =>  window.open('https://x.com/Mohamma85577121', "_blank", "noopener,noreferrer")} className='font-medium text-sm flex items-center gap-1 cursor-pointer pb-1 hover:text-pColor duration-200'><BsTwitterX />Twitter</li>
        
     </ul>
    </div>
    
  </nav>
</footer>
<p className='text-white/50 text-sm text-center pb-10 pt-3'>Copyright © {new Date().getFullYear()} - All right reserved by Service Scope</p>
        </div>
    );
};

export default Footer;