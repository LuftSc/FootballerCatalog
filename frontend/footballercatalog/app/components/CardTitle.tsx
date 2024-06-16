interface Props {
    firstName: string,
    lastName: string
}

export const CardTitle = ({firstName, lastName} : Props) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
        }}
        >
            {firstName} {lastName}
        </div>
    );
}