import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
//import CKEditor from 'ckeditor4-react'
//import CKEditor from '@ckeditor/ckeditor5-react'
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useLocation
} from "react-router-dom"

import Project from './Project.md'
import Posts from './posts.json'

const apiUrl = 'http://localhost:5005/api'

const App = ()=>{
	return (
		<Router>
			<Site />
		</Router>
	)
}

const Site = () => {
	const [posts, setPosts] = useState(Posts.sort((a, b)=> (new Date(b.date)) - (new Date(a.date))))
	let location = useLocation()
	const [project, setProject] = useState("")
	useEffect(()=>{
		//axios.get("http://localhost:1337/posts?_sort=date:DESC").then(data=>{
		//	setPosts(data.data)
			if (window.AOS){
				window.AOS.init({
					once: true,
					disable: false
				})
			}
		//})
		/*
		window.AOS.init({
			once: true,
			disable: true
		});
		*/
	}, [])


	useEffect(()=>{
		if(true||location.pathname!=="/") window.scrollTo(0,0)
		if (location.pathname==="/project") fetch(Project).then(res=>res.text()).then((md)=>setProject(md))
		if (window.AOS) window.AOS.refreshHard()
	}, [location])

	return (
		<>
		<div className={location.pathname==="/" ? "bg" : "bg small"}>
			<div className="container">
				<div className="logo-area">
						<Link to="/">
							<img alt="CSapat" data-aos="fade-up" data-aos-offset="-200" data-aos-anchor-placement="top-center" className="logo" src={"/img/csapat-glider-lines-horizontal.svg"} />
						</Link>
						<h2 data-aos="fade-up" data-aos-delay="100">ESA CanSat 2020<br/><small>Hungary</small></h2>
				</div>
			</div>
		</div>
		<Switch>
			<Route path="/blog" exact>
				<Blog posts={posts}/>
			</Route>
			<Route>
				<div className="container">
					<div className="content">
						<Route path="/blog">
							<BlogPost posts={posts}/>
						</Route>
						<Route path="/" exact>
							<img alt="" data-aos="fade-up" src="img/party-popper.png" className="party-popper"/>
							<h2 data-aos="fade-up" data-aos-delay="300">We're in!</h2>
							
							<p data-aos="fade-up" data-aos-delay="400" className="narrow justify">
								Our team and our project has been chosen by the European Space Agency to represent Hungary in the CanSat competition of 2020! Yay!<br/>
								The competition will take place from the 22nd through the 26th of June, 2020. The location as of yet is still unknown.
								<br/>
								<small>2020. 01. 09.</small>
							</p>
							<br />
							<Link to="/project">
								<div data-aos="fade-up" data-aos-delay="500" className="btn btn-outline-primary button">Learn about our project</div>
							</Link>
							<hr data-aos="fade-up"/>		
							<h2 data-aos="fade-up" data-aos-delay="300">What's CanSat?</h2>
							<p data-aos="fade-up" data-aos-delay="400" className="justify">
								A CanSat is a simulation of a real satellite, integrated within the volume and shape of a soft drink can.
								The challenge for the students is to fit all the major subsystems found in a satellite, such as power, sensors and a communication system, into this minimal volume.
								The CanSat is then launched to an altitude of a few hundred metres by a rocket and its mission begins: to carry out a scientific experiment and achieve a safe landing.
								<br /><br />
								<a href="https://www.esa.int/Education/CanSat/What_is_a_CanSat" target="_blank" rel="noopener noreferrer">
									<div data-aos="fade-up" data-aos-delay="500" className="btn btn-outline-primary button">Read more on esa.int</div>
								</a>
							</p>
							<hr data-aos="fade-up"/>
							<h2 data-aos="fade-up" data-aos-delay="300">Our Project</h2>
							<p data-aos="fade-up" data-aos-delay="400" className="narrow center">
								Our team wants to demonstrate a proof-of-concept CanSat by measuring planetary weather conditions, magnetic field and other planetary phenomena. The CanSat will then conduct a directed landing using GPS data and an integrated paraglider. 
								<br /><br />
								<Link to="/project">
									<div data-aos="fade-up" data-aos-delay="500" className="btn btn-outline-primary button">Learn more about the project</div>
								</Link>
							</p>
							<hr data-aos="fade-up"/>
							<Link to="/blog"><h2 data-aos="fade-up">Blog</h2></Link>
							<p data-aos="fade-up" data-aos-delay="100"></p>
							<div className="blog row">
								{posts.slice(0,3).map((post, i)=>{
									return (
										<div className={"col-md-4 col-12 order-md-1 order-"+i} data-aos="fade-up" data-aos-delay={200+i*100}>
											<Link to={"/blog/" + post.slug} style={{color: '#212529', textDecoration: 'none'}}>
												<div className="blog-post">
													<div className="title">{post.title}</div>
												</div>
											</Link>
										</div>
									)
								})}
								{posts.slice(0,3).map((post, i)=>{
									return (
										<div className={"col-md-4 col-12 order-md-2 order-"+i}  data-aos="fade-up" data-aos-delay={200+i*100}>
											<Link to={"/blog/" + post.slug} style={{color: '#212529', textDecoration: 'none'}}>
												<div className="blog-post">
													<div className="text">
														<ReactMarkdown source={post.description}/>
													</div>
												</div>
											</Link>
										</div>
									)
								})}
								{posts.slice(0,3).map((post, i)=>{
									return (
										<div className={"col-md-4 col-12 order-md-3 order-"+i}  data-aos="fade-up" data-aos-delay={200+i*100}>
											<Link to={"/blog/" + post.slug} style={{color: '#212529', textDecoration: 'none'}}>
												<div className="blog-post">
													<small>{(new Date(post.date).toLocaleDateString())}</small>
												</div>
											</Link>
											<hr/>
										</div>
									)
								})}
								
							</div>
							<Link to="/blog">
								<div data-aos="fade-up" data-aos-delay="500" className="btn btn-outline-primary button">Browse {posts.length-3} more posts</div>
							</Link>

							<hr data-aos="fade-up"/>
							<Team />
							<hr data-aos="fade-up"/>
							<Sponsors />
							


							
							<hr style={{marginBottom: '8px'}} />
							<small className="center">CSapat © {new Date().getFullYear()} <br /> Sisák Botond</small>
						</Route>
						<Route path="/project">
							<h2 className="title">The Project</h2>
							<ReactMarkdown source={project}/>
							<br/>
							<Link to="/" style={{marginTop: '50px'}}>
								<div className="btn btn-outline-primary button">Home</div>
							</Link>
						</Route>
						{/* <Route path="/admin">
							<Admin />
						</Route> */}
					</div>
				</div>
			</Route>
		</Switch>
		</>
	)
}

