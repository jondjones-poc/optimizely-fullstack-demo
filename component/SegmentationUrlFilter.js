import Link from "next/link";
import styles from '../styles/SegmentationFilter.module.css'

const SegmentationMenuFilter = ({...props}) => {

    return (
        <div className={`row ${styles.plpFilter}`}>
            <ul className={`col-12 ${styles.tags}`} >
                <li>
                    <b className={`${styles.title}`}>Segmentation Examples:</b>
                </li>
                <li>
                    <Link href="/signup?utc_campaign=newsletter_campaign" className={`${styles.tag}`}>
                        Campaign Promotion
                    </Link>
                </li>
                <li>
                    <Link href="/signup?utc_campaign=returning" className={`${styles.tag}`}>
                        New vs. Returning Visitor
                    </Link>
                </li>
                <li>
                    <Link href="/signup?device_type=website" className={`${styles.tag}`}>
                        Device Type
                    </Link>
                </li>

            </ul>
        </div>
    )
}

export default SegmentationMenuFilter;