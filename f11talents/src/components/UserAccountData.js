function UserAccountData(props) {
    return (
        <div className='UserAccountData'>
            <div>{props.name}</div>
            <div>{props.email}</div>
        </div>
    );
}
export { UserAccountData };
