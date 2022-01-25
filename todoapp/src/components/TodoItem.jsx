import React from 'react'
import {Tooltip, Tag, List, Button, Popconfirm, Switch} from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';

const Todo = ({todo, onTodoRemoval, onTodoToggle}) => {

    return (
        <List.Item
            actions={[
                <Tooltip
                    title={todo.done ? 'Mark as undone' : 'Mark as done'}>
                    <Switch
                        checkedChildren={<CheckOutlined/>}
                        onChange={() => onTodoToggle(todo)}
                        defaultChecked={todo.done}
                        unCheckedChildren={<CloseOutlined/>}
                    />
                </Tooltip>,
                <Popconfirm
                    title={'Are you sure you want to delete?'}
                    onConfirm={() => {
                        onTodoRemoval(todo);
                    }}>
                        <Button className="remove-todo-button" type="primary" danger>
                            X
                        </Button>
                </Popconfirm>
            ]}
            className="list-item"
            key={todo.id}
        >
            <div className="todo-item">
                <Tag color={todo.done ? 'cyan' : 'red'} className="todo-tag">
                    {todo.title}
                </Tag>
                <Tag color={todo.done ? 'grey' : 'purple'} className="todo-tagging" >
                    {todo.tag ? todo.tag : "no tag"}
                </Tag>
            </div>
        </List.Item>
    )
}

export default Todo;