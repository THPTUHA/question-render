const Text = ({str}:{ str: string})=>{
    return (
        <span dangerouslySetInnerHTML={{ __html: str}} className="align-middle" ></span>
    )
}

export default Text;