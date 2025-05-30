function AddIcon({style} : {
    style?:string
}){
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={`${style}`}>
                <rect width="24" height="24" rx="8" fill="#7FD287"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.25C12.4142 5.25 12.75 5.58579 12.75 6V11.25H18C18.4142 11.25 18.75 11.5858 18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H12.75V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V12.75H6C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H11.25V6C11.25 5.58579 11.5858 5.25 12 5.25Z" fill="white"/>
            </svg>
        </>
    )
}

function MinusIcon({style} : {
    style?:string
}){
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={`${style}`}>
                <rect width="24" height="24" rx="8" fill="#E86F6F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.75 11.2501C12.1642 11.2501 11.75 11.2501 12.5 11.25H17.75C18.1642 11.25 18.5 11.5858 18.5 12C18.5 12.4142 18.1642 12.75 17.75 12.75H12.5C11.75 12.75 12.1642 12.75 11.75 12.75C11.3358 12.75 11.75 12.75 11 12.75H5.75C5.33579 12.75 5 12.4142 5 12C5 11.5858 5.33579 11.25 5.75 11.25H11C11.75 11.2501 11 11.25 11.75 11.2501Z" fill="white"/>
            </svg>
        </>
    )
    
}

function RemoveIcon({style} : {
    style?:string
}){
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none" className={`${style}`}>
                <rect x="0.5" width="24" height="24" rx="8" fill="#7FD287"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.273 7.22707C17.5659 7.51996 17.5659 7.99484 17.273 8.28773L13.5607 12L17.273 15.7124C17.5659 16.0052 17.5659 16.4801 17.273 16.773C16.9801 17.0659 16.5052 17.0659 16.2123 16.773L12.5 13.0607L8.78769 16.773C8.49481 17.0659 8.01991 17.0659 7.72703 16.773C7.43415 16.4801 7.43415 16.0052 7.72703 15.7124L11.4393 12L7.72703 8.28773C7.43414 7.99484 7.43415 7.51996 7.72703 7.22707C8.01991 6.93419 8.4948 6.93418 8.78769 7.22707L12.5 10.9394L16.2123 7.22707C16.5052 6.93418 16.9801 6.93419 17.273 7.22707Z" fill="white"/>
            </svg>
        </>
    )

}

export {
    AddIcon,
    MinusIcon,
    RemoveIcon
}