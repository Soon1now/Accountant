

interface AddButtonProps{
    text:string;
    onClick?: () => void;
}

export default function AddButton({
    text,
    onClick,
}:AddButtonProps){
    return(
        <button className='bg-blue text-white text-xs px-2 py-1.5 border rounded-3xl' onClick={onClick}>
            {text}
        </button>
    )
}