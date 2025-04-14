export default function Box({
    element: Component = 'div',
    children,
    ...props
}) {
    return (
        <Component {...props}>
            {children}
        </Component>
    );
}