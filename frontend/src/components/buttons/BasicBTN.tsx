import styles from '../../styles/components.module.scss';

export const BasicBTN = (
    { text, instyles, onClickFn, disabled }:
        {
            text: string,
            instyles?: object,
            onClickFn?: () => void,
            disabled?: boolean
        }) => {
    return (
        <button
            className={styles.BasicBTN}
            style={{ ...instyles }}
            onClick={onClickFn}
            disabled={disabled}
        >{text}</button>
    )
}