const Team = ()=>{
	return (
		<>
			<h2 data-aos="fade-up">The Team</h2>
			<p data-aos="fade-up" data-aos-delay="100" className="center narrow"> 
				Our team consists of four enthusiastic physics class students of <a className="link" target="_blank" rel="noopener noreferrer" href="https://berzsenyi.hu">Berzsenyi Dániel Secondary School</a> (located in Budapest, Hungary). 
			</p>
			<div className="team row" >
				<div className="person col-md-3 col-6" data-aos="fade-up" data-aos-delay="200">
					<img src="img/balazs_artur.jpg" alt="Balázs Artúr" />
					<span>Artúr Balázs</span>
					<small><a className="link" href="mailto:abalazs42@gmail.com">abalazs42@gmail.com</a></small>
				</div>
				<div className="person col-md-3 col-6" data-aos="fade-up" data-aos-delay="250">
					<img src="img/farkas_akos.jpg" alt="Balázs Artúr" />
					<span>Ákos Farkas</span>
					<small><a className="link" href="mailto:akosprogram@gmail.com">akosprogram@gmail.com</a></small>
				</div>
				<div className="person col-md-3 col-6" data-aos="fade-up" data-aos-delay="300">
					<img src="img/sisak_botond.jpg" alt="Balázs Artúr" />
					<span>Botond Sisák</span>
					<small><a className="link" href="mailto:sisak.botond@gmail.com">sisak.botond@gmail.com</a></small>
				</div>
				<div className="person col-md-3 col-6" data-aos="fade-up" data-aos-delay="350">
					<img src="img/turi_zoltan.jpeg" alt="Balázs Artúr" />
					<span>Zoltán Túri</span>
					<small><a className="link" href="mailto:zozoturi@gmail.com">zozoturi@gmail.com</a></small>
				</div>
			</div>
		</>
	)
}

const Sponsors = ()=>{
	return (
		<>
			<h2 data-aos="fade-up">Contributors</h2>
			<p data-aos="fade-up" data-aos-delay="100" className="center narrow"> 
				We thank our sponsors and contributors deeply, as without them our ambitions could not have been fulfilled.
			</p>
			<br/>
			<a href="https://berzsenyi.hu" target="_blank" rel="noopener noreferrer"  data-aos="fade-up" data-aos-delay="100">
				<img src="img/berzsenyi.png" alt="Berzsenyi Gimnázium" style={{width: '140px'}} />
			</a>
			<br/>
			<br/>
			<br/>
			<p data-aos="fade-up" data-aos-delay="100" className="center narrow"> 
				<b>Special thanks to:</b>
			</p>
			<p data-aos="fade-up" data-aos-delay="100" className="center narrow"> 
				Zoltán Túri
				<br />
				Tamás Véber
			</p>
		</>
	)
}

