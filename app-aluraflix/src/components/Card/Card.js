import styles from "./Card.module.css";
import iconDelete from "./iconCandyTrash32x32.png";
import iconEdit from "./iconEdit32x32.png"

function Card({id, image, title}){
    return(
        <div className={styles.container}>
            <img src={image} alt={title} className={styles.image} />
            <h2>{title}</h2>
            <img src={iconDelete} alt="Icono Borrar" className={styles.delete} />
            <img src={iconEdit} alt="Icono Editar" className={styles.delete} />
        </div>
    );
}

export default Card;