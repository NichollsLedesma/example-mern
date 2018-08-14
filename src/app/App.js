import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        this.fetchTask();
    }
    addTask(e) {
        if(this.state._id){
            let url = '/api/task/'+this.state._id;
            console.log(url);
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=> res.json())
            .then(data=> {
                console.log(data);
                M.toast({html: data.status})
                this.setState({
                    title: '',
                    description: '',
                    _id: ''
                });
                this.fetchTask();
            })
            .catch(err=> console.log(err));
        } else {
            fetch('/api/task',{
                method:'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                
            } )
            .then(res=> res.json())
            .then(data=> {
                console.log(data);
                M.toast({html: data.status})
                this.setState({
                    title: '',
                    description: ''
                });
                this.fetchTask();
            })
            .catch(err=> console.log(err));
        }
        
        e.preventDefault();
    }
    fetchTask(){
        fetch('/api/task').then(res=>res.json()).then(data=>{
            this.setState({ tasks: data });
            console.log(this.state.tasks);
        })
    }
    deleteTask(id){
        if (confirm('Estas seguro de que queres eliminar el elemento?')){
            fetch('/api/task/'+id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res=> res.json())
            .then(data=>{
                console.log(data);
                M.toast({html: data.status});
                this.fetchTask();
            });
        }
        
    }
    editTask(id){
        fetch('/api/task/'+id).then(res=> res.json()).then(data=>{
            console.log(data);
            this.setState({
                _id: data._id,
                title: data.title,
                description: data.description
            })
        });
    }
    handleChange(e){
        let {name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN - FullStack</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5" >
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask} >
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" value={this.state.title} placeholder="Task title" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea onChange={this.handleChange} name="description" value={this.state.description} type="text" placeholder="Task description" className="materialize-textarea" />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4" >Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7" >
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titles</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task=>{
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue daken-4" onClick={()=>this.editTask(task._id)}><i className="material-icons">edit</i></button>
                                                        <button className="btn light-blue daken-4" style={{margin: '4px'}} onClick={()=>this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default App;