const Blog = (props)=>{
	return(
		<div className="container">
			
			{props.posts.map(post=>{
				return (
					<div className="content blog-content" >
						<Link to={"/blog/" + post.slug}>
							<h2 className="title">{post.title}</h2>
						</Link>
						<p>{(new Date(post.date).toLocaleDateString())}</p>
						<p>{post.description}</p>
						<Link to={"/blog/" + post.slug}>
							<div className="btn btn-outline-primary button">Read post</div>
						</Link>
					</div>
				)
			})}
			<div className="center" style={{marginBottom: '70px'}}>
				<Link to="/">
					<div className="btn btn-outline-primary button">Home</div>
				</Link>
			</div>
			
		</div>
	)

}

const BlogPost = (props)=>{
	let location = useLocation()
	let [post, setPost] = useState({})
	useEffect(()=>{
		/*axios.get('http://localhost:1337/posts?slug=' + location.pathname.replace("/blog/", "")).then(res=>{
			setPost(res.data[0])
		})*/
		setPost(props.posts.find(p=>p.slug===location.pathname.replace("/blog/", "")))
	}, [location])
	return (
		<div className="blog-post-container">
			<h2 className="title">{post.title}</h2>
			<p>{(new Date(post.date).toLocaleDateString())}</p>
			<p>{post.description}</p>
			<ReactMarkdown source={post.text} />
			<br />
			<Link to="/blog">
				<div className="btn btn-outline-primary button">Browse all posts</div>
			</Link>
		</div>
	)
}
/*
const Admin = (props)=>{
	const [posts, setPosts] = React.useState([])
	
	useEffect(()=>{
		axios.get(apiUrl + '/posts').then(res=>{
			setPosts(res.data)
		})
	}, [])

	if (window.sessionStorage.jwt) return <AdminLogin />
	return (
		<Router basename="/admin">
			<Switch>
				<Route path="/login">
					<AdminLogin />
				</Route>
				<Route path="/posts" exact>
					<div className="right"><small>Logged in as admin </small>&nbsp;&nbsp;<button className="btn btn-outline-primary btn-sm button">Logout</button></div>
					<h2 className="title">Posts</h2>
					<table class="table left">
						<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Date</th>
						</tr>
						</thead>
						<tbody>
						{posts.map(post=>{
							return (
								<tr>
									<td><Link to={"/post/" + post.id}>{post.title}</Link></td>
									<td>{post.date}</td>
								</tr>
							)
						})}
						</tbody>
					</table>
				</Route>
				<Route path="/post">
					<AdminPostEdit />
				</Route>
			</Switch>
		</Router>
	)
}

const AdminPostEdit = (props)=>{
	const [post, setPost] = React.useState({})
	let postId = window.location.pathname.replace("/admin/post/", "")
	
	const [title, setTitle] = React.useState("")
	const [date, setDate] = React.useState(new Date())
	const [text, setText] = React.useState(new Date())

	useEffect(()=>{
		axios.get(apiUrl + '/posts/' + postId).then(res=>{
			setPost(res.data)
			setTitle(res.data.title)
			setDate(res.data.date)
			setText(res.data.text)
		})
	}, [])

	if (window.sessionStorage.jwt) return <AdminLogin />
	return (
		<div className="admin">
			<h2 className="title">Edit post</h2>
			<div className="input-group input-group-lg">
				<input type="text" className="form-control" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"/>
			</div>
			<div className="input-group">
				<input type="date" className="form-control" value={date} onChange={e=>setDate(e.target.value)} placeholder="Date"/>
			</div>
			<div class="input-group">
				<textarea class="form-control" placeholder="Short description"></textarea>
			</div>
			<CKEditor
                    editor={ClassicEditor}
                    data={text}
                    onInit={editor=>{
						console.log( 'Editor is ready to use!', editor )
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData()
                        console.log({event, editor, data})
					}}
                />
		</div>
	)
}

const AdminLogin = (props)=>{
	let [username, setUsername] = useState("")
	let [password, setPassword] = useState("")

	return (
		<div>
			<h2>Login</h2>
			<input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
			<input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
			<button className="btn btn-outline-primary button">Login</button>
		</div>
	)
}
*/
export default App
