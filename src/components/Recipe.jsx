import  '../styles/Recipe.css';
import { useState, useEffect } from 'react';

const initstate = {
    title: "",
    ingredient:"",
    time:"",
    instructions:""
}

export const Recipe = () => {

    const [recipe, setRecipe] = useState(initstate);
    const [details, setDetails] = useState([]);
    const [show, setShow] = useState([])

    useEffect(()=> {
        getDetails();
    },[])

    const handleclick = (e) => {
        let {name,value} = e.target 
        setRecipe((prev) => ({...prev,[name]:value}));
    }

    const postData=()=>{
        const payload={
            title:recipe.title,
            ingredient: recipe.ingredient,
            timetocook : recipe.timetocook,
            instructions: recipe.instructions,
            status:false,
        };
        fetch("http://localhost:3001/recipe",{
            method: "POST",
            body : JSON.stringify(payload),
            headers: {
                "content-type":"application/json",
            },
        }).then(() => {
            getDetails();
            setRecipe("")
        })
    }

    const getDetails = () => {
        fetch("http://localhost:30001/recipe")
        .then(d=>d.json())
        .then((res)=>{
            setDetails(res);
        })
    }

    const handlesubmit = (e) => {
        e.preventDefault()
    }

    const getData1 = () => {
        fetch("http://localhost:3001/recipe")
        .then(d=>d.json())
        .then((res)=>{
            setShow(res)
        })
    }

    const {title,ingredient,timetocook,instructions}=recipe;

    return (
        <div id="forward">
            <h1 styles={{color:"red"}}>Add recipe</h1>

            <form>
                <label onSubmit={handlesubmit}>Title</label>
                <br />
                <input type="text" name="title" value={title} placeholder='enter name of the recipe' onChange={handleclick} />
                <br />
                <br />
                <label onSubmit={handlesubmit}>Ingredients</label>
                <br />
                <input type="text" name="ingredient"  value={ingredient} placeholder='ingredient' onChange={handleclick} />
                <br />
                <br />
                <lable onSubmit={handlesubmit}>Time to clock</lable>
                <br />
                <input type="number" name="timetoclock"  value={timetocook} placeholder='time to clock' onChange={handleclick} />
                <br />
                <br />
                <label onSubmit={handlesubmit}>image</label>
                <br />
                <input type="file" name="image" placeholder='image'/>
                <br />
                <br />
                <label onSubmit={handlesubmit}>Instructor</label>
                <br />
                <input type="text" name="instructions"  value={instructions} placeholder='instructor' onChange={handleclick} />
                <br />
                <br />
                <input onClick={postData}  type="submit" id="submit" /> 
            </form>

            <div>
                {details.map((e,i) => 
                    <div id="card" key={i}>
                        <div id="insidecard">
                            <h2>Title " {e.title}</h2>
                            <h3>Time to clock : {e.timetocook}</h3>
                            <button onClick={getData1} style={{backgroundColor:"yellow"}}>click here for more info</button>
                        </div>
                    </div>
                )}
            </div>
            <div id="moreinfo">
                {show.map((e,i)=>{
                    <div key={i}>
                        Title: {e.title},
                        Ingredient : {e.ingredient},
                        Time to cook : {e.timetocook},
                        Instructions : {e.instructions}
                    </div>
                })}
            </div>
        </div>
    )
}
