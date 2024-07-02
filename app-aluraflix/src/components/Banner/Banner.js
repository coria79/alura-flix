import styles from "./Banner.module.css";
import banner from "./banner.png";

function Banner(){
    return(
        <div className={styles.capa} style={{backgroundImage: `url(${banner})`}}>
            <div className={styles.gradient}></div>
        </div>
    );
}

export default Banner;