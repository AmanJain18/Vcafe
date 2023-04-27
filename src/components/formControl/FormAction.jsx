export default function FormAction ({
    handleSubmit,
    type = 'Button',
    action = 'submit',
    text
}) {
    return (
        <>
            {
                type === 'Button' ?
                    <button
                        type={action}
                        className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium text-white bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
                        onSubmit={handleSubmit}
                    >

                        {text}
                    </button>
                    :
                    <></>
            }
        </>
    )
}