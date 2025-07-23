import React, { FormEventHandler } from 'react';

interface ComponentProps extends React.PropsWithChildren {
    onSubmit: FormEventHandler;
}

const FormContainer: React.FC<ComponentProps> = ({ children, onSubmit }) => {
    return (
        <form className={"flex flex-col gap-6 rounded-md border p-8 w-full mx-auto sm:max-w-[425px]"} onSubmit={onSubmit}>
            {children}
        </form>
    )
}
export default FormContainer;
