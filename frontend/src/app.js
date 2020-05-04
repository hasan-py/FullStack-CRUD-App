import React, { Component } from 'react';


const TodoList = ({todos}) => {

  	return (
	    <div className="col-lg-6 col-sm-12 offset-lg-3 offset-sm-1 mb-5">
			<ul id="listUl" className="list-group">

			{todos.map(todo=> {
				return(
					<li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
						<div style={{ cursor:"pointer" }} className="mainTitle">
						{todo.title}
						</div>
						<span>
							<button className="btn btn-sm mr-1 btn-warning editBtn">Edit</button>
							<button className="btn btn-sm mr-1 btn-danger deleteBtn">Delete</button>
						</span>
					</li>	
				)
			})}				
			</ul>
		</div>
  	)
}


class App extends Component {
	
	state = {
		todo:[]
	}

	componentDidMount(){
		fetch('http://127.0.0.1:8000/api/task-list/')
			.then(res=> res.json())
			.then(data=> {
				this.setState({todo:data})
			})
	}

	render() {
		return (
			<div>
				<h3 className="display-4 text-center mt-3">Django & React Todo Apps</h3>
				
				<div className="container">
					<div className="container">
						<div className="container-fluid pt-5 pr-5 pl-5">
							<div className="col-lg-6 col-sm-12 offset-lg-3 offset-sm-1 mt-5">
								<form id="form" className="form-inline mb-2">
									<input id="title" type="text" className="form-control ml-lg-3 mr-lg-2 ml-sm-0 mr-sm-0 col-lg-9 col-sm-9" id="inlineFormInputName2" placeholder="Type here" />
									<button className="btn btn-info btn-sm col-lg-2 col-sm-3 ">Submit</button>
								</form>
							</div>
						</div>
					</div>
					<div className="buildList container">
						<div className="container-fluid pr-5 pl-5">
							<TodoList todos={this.state.todo} />
						</div>
					</div>
				</div>

			</div>
		)
	}
}

export default App;