import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useLocation
} from "react-router-dom"

import Project from './Project.md'
import Posts from './posts.json'

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
						<h2 data-aos="fade-up" data-aos-delay="100">ESA CanSat 2020</h2>
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
							<h2 data-aos="fade-up" data-aos-delay="300">The Project</h2>
							<p data-aos="fade-up" data-aos-delay="400" className="center">
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
							<h2 data-aos="fade-up">The Team</h2>
							<p data-aos="fade-up" data-aos-delay="100"> 
								Our team consists of four enthusiastic physics class students of Berzsenyi Dániel Secondary School (located in Budapest, Hungary). 
							</p>
							<div className="team row" >
								<div className="person col-md-3 col-6" data-aos="fade-up" data-aos-delay="200">
									<img src="img/balazs_artur.jpg" alt="Balázs Artúr" />
									<span>Balázs Artúr</span>
								</div>
								<div className="person col-md-3 col-6" data-aos="fade-up" data-aos-delay="250">
									<img src="img/farkas_akos.jpg" alt="Balázs Artúr" />
									<span>Farkas Ákos</span>
								</div>
								<div className="person col-md-3 col-6" data-aos="fade-up" data-aos-delay="300">
									<img src="img/sisak_botond.jpg" alt="Balázs Artúr" />
									<span>Sisák Botond</span>
								</div>
								<div className="person col-md-3 col-6" data-aos="fade-up" data-aos-delay="350">
									<img src="img/turi_zoltan.jpeg" alt="Balázs Artúr" />
									<span>Túri Zoltán</span>
								</div>
							</div>
						</Route>
						<Route path="/project">
							<h2 className="title">The Project</h2>
							<ReactMarkdown source={project}/>
							<Link to="/" style={{marginTop: '50px'}}>
								<div className="btn btn-outline-primary button">Home</div>
							</Link>
						</Route>
					</div>
				</div>
			</Route>
		</Switch>
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



export default App
