import styles from '../styles/Loading.module.scss';

export const LoadingComponent = (props: { styles?: object }) => {
    return (
        <ul className={styles.waveMenu} style={{ ...props.styles }}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul >
    )
}