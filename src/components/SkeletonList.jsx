import React from "react";
import SkeletonCard from "./SkeletonCard";
import styles from './SkeletonList.module.scss'



export default function SceletonList(){

    return(
        <div className={styles.sceletonList}>
            {Array.from({ length: 20 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}

        </div>
    )
}