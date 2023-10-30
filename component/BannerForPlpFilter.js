import Link from "next/link";
import styles from '../styles/BannerForPlpFilter.module.css'

const BannerForPlpFilter = ({...props}) => {

    return (
        <div className={`row ${styles.plpFilter}`}>
            <ul className={`col-6 ${styles.tags}`} >
                <li>
                    <b className={`${styles.title}`}>Segment Example:</b>
                </li>
                <li>
                    <Link href="/plp?utc_campaign=vip" className={`${styles.tag}`}>
                        VIP
                    </Link>
                </li>
                <li>
                    <Link href="/plp?utc_campaign=new" className={`${styles.tag}`}>
                        NEW
                    </Link>
                </li>
                <li>
                    <Link href="/plp?utc_campaign=marketing" className={`${styles.tag}`}>
                        MARKETING BANNER
                    </Link>
                </li>
                <li>
                    <Link href="/plp" className={`${styles.tag}`}>
                        NORMAL
                    </Link>
                </li>
            </ul>

            <ul className={`col-6 ${styles.tags}`} >
                <li >
                    <b className={`${styles.title}`}>Algorithm Example:</b>
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
                        MENU 4
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default BannerForPlpFilter;