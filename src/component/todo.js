import React, { useEffect, useState } from 'react'
import './style.css'
const Getitems = () => {
    const list = localStorage.getItem('myTodoList');
    if (list) {
        return JSON.parse(list);
    }
    else {
        return [];
    }
}
const Todo = () => {
    const [inputData, setinputData] = useState("");
    const [items, setItems] = useState(Getitems());
    const [editItem, setEditItem] = useState("");
    const [toggle, setToggel] = useState(false)

    const AddItem = () => {

        if (inputData === "") {
            alert('Add your list');
        }
        else if (toggle && inputData) {
            setItems(items.map((element) => {
                if (element.id === editItem) {
                    return { ...element, name: inputData };
                }

                return element;

            })
            )



            setinputData("");
            setEditItem("");
            setToggel(false);
        }
        else {
            const NewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            };
            setItems([...items, NewInputData]);
            setinputData("");
        }
    }

    // editing the items

    const Edit = (index) => {
        const todoEditItem = items.find((element) => {
            return (element.id === index);
        });
        setinputData(todoEditItem.name);
        setEditItem(index);
        setToggel(true);
    }
    // deleting the Items
    const Delete = (index) => {
        const updateItems = items.filter((element) => {
            return element.id != index;
        });
        setItems(updateItems);
    }
    // deleting the all itmes
    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="body-container">
                <h1>Todo-List</h1>
                <div className="container">

                    <img src="./images/note.png " alt="note" />

                    <p>Add your list-Items here ✌</p>
                    <div className="input-Data">
                        <div className="input">
                            <input type="text" placeholder='write here ✍' value={inputData} onChange={(event) => setinputData(event.target.value)} />
                            {toggle ? (<i className="fa-solid fa-pen-to-square" onClick={AddItem}></i>) : (<i className="fa-solid fa-circle-plus" onClick={AddItem}></i>)}

                        </div><hr />

                        {items.map((element, index) => {
                            return (
                                <>
                                    <div className="Data" key={element.id} >
                                        <div className='saved-Data' >{element.name}</div>

                                        <div className="">
                                            <i className="fa-solid fa-trash" onClick={() => Delete(element.id)}></i>
                                            <i className="fa-solid fa-pen-to-square" onClick={() => Edit(element.id)}></i>
                                        </div>
                                    </div>
                                </>
                            )
                        })}



                    </div>
                    <div>
                        <button className="Btn" onClick={() => removeAll()}>Clear-All </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Todo;