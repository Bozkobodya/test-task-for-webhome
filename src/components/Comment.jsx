import React from 'react'
import '../App.css'

const Coment = ({name, text, created_at}) => {

    function fixDateStr(givenDate){
        let fixedDate

        let dateWithoutEnd = givenDate.slice(0, 16)
        
        let arr = dateWithoutEnd.split('T')

        fixedDate = arr[0] + " " + arr[1]

        return fixedDate
    }

    return(
        <div className="coment__container">
            <div className="coment__info">
                <div className="coment__name">{name}:</div>
                <div className="coment__created_at">{fixDateStr(created_at)}</div>
            </div>
            <div className="coment__text">{text}</div>
        </div>
    )
}

export default Coment