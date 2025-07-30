import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Set modal root for accessibility
Modal.setAppElement('#root');

function Home() {
  const [showmodal, setshowmodal] = useState(false);
  const [name, setname] = useState('');
  const [author, setauthor] = useState('');
  const [imageURL, setimageURL] = useState('');
  const [description, setdescription] = useState('');
  const [blog,setblog] = useState([]);
  const handleClose = () => setshowmodal(false);
  const handleShow = () => setshowmodal(true);
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/blogs/add-blog', {name, author, imageURL, description},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      if(res.data.success) {
        console.log('blog created successfully');
        navigate("/");
        handleClose();
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error.message?.data?.response);
    }
  }
  const getData = async() =>{
    try {
      const response = await axios.get('http://localhost:5001/api/blogs/get-all-blogs',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      if(response.data.success){
        const blogs = response.data.data;
        console.log(blogs);
        setblog(blogs);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" className="h-8 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <div className="relative">
              <button className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                Blogs
              </button>
            </div>
            <a href="#" className="text-sm font-semibold text-gray-900">Authors</a>
            <a href="#" className="text-sm font-semibold text-gray-900">About us</a>
            <a href="#" className="text-sm font-semibold text-gray-900">Contact us</a>
            <button className="flex items-center gap-x-1 text-sm font-semibold text-gray-900" onClick={handleShow}>
              Add a Blog
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-sm font-semibold text-gray-900">
              {localStorage.getItem("token") ? "Log out" : "Log in"}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <main>
        <Modal 
          isOpen={showmodal} 
          onRequestClose={handleClose} 
          contentLabel='Add a Blog'
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Add a Blog</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter the title
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter the name"
                  onChange={(e) => setname(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter the author
                </label>
                <input
                  type="text"
                  id="author"
                  onChange={(e) => setauthor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter the imageURL
                </label>
                <input
                  type="text"
                  id="imageURL"
                  onChange={(e) => setimageURL(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter the description
                </label>
                <textarea
                  rows={4}
                  id="description"
                  placeholder="Enter the content"
                  onChange={(e) => setdescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal>
        
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
{
  blog.map((blog) => (
    <div
      key={blog._id}
      className="group relative h-[300px] w-[300px] overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-md hover:ring-indigo-300"
    >
      <div className="h-[60%] w-full overflow-hidden">
        <img
          src={blog.imageURL}
          alt={blog.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 h-[40%] w-full bg-white p-4">
        <div className="mb-1">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {blog.name}
          </h3>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-600 line-clamp-2">
            {blog.description}
          </p>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-xs font-medium text-indigo-800">
              {blog.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-xs font-medium text-gray-700 line-clamp-1">
            {blog.author}
          </span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  ))
}
</div>
      </main>
      <footer className="w-full bg-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-4">
        <div className="flex items-center justify-center md:justify-start">
          <span className="text-xl font-bold">Blog Project</span>
        </div>
        <p className="text-center text-sm text-gray-500 md:text-left">
          This is just a little project done in 4 hours lol
        </p>
        <div className="flex justify-center md:justify-start">
          <p className="text-sm text-gray-500">Author: Annamalai</p>
        </div>
      </div>
      <div className="text-center md:text-left">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blogs</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Create Post</a></li>
        </ul>
      </div>
      <div className="text-center md:text-left">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Interests</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Technology</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">DSA</a></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Web Development</a></li>
        </ul>
      </div>
      <div className="text-center md:text-left">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Contact</h4>
        <ul className="space-y-2 text-sm">
          <li className="text-gray-600">Email: annamalairaj24@email.com</li>
          <li>
            <a href="https://github.com/Annamalai24500" 
               className="text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center md:justify-start"
               target="_blank" 
               rel="noopener noreferrer">
              GitHub: Annamalai24500
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-200 py-6 text-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Blog Project lol . All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  )
}
export default Home