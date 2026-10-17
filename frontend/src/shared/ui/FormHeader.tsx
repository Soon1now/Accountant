interface FormHeaderProps {
    title: string;
    discription: string;
}

export default function FormHeader({
    title,
    discription,
}: FormHeaderProps) {
    return (<>
        <h1 className="text-2xl  text-gray-900 mb-2 text-center">
            {title}
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
            {discription}
        </p>
    </>

    )
}