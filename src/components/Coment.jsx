import React from 'react'

const Coment = ({name, text, created_at}) => {
    return(
        <div>
            <div><div>{name}</div><div>{created_at}</div></div>
            <div>{text}</div>
        </div>
    )
}

export default Coment