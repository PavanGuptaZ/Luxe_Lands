import styles from '../../styles/components.module.scss';

export const BasicBTN2 = (
    { text, icon, instyles, onClickFn, disabled }:
        {
            text: string,
            icon: React.ReactNode,
            instyles?: object,
            onClickFn?: () => void,
            disabled?: boolean
        }) => {
    return (
        <button
            className={styles.BasicBTN2}
            style={{ ...instyles }}
            onClick={onClickFn}
            disabled={disabled}
        >{text}{icon}</button>
    )
}
