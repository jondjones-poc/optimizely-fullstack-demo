import Link from "next/link";
import styles from '../styles/SegmentationFilter.module.css'

const SegmentationAlgorithmFilter = ({...props}) => {

    return (
        <div className={`row ${styles.plpFilter}`}>
            <ul className={`col-6 ${styles.tags}`} >
                <li >
                    <b className={`${styles.title}`}>Menu Example:</b>
                </li>
                <li>
                    <Link href="/plp?algorithm=1" className={`${styles.tag}`}>
                        MENU 1
                    </Link>
                </li>
                <li>
                    <Link href="/plp?algorithm=2" className={`${styles.tag}`}>
                        MENU 2
                    </Link>
                </li>
                <li>
                    <Link href="/plp?algorithm=3" className={`${styles.tag}`}>
                        MENU 3
                    </Link>
                </li>
                <li>
                    <Link href="/plp" className={`${styles.tag}`}>
                        NORMAL
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SegmentationAlgorithmFilter;