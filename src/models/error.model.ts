/**
 * Model for reset button props.
 */
export interface ResetBtnProps {
    reset: () => void;
}

/**
 * Model for error props.
 */
export interface ErrorProps extends ResetBtnProps {
    error: Error & { digest?: string };
}
