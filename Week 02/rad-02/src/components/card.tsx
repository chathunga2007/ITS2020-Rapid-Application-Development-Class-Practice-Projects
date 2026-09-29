// const Card = (props:any) => {
const Card = ({ name, age, email }: any) => {
    // props.children // in default prop in children

    // const { name, age, email } = props

    // console.log(props.name)
    // console.log(props.age)
    // console.log(props.email)

    console.log(name)
    console.log(age)
    console.log(email)
  return (
    <div>
        {/* <hr />
        {props.children}        
      <h2>Hello</h2>
      <p>this is card component</p> */}

      <hr />
      <h1>{name}</h1>
      <h2>{age}</h2>
      <h3>{email}</h3>
    </div>
  )
}

export default Card