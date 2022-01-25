import React, {useState, useEffect, useCallback} from 'react';
import {Tabs, Layout, Row, Col, message} from 'antd';
import './TodoList.css';
import TodoTab from './TodoTab';
import TodoForm from './TodoForm'; 
import {createTodo, deleteTodo, loadTodos, updateTodo} from '../services/todoService';
import SearchTodo from './SearchTodo';
import SearchTags from './SearchTags';
const { TabPane } = Tabs;
const { Content } = Layout;

const TodoList = () => {

    // we will employ the use of React Hooks to 
    // aid us in maintaing states of the components
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);

    /**
     * Takes in a todo argument, and creates a todo, then refreshes the page.
     */
    const handleFormSubmit = (todo) => {
        createTodo(todo).then(res => {
            onRefresh();
        });
        message.success("Todo added!");
    }

    const handleRemoveTodo = (todo) => {
        deleteTodo(todo.id).then(onRefresh());
        message.warn("Todo removed!");
    }

    const handleToggleTodoStatus = (todo) => {
        todo.done = !todo.done;
        console.log("Toggle AFTER : ", todo);
        updateTodo(todo).then(onRefresh());
        message.info("Todo status updated!");
    }

    const refresh = () => {
        loadTodos().then(json => {
            console.log("Refreshing now ");
            setTodos(json);
        }).then(console.log("Fetch done!"));
    }

    /**
     * Function to handle the search request.
     */
    const handleSearchRequest = async (request) => {
        const loadData = await loadTodos();
        const filteredData = loadData.filter(x => {
                return x.title.toLowerCase().includes(request.search);
            })
        setTodos(filteredData);
    }

    /**
     * Handle tag search request.
     */
    const handleTagSearchRequest = async (request) => {
        const loadData = await loadTodos();
        const filteredData = loadData.filter(x => {
            console.log("What we see from filter:", x.tag);
            console.log("Search :", request.tag);
                return x.tag.toLowerCase().includes(request.tag.toLowerCase());
            })
        setTodos(filteredData);
    }

    const onRefresh = useCallback( async () =>{
        setRefreshing(true);
        let data = await loadTodos();
        setTodos(data);
        setRefreshing(false);
        console.log('Refresh state', refreshing)
    }, [refreshing]);

    useEffect(() =>{
        console.log('this happens')
        refresh();
    },[onRefresh])

    return (
        <Layout
            className="layout">
            <Content
                style={{padding:'0 50px'}}>
                <div className="todolist">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>Search for a todo</h1>
                            <SearchTodo onSearchSubmit={handleSearchRequest} />
                            <h2>Search for a Tag</h2>
                            <SearchTags onSubmit={handleTagSearchRequest} />
                            {/* <br/> */}
                            <h2>Add a todo</h2>
                            <TodoForm onFormSubmit={handleFormSubmit}/>
                            <br/>
                            <Tabs defaultActiveKey='all' >
                                <TabPane tab="Your todo items" key="all" >
                                    <TodoTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}

export default TodoList;