import React from 'react';
import styles from "./MiniCard.module.css";

function MiniCard({id, image, title}){
    
    return(
        <div className={styles.container}>
            <img src={image} alt={title} className={styles.image} />
        </div>
    );
}

export default MiniCard;