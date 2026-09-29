const Card = (props: any) => {
    // const name = props.name 
    // const age = props.age

    // ----------------------------

    const {name, age} = props
    console.log(name)
    console.log(age)
    return (
        <div>
            <h1>{props.data}</h1>
        </div>
    )
}

export default Card