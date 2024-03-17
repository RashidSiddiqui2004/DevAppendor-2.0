
import React from 'react'

const SocialMediaSection = () => {
  const socialLinks = [
    { name: 'LinkedIn', icon: 'fab fa-linkedin', link: 'https://www.linkedin.com/' },
    { name: 'GitHub', icon: 'fab fa-github', link: 'https://github.com/' },
    // Add more social links as needed
  ];

  return (
    <div className='p-8 text-center'>
      <h2 className='text-3xl font-bold text-white mb-6'>Connect with Me</h2>
      
      <div className='flex justify-center space-x-6'>
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-white transition duration-300 transform hover:scale-110'
          >
            <i className={`${social.icon} text-4xl`} />
            <span className='sr-only'>{social.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
 
const Developer = () => {
  return (
    <div className='bg-slate-600 w-fit px-3 py-2 my-5
     mx-[22%] md:ml-[39%] shadow-md shadow-purple-500 md:fixed md:bottom-8'>
        <h2 className='flex justify-center'>Developed with ❤️ by Rashid Siddiqui</h2> 
    </div>
  )
}

export default Developer