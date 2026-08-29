
interface Props {
    children: React.ReactNode;
}

export function GenericChild({children}:Props) {

    return(
        <>
        {children}
        </>
    );

}