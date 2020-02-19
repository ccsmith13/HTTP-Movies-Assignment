import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
    id: 0,
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateForm = props => {
    console.log('inside of UpdateForm')
    const [item, setItem] = useState(initialItem);

    useEffect(() => {
        const selectedItem = props.savedList.find(item => {
            return `${item.id}` === props.match.params.id;
        });
        console.log(selectedItem);
        if (selectedItem) {
            setItem(selectedItem);
        }
    }, [props.items, props.match.params.id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;

        setItem({
            ...item,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${item.id}`, item)
            .then(res => {
                console.log('res  in handleSubmit', res
                )
                props.history.push("/");
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="string"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={item.title}
                />

                <input
                    type="string"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={item.director}
                />

                <input
                    type="string"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={item.metascore}
                />

                <button className="save-button">Update</button>
            </form>
        </>
    )
}
export default UpdateForm;