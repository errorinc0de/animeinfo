import React from 'react'

function AnimeCards({queryData}) {
    return (
        <>
            {queryData && queryData.map((data, index) => {
                return(
                    <div className="resultCard" key={index}>
                        <a href={data.url} target="_blank" rel="noreferrer">
                            <img src={data.image_url} alt="Anime Poster"/>
                        </a>
                        <div>{data.title}</div>
                    </div>
                )
            })}
        </>
    )
}

export default AnimeCards
